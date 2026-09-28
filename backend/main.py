import json
import os
from pathlib import Path

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient

load_dotenv(Path(__file__).resolve().parent / ".env")

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_methods=["GET"],
    allow_headers=["*"],
)

mongodb_uri = os.getenv("MONGODB_URI")
client = MongoClient(mongodb_uri, serverSelectionTimeoutMS=3000) if mongodb_uri else None
db = client["keharivo"] if client is not None else None
catalog_path = Path(__file__).resolve().parent.parent / "shared" / "products.json"


@app.get("/")
def home():
    return {"message": "Welcome to Keharivo Backend"}


@app.get("/api/health")
def api_health():
    if client is None:
        raise HTTPException(status_code=503, detail="MongoDB is not configured.")

    try:
        client.admin.command("ping")
        return {"status": "ok", "database": "connected"}
    except Exception as error:
        raise HTTPException(status_code=503, detail="MongoDB is unavailable.") from error


@app.get("/api/products")
def get_products():
    try:
        if db is not None:
            client.admin.command("ping")
            collection = db["products"]
            collection.create_index("id", unique=True)

            if collection.count_documents({}) == 0:
                with catalog_path.open(encoding="utf-8") as catalog_file:
                    collection.insert_many(json.load(catalog_file))

            return {
                "source": "mongodb",
                "products": list(collection.find({}, {"_id": 0}).sort("id", 1)),
            }
    except Exception:
        pass

    with catalog_path.open(encoding="utf-8") as catalog_file:
        return {"source": "shared-catalog", "products": json.load(catalog_file)}


@app.get("/mongodb-test")
def mongodb_test():
    if client is None:
        return {"status": "error", "message": "MongoDB is not configured."}

    try:
        client.admin.command("ping")
        return {"status": "success", "message": "MongoDB connected successfully!"}
    except Exception:
        return {"status": "error", "message": "MongoDB is unavailable."}