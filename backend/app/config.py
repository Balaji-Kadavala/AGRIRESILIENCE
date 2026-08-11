import os
from pathlib import Path

# Ensure .env is explicitly loaded from backend directory
env_path = Path(__file__).resolve().parent.parent / '.env'

try:
    from dotenv import load_dotenv
    load_dotenv(dotenv_path=env_path)
except Exception:
    pass

class Settings:
    PROJECT_NAME: str = "AGRIRESILIENCE AI"
    VERSION: str = "1.0.0"
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    OPEN_METEO_BASE_URL: str = "https://api.open-meteo.com/v1/forecast"
    NOMINATIM_BASE_URL: str = "https://nominatim.openstreetmap.org/reverse"

settings = Settings()

