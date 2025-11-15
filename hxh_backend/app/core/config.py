import os
from functools import lru_cache

from pydantic import BaseSettings


class Settings(BaseSettings):
    mongo_url: str = os.getenv("MONGO_URL", "")
    mongo_db: str = os.getenv("MONGO_DB", "hunterxhunter_db")
    app_title: str = "Hunter x Hunter API"
    app_description: str = "Microservicios REST para gestionar a los cazadores de Hunter x Hunter"
    app_version: str = "1.0.0"
    docs_url: str = "/api-hxh/docs"
    openapi_url: str = "/api-hxh/openapi.json"
    allowed_origins: list[str] = ["*"]

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


@lru_cache
def get_settings() -> Settings:
    settings = Settings()
    if not settings.mongo_url:
        raise RuntimeError("MONGO_URL environment variable is required")
    return settings

