import os
import html
import io
import random
import secrets
from datetime import datetime, timezone
from typing import Literal
from uuid import uuid4

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse, Response
from motor.motor_asyncio import AsyncIOMotorClient
from PIL import Image, ImageDraw, ImageFont
from pydantic import BaseModel, EmailStr, Field
from pymongo import ReturnDocument
from pymongo.errors import DuplicateKeyError

load_dotenv()

mongo_url = os.environ.get("MONGO_URL")
db_name = os.environ.get("DB_NAME")
app_url = os.environ.get("APP_URL")
if not mongo_url or not db_name:
    raise RuntimeError("MONGO_URL and DB_NAME are required")

client = AsyncIOMotorClient(mongo_url)
db = client[db_name]
app = FastAPI(title="Acoord Website API", version="1.0.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[app_url] if app_url else [],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


class WaitlistRequest(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    company: str = Field(min_length=2, max_length=160)
    role: str = Field(min_length=2, max_length=120)
    use_case: Literal[
        "financial-services",
        "healthcare",
        "legal",
        "devops",
        "commerce",
        "government",
        "education",
        "manufacturing",
        "insurance",
        "ai-native",
        "other",
    ]
    message: str = Field(default="", max_length=1200)
    consent: Literal[True]


class WaitlistResponse(BaseModel):
    id: str
    email: EmailStr
    status: str


class NewsletterRequest(BaseModel):
    email: EmailStr
    consent: Literal[True]


class NewsletterResponse(BaseModel):
    id: str
    email: EmailStr
    status: str


DecisionMapIndustry = Literal[
    "finance",
    "legal",
    "manufacturing",
    "customer-support",
    "logistics",
    "ecommerce",
    "saas",
    "fashion",
]


class DecisionMapRequest(BaseModel):
    industry: DecisionMapIndustry


class DecisionMapResponse(BaseModel):
    id: str
    industry: str
    path: str
    share_path: str
    poster_path: str
    created_at: str
    views: int


INDUSTRY_POSTERS = {
    "finance": ("FINANCE", "A cited risk decision before market open."),
    "legal": ("LEGAL", "Clause-level evidence with counsel in control."),
    "manufacturing": ("MANUFACTURING", "From sensor drift to bounded containment."),
    "customer-support": ("CUSTOMER SUPPORT", "Grounded resolution at enterprise scale."),
    "logistics": ("LOGISTICS", "A disrupted network, replanned with authority visible."),
    "ecommerce": ("E-COMMERCE", "Margin, trust, and exceptions in one record."),
    "saas": ("SAAS", "A renewal plan grounded across every customer signal."),
    "fashion": ("FASHION", "Evidence and economics without automating taste."),
}


def response_paths(map_id: str) -> dict[str, str]:
    return {
        "path": f"/map/{map_id}",
        "share_path": f"/api/decision-maps/{map_id}/share",
        "poster_path": f"/api/decision-maps/{map_id}/poster.png",
    }


def poster_font(size: int) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    candidates = (
        "/usr/share/fonts/truetype/wqy/wqy-zenhei.ttc",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    )
    for path in candidates:
        if os.path.exists(path):
            return ImageFont.truetype(path, size=size)
    return ImageFont.load_default()


def build_poster(industry: str, map_id: str) -> bytes:
    label, statement = INDUSTRY_POSTERS[industry]
    image = Image.new("RGB", (1200, 630), "#000000")
    draw = ImageDraw.Draw(image)
    rng = random.Random(f"{industry}:{map_id}")
    points: list[tuple[int, int]] = []

    for index in range(12):
        x = rng.randint(620, 1150)
        y = rng.randint(70, 560)
        size = rng.randint(7, 19)
        draw.rectangle((x - size, y - size, x + size, y + size), outline="#ffffff", width=2)
        if index:
            px, py = points[-1]
            draw.line((px, py, x, y), fill="#5f5f5f", width=2)
        points.append((x, y))

    draw.line((70, 74, 1130, 74), fill="#ffffff", width=2)
    draw.line((70, 556, 1130, 556), fill="#ffffff", width=2)
    draw.text((70, 30), "a:  ACOORD / DECISION MAP", fill="#ffffff", font=poster_font(22))
    draw.text((70, 108), label, fill="#a8a8a8", font=poster_font(24))
    draw.text((70, 176), "ONE DECISION.", fill="#ffffff", font=poster_font(67))
    draw.text((70, 252), "NINE CHAPTERS.", fill="#ffffff", font=poster_font(67))
    draw.multiline_text((73, 360), statement, fill="#c8c8c8", font=poster_font(28), spacing=8)
    draw.text((70, 579), f"REEL {map_id[:8].upper()}  /  MODELED RUN  /  4 MIN READ", fill="#ffffff", font=poster_font(18))

    output = io.BytesIO()
    image.save(output, format="PNG", optimize=True)
    return output.getvalue()


@app.on_event("startup")
async def prepare_database() -> None:
    await db.waitlist.create_index("email", unique=True)
    await db.newsletter.create_index("email", unique=True)
    await db.decision_maps.create_index("id", unique=True)


@app.get("/api/health")
async def health() -> dict[str, str]:
    await db.command("ping")
    return {"status": "ok", "service": "acoord-web"}


@app.post(
    "/api/waitlist",
    response_model=WaitlistResponse,
    status_code=status.HTTP_201_CREATED,
)
async def join_waitlist(payload: WaitlistRequest) -> WaitlistResponse:
    normalized_email = payload.email.lower()
    existing = await db.waitlist.find_one(
        {"email": normalized_email}, {"_id": 0, "id": 1, "email": 1}
    )
    if existing:
        return WaitlistResponse(
            id=existing["id"], email=existing["email"], status="already_joined"
        )

    document = payload.model_dump()
    document.update(
        {
            "id": str(uuid4()),
            "email": normalized_email,
            "created_at": datetime.now(timezone.utc).isoformat(),
            "consented_at": datetime.now(timezone.utc).isoformat(),
            "privacy_notice_version": "2026-04-08",
            "source": "acoord.co",
        }
    )
    try:
        await db.waitlist.insert_one(document)
    except DuplicateKeyError:
        existing = await db.waitlist.find_one(
            {"email": normalized_email}, {"_id": 0, "id": 1, "email": 1}
        )
        if existing:
            return WaitlistResponse(
                id=existing["id"],
                email=existing["email"],
                status="already_joined",
            )
        raise HTTPException(status_code=409, detail="Email is already registered")
    except Exception as exc:
        raise HTTPException(status_code=500, detail="Unable to save your request") from exc
    return WaitlistResponse(
        id=document["id"], email=document["email"], status="joined"
    )


@app.post(
    "/api/newsletter",
    response_model=NewsletterResponse,
    status_code=status.HTTP_201_CREATED,
)
async def subscribe_newsletter(payload: NewsletterRequest) -> NewsletterResponse:
    normalized_email = payload.email.lower()
    existing = await db.newsletter.find_one(
        {"email": normalized_email}, {"_id": 0, "id": 1, "email": 1}
    )
    if existing:
        return NewsletterResponse(
            id=existing["id"], email=existing["email"], status="already_subscribed"
        )

    document = {
        "id": str(uuid4()),
        "email": normalized_email,
        "consent": payload.consent,
        "created_at": datetime.now(timezone.utc).isoformat(),
        "consented_at": datetime.now(timezone.utc).isoformat(),
        "privacy_notice_version": "2026-04-08",
        "source": "acoord.co/field-notes",
    }
    try:
        await db.newsletter.insert_one(document)
    except DuplicateKeyError:
        existing = await db.newsletter.find_one(
            {"email": normalized_email}, {"_id": 0, "id": 1, "email": 1}
        )
        if existing:
            return NewsletterResponse(
                id=existing["id"],
                email=existing["email"],
                status="already_subscribed",
            )
        raise HTTPException(status_code=409, detail="Email is already subscribed")
    except Exception as exc:
        raise HTTPException(status_code=500, detail="Unable to save subscription") from exc
    return NewsletterResponse(
        id=document["id"], email=document["email"], status="subscribed"
    )


@app.post(
    "/api/decision-maps",
    response_model=DecisionMapResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create_decision_map(payload: DecisionMapRequest) -> DecisionMapResponse:
    document = {
        "id": secrets.token_urlsafe(6),
        "industry": payload.industry,
        "created_at": datetime.now(timezone.utc).isoformat(),
        "views": 0,
        "source": "acoord.co/film",
    }
    try:
        await db.decision_maps.insert_one(document)
    except DuplicateKeyError:
        document["id"] = secrets.token_urlsafe(8)
        await db.decision_maps.insert_one(document)
    except Exception as exc:
        raise HTTPException(status_code=500, detail="Unable to create the decision map") from exc
    paths = response_paths(document["id"])
    return DecisionMapResponse(
        id=document["id"],
        industry=document["industry"],
        **paths,
        created_at=document["created_at"],
        views=document["views"],
    )


@app.get("/api/decision-maps/{map_id}", response_model=DecisionMapResponse)
async def get_decision_map(map_id: str) -> DecisionMapResponse:
    document = await db.decision_maps.find_one_and_update(
        {"id": map_id},
        {"$inc": {"views": 1}},
        projection={"_id": 0},
        return_document=ReturnDocument.AFTER,
    )
    if not document:
        raise HTTPException(status_code=404, detail="Decision map not found")
    paths = response_paths(document["id"])
    return DecisionMapResponse(
        id=document["id"],
        industry=document["industry"],
        **paths,
        created_at=document["created_at"],
        views=document["views"],
    )


@app.get("/api/decision-maps/{map_id}/poster.png")
async def decision_map_poster(map_id: str) -> Response:
    document = await db.decision_maps.find_one(
        {"id": map_id}, {"_id": 0, "id": 1, "industry": 1}
    )
    if not document:
        raise HTTPException(status_code=404, detail="Decision map not found")
    return Response(
        content=build_poster(document["industry"], document["id"]),
        media_type="image/png",
        headers={"Cache-Control": "public, max-age=31536000, immutable"},
    )


@app.get("/api/decision-maps/{map_id}/share", response_class=HTMLResponse)
async def share_decision_map(map_id: str, request: Request) -> HTMLResponse:
    document = await db.decision_maps.find_one(
        {"id": map_id}, {"_id": 0, "id": 1, "industry": 1}
    )
    if not document:
        raise HTTPException(status_code=404, detail="Decision map not found")

    label, statement = INDUSTRY_POSTERS[document["industry"]]
    origin = str(request.base_url).rstrip("/")
    map_url = f"{origin}/map/{document['id']}"
    poster_url = f"{origin}/api/decision-maps/{document['id']}/poster.png"
    title = f"{label.title()} decision map | Acoord"
    description = f"One decision, nine chapters. {statement}"
    page = f"""<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<title>{html.escape(title)}</title>
<meta name="description" content="{html.escape(description)}">
<meta property="og:title" content="{html.escape(title)}">
<meta property="og:description" content="{html.escape(description)}">
<meta property="og:type" content="article">
<meta property="og:url" content="{html.escape(str(request.url))}">
<meta property="og:image" content="{html.escape(poster_url)}">
<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{html.escape(title)}">
<meta name="twitter:description" content="{html.escape(description)}">
<meta name="twitter:image" content="{html.escape(poster_url)}">
<link rel="canonical" href="{html.escape(map_url)}">
<meta http-equiv="refresh" content="0;url={html.escape(map_url)}">
</head><body><a href="{html.escape(map_url)}">Open the Acoord decision map</a></body></html>"""
    return HTMLResponse(content=page, headers={"Cache-Control": "public, max-age=300"})


@app.on_event("shutdown")
async def close_database() -> None:
    client.close()