import httpx
from app.config import settings
from app.schemas.analysis import LocationSchema

async def reverse_geocode(latitude: float, longitude: float) -> LocationSchema:
    """
    Performs reverse geocoding via Nominatim/OpenStreetMap with standard fallback.
    """
    headers = {"User-Agent": "AgriResilienceAI-HackathonApp/1.0"}
    params = {
        "lat": latitude,
        "lon": longitude,
        "format": "json",
        "zoom": 10
    }
    
    try:
        async with httpx.AsyncClient(timeout=1.5) as client:
            resp = await client.get(settings.NOMINATIM_BASE_URL, params=params, headers=headers)
            if resp.status_code == 200:
                data = resp.json()
                display_name = data.get("display_name", "")
                if display_name:
                    # Shorten long address strings if needed
                    parts = [p.strip() for p in display_name.split(",")]
                    short_name = ", ".join(parts[:3]) if len(parts) >= 3 else display_name
                    return LocationSchema(
                        latitude=latitude,
                        longitude=longitude,
                        display_name=short_name
                    )
    except Exception as e:
        print(f"Location reverse geocode error or offline: {e}")

    # Fallback coordinate representation
    return LocationSchema(
        latitude=latitude,
        longitude=longitude,
        display_name=f"Farm Field ({latitude:.2f}°, {longitude:.2f}°)"
    )
