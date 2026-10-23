from functools import lru_cache
from urllib.parse import urlparse

from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    supabase_url: str
    cors_origins: str = "http://localhost:5173"

    @field_validator("supabase_url")
    @classmethod
    def valid_supabase_url(cls, value: str) -> str:
        parsed = urlparse(value)
        if (parsed.scheme != "https" or not parsed.netloc or parsed.path not in ("", "/")
                or "your-project" in parsed.netloc):
            raise ValueError("SUPABASE_URL must be an HTTPS project root URL")
        return value.rstrip("/")

    @property
    def allowed_origins(self) -> list[str]:
        origins = [item.strip() for item in self.cors_origins.split(",") if item.strip()]
        if not origins or any(
            origin == "*"
            or urlparse(origin).scheme not in ("http", "https")
            or not urlparse(origin).netloc
            or urlparse(origin).path not in ("", "/")
            for origin in origins
        ):
            raise ValueError("CORS_ORIGINS must contain explicit URL origins")
        return origins


@lru_cache
def get_settings() -> Settings:
    return Settings()
