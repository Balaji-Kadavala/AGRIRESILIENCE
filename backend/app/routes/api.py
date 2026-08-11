from fastapi import APIRouter, UploadFile, File, Form, Query, HTTPException, status
from typing import Optional
from app.schemas.analysis import AnalysisResponseSchema, WeatherSchema
from app.services.weather_service import fetch_weather
from app.services.location_service import reverse_geocode
from app.services.ai_service import analyze_crop_image
from app.services.agronomy_engine import evaluate_agronomic_decision

router = APIRouter(prefix="/api")

@router.get("/health")
async def health_check():
    """Health check endpoint for application status."""
    return {"status": "ok", "service": "AGRIRESILIENCE AI API"}

@router.get("/weather", response_model=WeatherSchema)
async def get_weather(
    latitude: float = Query(..., description="Latitude of the field location"),
    longitude: float = Query(..., description="Longitude of the field location")
):
    """Fetch live agricultural weather forecast for given field coordinates."""
    try:
        weather_data = await fetch_weather(latitude, longitude)
        return weather_data
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch weather data: {str(e)}"
        )

@router.post("/analyze", response_model=AnalysisResponseSchema)
async def analyze_field(
    image: Optional[UploadFile] = File(None),
    latitude: float = Form(16.53),
    longitude: float = Form(80.58),
    force_demo: bool = Form(False),
    force_inconclusive: bool = Form(False)
):
    """
    Main End-to-End Field Analysis Pipeline:
    Leaf Image + Farm Coordinates -> AI Vision Diagnosis + Live Weather + Agronomic Reasoning Engine -> Actionable Plan
    """
    try:
        image_bytes = b""
        filename = ""
        if image:
            image_bytes = await image.read()
            filename = image.filename or ""
        elif not force_demo:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="No crop leaf image uploaded. Please upload a clear photo of your affected crop leaf to run analysis."
            )

        # Step 1: Location Reverse Geocoding
        location_data = await reverse_geocode(latitude, longitude)

        # Step 2: Fetch Live Agricultural Weather
        weather_data = await fetch_weather(latitude, longitude)

        # Step 3: AI Crop & Leaf Disease Analysis
        diagnosis_data = await analyze_crop_image(
            image_bytes=image_bytes,
            filename=filename,
            force_demo=force_demo,
            force_inconclusive=force_inconclusive
        )

        # Step 4: Agronomic Reasoning Engine (Diagnosis + Weather -> Action Plan)
        reasoning_result = evaluate_agronomic_decision(diagnosis_data, weather_data)

        # Step 5: Construct Structured Response
        response = AnalysisResponseSchema(
            diagnosis=diagnosis_data,
            location=location_data,
            weather=weather_data,
            risk=reasoning_result["risk"],
            recommendation=reasoning_result["recommendation"],
            explanation=reasoning_result["explanation"],
            is_demo_mode=force_demo or (len(image_bytes) == 0)
        )

        return response

    except HTTPException:
        raise
    except Exception as e:
        print(f"Error in field analysis endpoint: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred during field analysis: {str(e)}"
        )

@router.get("/demo-scenario", response_model=AnalysisResponseSchema)
async def get_demo_scenario():
    """
    Returns a realistic pre-populated demonstration scenario for hackathon presentations.
    Scenario: Tomato Early Blight with upcoming rainfall in 4 hours and 82% humidity.
    """
    lat, lon = 16.53, 80.58
    location_data = await reverse_geocode(lat, lon)
    weather_data = await fetch_weather(lat, lon)
    diagnosis_data = await analyze_crop_image(image_bytes=b"demo", filename="demo.jpg", force_demo=True)
    reasoning_result = evaluate_agronomic_decision(diagnosis_data, weather_data)

    return AnalysisResponseSchema(
        diagnosis=diagnosis_data,
        location=location_data,
        weather=weather_data,
        risk=reasoning_result["risk"],
        recommendation=reasoning_result["recommendation"],
        explanation=reasoning_result["explanation"],
        is_demo_mode=True
    )
