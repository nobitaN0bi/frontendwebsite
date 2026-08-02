import os
from datetime import datetime, timezone
from typing import Literal
from uuid import uuid4

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, EmailStr, Field
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


class WaitlistResponse(BaseModel):
    id: str
    email: EmailStr
    status: str


@app.on_event("startup")
async def prepare_database() -> None:
    await db.waitlist.create_index("email", unique=True)


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


@app.on_event("shutdown")
async def close_database() -> None:
    client.close()