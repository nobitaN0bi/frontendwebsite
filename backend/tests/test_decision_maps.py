"""Backend API tests for the /api/decision-maps feature."""
import os
import io
import pytest
import requests
from PIL import Image

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "").rstrip("/")
if not BASE_URL:
    # Fallback: read frontend/.env directly since backend testing agent may not have it exported
    env_path = "/app/frontend/.env"
    if os.path.exists(env_path):
        with open(env_path) as f:
            for line in f:
                if line.startswith("REACT_APP_BACKEND_URL="):
                    BASE_URL = line.split("=", 1)[1].strip().rstrip("/")
                    break

INDUSTRIES = [
    "finance", "legal", "manufacturing", "customer-support",
    "logistics", "ecommerce", "saas", "fashion",
]


@pytest.fixture(scope="module")
def api():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


def test_health(api):
    r = api.get(f"{BASE_URL}/api/health", timeout=10)
    assert r.status_code == 200
    assert r.json().get("status") == "ok"


@pytest.mark.parametrize("industry", INDUSTRIES)
def test_create_decision_map_each_industry(api, industry):
    r = api.post(f"{BASE_URL}/api/decision-maps", json={"industry": industry}, timeout=10)
    assert r.status_code == 201, r.text
    data = r.json()
    assert data["industry"] == industry
    assert isinstance(data["id"], str) and len(data["id"]) > 0
    assert data["path"] == f"/map/{data['id']}"
    assert data["share_path"] == f"/api/decision-maps/{data['id']}/share"
    assert data["poster_path"] == f"/api/decision-maps/{data['id']}/poster.png"
    assert data["views"] == 0
    assert "created_at" in data


def test_get_decision_map_increments_views(api):
    r = api.post(f"{BASE_URL}/api/decision-maps", json={"industry": "finance"}, timeout=10)
    assert r.status_code == 201
    map_id = r.json()["id"]

    r1 = api.get(f"{BASE_URL}/api/decision-maps/{map_id}", timeout=10)
    assert r1.status_code == 200
    v1 = r1.json()["views"]

    r2 = api.get(f"{BASE_URL}/api/decision-maps/{map_id}", timeout=10)
    assert r2.status_code == 200
    v2 = r2.json()["views"]

    r3 = api.get(f"{BASE_URL}/api/decision-maps/{map_id}", timeout=10)
    v3 = r3.json()["views"]

    assert v1 == 1
    assert v2 == 2
    assert v3 == 3
    assert r1.json()["industry"] == "finance"
    assert r1.json()["path"] == f"/map/{map_id}"


def test_get_unknown_id_returns_404(api):
    r = api.get(f"{BASE_URL}/api/decision-maps/doesnotexist_zzz", timeout=10)
    assert r.status_code == 404


def test_share_page_contains_social_preview(api):
    created = api.post(f"{BASE_URL}/api/decision-maps", json={"industry": "logistics"}, timeout=10)
    map_id = created.json()["id"]
    response = api.get(f"{BASE_URL}/api/decision-maps/{map_id}/share", timeout=10, allow_redirects=False)
    assert response.status_code == 200
    assert 'property="og:image"' in response.text
    assert f"/api/decision-maps/{map_id}/poster.png" in response.text
    assert f"/map/{map_id}" in response.text


def test_share_page_contains_absolute_metadata_and_redirect(api):
    created = api.post(f"{BASE_URL}/api/decision-maps", json={"industry": "finance"}, timeout=10)
    map_id = created.json()["id"]
    response = api.get(f"{BASE_URL}/api/decision-maps/{map_id}/share", timeout=10, allow_redirects=False)
    assert response.status_code == 200
    html = response.text

    expected_share_url = f"{BASE_URL}/api/decision-maps/{map_id}/share"
    expected_map_url = f"{BASE_URL}/map/{map_id}"
    expected_poster_url = f"{BASE_URL}/api/decision-maps/{map_id}/poster.png"

    assert f'property="og:url" content="{expected_share_url}"' in html
    assert f'property="og:image" content="{expected_poster_url}"' in html
    assert f'name="twitter:image" content="{expected_poster_url}"' in html
    assert f'<link rel="canonical" href="{expected_map_url}">' in html
    assert f'<meta http-equiv="refresh" content="0;url={expected_map_url}">' in html


def test_poster_is_social_card_png(api):
    created = api.post(f"{BASE_URL}/api/decision-maps", json={"industry": "fashion"}, timeout=10)
    map_id = created.json()["id"]
    response = api.get(f"{BASE_URL}/api/decision-maps/{map_id}/poster.png", timeout=10)
    assert response.status_code == 200
    assert response.headers["content-type"].startswith("image/png")
    assert response.content[:8] == b"\x89PNG\r\n\x1a\n"
    assert len(response.content) > 10000


def test_poster_dimensions_are_1200x630(api):
    created = api.post(f"{BASE_URL}/api/decision-maps", json={"industry": "saas"}, timeout=10)
    map_id = created.json()["id"]
    response = api.get(f"{BASE_URL}/api/decision-maps/{map_id}/poster.png", timeout=10)
    assert response.status_code == 200
    image = Image.open(io.BytesIO(response.content))
    assert image.size == (1200, 630)


def test_share_and_poster_missing_map_return_404(api):
    share_resp = api.get(f"{BASE_URL}/api/decision-maps/not_real_map/share", timeout=10, allow_redirects=False)
    poster_resp = api.get(f"{BASE_URL}/api/decision-maps/not_real_map/poster.png", timeout=10)
    assert share_resp.status_code == 404
    assert poster_resp.status_code == 404


def test_invalid_industry_returns_422(api):
    r = api.post(f"{BASE_URL}/api/decision-maps", json={"industry": "banking"}, timeout=10)
    assert r.status_code == 422


def test_missing_industry_returns_422(api):
    r = api.post(f"{BASE_URL}/api/decision-maps", json={}, timeout=10)
    assert r.status_code == 422


def test_waitlist_regression(api):
    """Regression: waitlist still works."""
    payload = {
        "name": "TEST Reviewer",
        "email": f"test_dm_{os.urandom(4).hex()}@example.com",
        "company": "TEST Co",
        "role": "Tester",
        "use_case": "financial-services",
        "message": "regression test",
        "consent": True,
    }
    r = api.post(f"{BASE_URL}/api/waitlist", json=payload, timeout=10)
    assert r.status_code == 201, r.text
    assert r.json()["status"] == "joined"
