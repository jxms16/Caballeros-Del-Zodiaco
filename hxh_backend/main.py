import os
from typing import List, Optional

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from pymongo import MongoClient
from bson import ObjectId
from dotenv import load_dotenv

load_dotenv()

MONGO_URL = os.getenv("MONGO_URL")
MONGO_DB = os.getenv("MONGO_DB", "hunterxhunter_db")

if not MONGO_URL:
    raise RuntimeError("MONGO_URL environment variable is required")

client = MongoClient(MONGO_URL)
db = client[MONGO_DB]
hunters_collection = db["hunters"]

app = FastAPI(
    title="Hunter x Hunter API",
    description="Microservicios REST para gestionar a los cazadores de Hunter x Hunter",
    version="1.0.0",
    docs_url="/api-hxh/docs",
    openapi_url="/api-hxh/openapi.json",
    contact={
        "name": "Hunter API Support",
        "email": "support@hunterx.com",
    },
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if isinstance(v, ObjectId):
            return v
        try:
            return ObjectId(str(v))
        except Exception as exc:
            raise ValueError("Invalid ObjectId") from exc


class HunterBase(BaseModel):
    nombre: str = Field(..., description="Nombre del cazador")
    edad: Optional[int] = Field(None, description="Edad del cazador")
    nen_tipo: Optional[str] = Field(None, description="Tipo de Nen")
    afiliacion: Optional[str] = Field(None, description="Afiliación o rol")
    imagen_url: str = Field(..., description="URL de imagen del cazador")


class HunterCreate(HunterBase):
    pass


class HunterResponse(HunterBase):
    id: PyObjectId = Field(..., alias="_id")

    class Config:
        json_encoders = {ObjectId: str}
        populate_by_name = True


def seed_hunters():
    if hunters_collection.count_documents({}) > 0:
        return

    initial_hunters = [
        {
            "nombre": "Gon Freecss",
            "edad": 12,
            "nen_tipo": "Refuerzo",
            "afiliacion": "Cazador",
            "imagen_url": "https://i.pinimg.com/736x/d7/2e/64/d72e64e53ce38afcb7631c6fba588693.jpg",
        },
        {
            "nombre": "Killua Zoldyck",
            "edad": 12,
            "nen_tipo": "Transmutación",
            "afiliacion": "Cazador / Familia Zoldyck",
            "imagen_url": "https://i.pinimg.com/736x/25/46/39/2546398e742dc4a5e7412ab1c0381353.jpg",
        },
        {
            "nombre": "Kurapika",
            "edad": 17,
            "nen_tipo": "Especialización",
            "afiliacion": "Clan Kurta",
            "imagen_url": "https://i.pinimg.com/736x/da/1f/57/da1f57bfcfa39b2b59f1ba673fbea726.jpg",
        },
        {
            "nombre": "Leorio Paradinight",
            "edad": 19,
            "nen_tipo": "Emisión",
            "afiliacion": "Cazador / Médico",
            "imagen_url": "https://i.pinimg.com/736x/87/6c/43/876c43b4c0cf42f6b75e4f0e6a85ab8d.jpg",
        },
        {
            "nombre": "Hisoka Morow",
            "edad": 28,
            "nen_tipo": "Transmutación",
            "afiliacion": "Cazador / Fantasma",
            "imagen_url": "https://i.pinimg.com/736x/d7/f1/76/d7f17607580b3a3d237b640a35b97e16.jpg",
        },
        {
            "nombre": "Chrollo Lucilfer",
            "edad": 26,
            "nen_tipo": "Especialización",
            "afiliacion": "Genei Ryodan",
            "imagen_url": "https://i.pinimg.com/736x/84/1f/f6/841ff6be8f47935d69be6c360234a2ef.jpg",
        },
        {
            "nombre": "Biscuit Krueger",
            "edad": 57,
            "nen_tipo": "Transmutación",
            "afiliacion": "Cazadora",
            "imagen_url": "https://i.pinimg.com/736x/2b/9b/b1/2b9bb12998b39d8e66d2ada25b3f1b62.jpg",
        },
        {
            "nombre": "Isaac Netero",
            "edad": 110,
            "nen_tipo": "Refuerzo",
            "afiliacion": "Asociación de Cazadores",
            "imagen_url": "https://i.pinimg.com/736x/02/9f/55/029f55fa9de72152a605f248a94b44bd.jpg",
        },
        {
            "nombre": "Meruem",
            "edad": 0,
            "nen_tipo": "Especialización",
            "afiliacion": "Hormigas Quimera",
            "imagen_url": "https://i.pinimg.com/736x/c4/ef/63/c4ef634729df66b236a2255a60365aa9.jpg",
        },
        {
            "nombre": "Neferpitou",
            "edad": 1,
            "nen_tipo": "Especialización",
            "afiliacion": "Guardia Real",
            "imagen_url": "https://i.pinimg.com/736x/1a/a0/1e/1aa01e28050ad73e6705b83d6d0bca68.jpg",
        },
        {
            "nombre": "Morel Mackernasey",
            "edad": 45,
            "nen_tipo": "Materialización",
            "afiliacion": "Cazador",
            "imagen_url": "https://i.pinimg.com/736x/d9/a0/30/d9a03095361221f9cec1f1d0cd3bcbf8.jpg",
        },
        {
            "nombre": "Knuckle Bine",
            "edad": 28,
            "nen_tipo": "Emisión",
            "afiliacion": "Cazador",
            "imagen_url": "https://i.pinimg.com/736x/9f/52/80/9f5280aa3c2c5d5f0cc0c8c30c112b62.jpg",
        },
    ]

    hunters_collection.insert_many(initial_hunters)
    print("Hunters iniciales insertados correctamente")


def serialize_hunter(hunter) -> dict:
    hunter["_id"] = str(hunter["_id"])
    return hunter


@app.on_event("startup")
def startup_event():
    seed_hunters()


@app.get("/api-hxh/hunters", response_model=List[HunterResponse])
def get_hunters():
    hunters = list(hunters_collection.find().sort("nombre", 1))
    return hunters


@app.get("/api-hxh/hunters/{hunter_id}", response_model=HunterResponse)
def get_hunter(hunter_id: str):
    try:
        hunter = hunters_collection.find_one({"_id": ObjectId(hunter_id)})
    except Exception as exc:
        raise HTTPException(status_code=400, detail="ID inválido") from exc

    if not hunter:
        raise HTTPException(status_code=404, detail="Cazador no encontrado")
    return hunter


@app.post("/api-hxh/hunters", response_model=HunterResponse, status_code=201)
def create_hunter(hunter: HunterCreate):
    result = hunters_collection.insert_one(hunter.model_dump())
    created = hunters_collection.find_one({"_id": result.inserted_id})
    return created


@app.delete("/api-hxh/hunters/{hunter_id}", status_code=204)
def delete_hunter(hunter_id: str):
    try:
        deletion = hunters_collection.delete_one({"_id": ObjectId(hunter_id)})
    except Exception as exc:
        raise HTTPException(status_code=400, detail="ID inválido") from exc

    if deletion.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Cazador no encontrado")
    return None


@app.get("/api-hxh")
def root_info():
    return {
        "mensaje": "API de Hunter x Hunter",
        "version": "1.0.0",
        "swagger": "/api-hxh/docs",
        "recursos": {
            "listar": "/api-hxh/hunters",
            "crear": "/api-hxh/hunters",
            "detalle": "/api-hxh/hunters/{id}",
        },
    }


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=int(os.getenv("PORT", 8000)),
        reload=True,
    )

