from typing import Optional

from bson import ObjectId
from pydantic import BaseModel, Field


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

