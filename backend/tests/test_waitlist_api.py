"""API regression tests for health and waitlist flows."""

import os
from pathlib import Path
from uuid import uuid4

import pytest
import requests
from dotenv import load_dotenv


# Module: environment/base URL resolution for external preview API testing
load_dotenv(Path(__file__).resolve().parents[2] / "frontend" / ".env")
BASE_URL = os.environ.get("REACT_APP_BACKEND_URL")


@pytest.fixture(scope="module")
def api_client():
    session = requests.Session()
    session.headers.update({"Content-Type": "application/json"})
    return session


def _require_base_url() -> str:
    if not BASE_URL:
        pytest.skip("REACT_APP_BACKEND_URL is not configured")
    return BASE_URL.rstrip("/")


# Feature: health endpoint contract
def test_health_endpoint_ok(api_client):
    base = _require_base_url()
    response = api_client.get(f"{base}/api/health", timeout=20)

    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"
    assert data["service"] == "acoord-web"


# Feature: waitlist create + idempotent duplicate handling
def test_waitlist_create_and_duplicate_idempotent(api_client):
    base = _require_base_url()
    email = f"test_waitlist_{uuid4().hex[:10]}@example.com"
    payload = {
        "name": "TEST QA Runner",
        "email": email,
        "company": "TEST Systems",
        "role": "QA Engineer",
        "use_case": "ai-native",
        "message": "Testing waitlist flow",
        "consent": True,
    }

    create_response = api_client.post(f"{base}/api/waitlist", json=payload, timeout=25)
    assert create_response.status_code == 201
    create_data = create_response.json()
    assert create_data["email"] == email
    assert create_data["status"] == "joined"
    assert isinstance(create_data["id"], str)
    assert len(create_data["id"]) > 0

    duplicate_response = api_client.post(
        f"{base}/api/waitlist", json=payload, timeout=25
    )
    assert duplicate_response.status_code == 201
    duplicate_data = duplicate_response.json()
    assert duplicate_data["email"] == email
    assert duplicate_data["status"] == "already_joined"
    assert duplicate_data["id"] == create_data["id"]


# Feature: waitlist validation handling for malformed payload
def test_waitlist_invalid_email_rejected(api_client):
    base = _require_base_url()
    payload = {
        "name": "TEST QA Runner",
        "email": "invalid-email",
        "company": "TEST Systems",
        "role": "QA Engineer",
        "use_case": "ai-native",
        "message": "Validation check",
        "consent": True,
    }

    response = api_client.post(f"{base}/api/waitlist", json=payload, timeout=25)

    assert response.status_code == 422
    data = response.json()
    assert "detail" in data
    assert isinstance(data["detail"], list)


# Feature: consent enforcement on waitlist submissions
def test_waitlist_without_consent_rejected(api_client):
    base = _require_base_url()
    payload = {
        "name": "TEST QA Runner",
        "email": f"test_noconsent_{uuid4().hex[:8]}@example.com",
        "company": "TEST Systems",
        "role": "QA Engineer",
        "use_case": "ai-native",
        "message": "Consent validation check",
        "consent": False,
    }

    response = api_client.post(f"{base}/api/waitlist", json=payload, timeout=25)

    assert response.status_code == 422
    data = response.json()
    assert "detail" in data
    assert isinstance(data["detail"], list)
