from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="KREVION Healthcare API")
api_router = APIRouter(prefix="/api")


# ---------- Models ----------
class ContactSubmission(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    company: Optional[str] = None
    country: Optional[str] = None
    phone: Optional[str] = None
    email: EmailStr
    required_products: Optional[str] = None
    target_market: Optional[str] = None
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ContactCreate(BaseModel):
    name: str
    company: Optional[str] = None
    country: Optional[str] = None
    phone: Optional[str] = None
    email: EmailStr
    required_products: Optional[str] = None
    target_market: Optional[str] = None
    message: str


class QuotationSubmission(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    company: str
    country: str
    phone: Optional[str] = None
    email: EmailStr
    product_category: Optional[str] = None
    required_products: str
    quantity: Optional[str] = None
    target_market: Optional[str] = None
    notes: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class QuotationCreate(BaseModel):
    name: str
    company: str
    country: str
    phone: Optional[str] = None
    email: EmailStr
    product_category: Optional[str] = None
    required_products: str
    quantity: Optional[str] = None
    target_market: Optional[str] = None
    notes: Optional[str] = None


class NewsletterSubmission(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class NewsletterCreate(BaseModel):
    email: EmailStr


class ProductInquiry(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    product_id: str
    product_name: str
    name: str
    email: EmailStr
    company: Optional[str] = None
    country: Optional[str] = None
    message: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ProductInquiryCreate(BaseModel):
    product_id: str
    product_name: str
    name: str
    email: EmailStr
    company: Optional[str] = None
    country: Optional[str] = None
    message: Optional[str] = None


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "KREVION Healthcare API", "status": "operational"}


@api_router.get("/health")
async def health():
    return {"status": "ok", "service": "krevion-api"}


@api_router.post("/contact", response_model=ContactSubmission)
async def submit_contact(payload: ContactCreate):
    obj = ContactSubmission(**payload.model_dump())
    doc = obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.contact_submissions.insert_one(doc)
    return obj


@api_router.get("/contact", response_model=List[ContactSubmission])
async def list_contacts():
    docs = await db.contact_submissions.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    for d in docs:
        if isinstance(d.get('created_at'), str):
            d['created_at'] = datetime.fromisoformat(d['created_at'])
    return docs


@api_router.post("/quotation", response_model=QuotationSubmission)
async def submit_quotation(payload: QuotationCreate):
    obj = QuotationSubmission(**payload.model_dump())
    doc = obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.quotation_submissions.insert_one(doc)
    return obj


@api_router.get("/quotation", response_model=List[QuotationSubmission])
async def list_quotations():
    docs = await db.quotation_submissions.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    for d in docs:
        if isinstance(d.get('created_at'), str):
            d['created_at'] = datetime.fromisoformat(d['created_at'])
    return docs


@api_router.post("/newsletter", response_model=NewsletterSubmission)
async def subscribe_newsletter(payload: NewsletterCreate):
    existing = await db.newsletter_subscribers.find_one({"email": payload.email})
    if existing:
        raise HTTPException(status_code=409, detail="Email already subscribed")
    obj = NewsletterSubmission(**payload.model_dump())
    doc = obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.newsletter_subscribers.insert_one(doc)
    return obj


@api_router.post("/product-inquiry", response_model=ProductInquiry)
async def submit_product_inquiry(payload: ProductInquiryCreate):
    obj = ProductInquiry(**payload.model_dump())
    doc = obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.product_inquiries.insert_one(doc)
    return obj


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
