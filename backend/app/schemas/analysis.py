from pydantic import BaseModel, Field
from typing import List, Optional

class DiagnosisSchema(BaseModel):
    crop: str = Field(..., description="Target crop identified, e.g. Tomato, Rice, Maize")
    possible_issue: str = Field(..., description="Diagnosed disease, pest, or condition name")
    issue_type: str = Field(..., description="disease, pest, nutrient_deficiency, or healthy")
    confidence: float = Field(..., description="Numerical score from 0.0 to 1.0")
    confidence_level: str = Field(..., description="high, medium, low, or inconclusive")
    severity: str = Field(..., description="low, moderate, high, or inconclusive")
    image_quality: str = Field(..., description="good, blurry, dark, distant, or inconclusive")
    visible_symptoms: List[str] = Field(default_factory=list)
    alternative_possibilities: List[str] = Field(default_factory=list)
    evidence: List[str] = Field(default_factory=list)

class LocationSchema(BaseModel):
    latitude: float
    longitude: float
    display_name: str = "Unknown Location"

class HourlyForecastSchema(BaseModel):
    time: str
    temperature: float
    humidity: float
    precipitation: float
    rain_probability: float

class WeatherSchema(BaseModel):
    temperature: float
    humidity: float
    rain_probability: float
    precipitation: float
    wind_speed: float
    weather_condition: str
    next_rain_hours: Optional[float] = None
    agricultural_summary: str
    forecast: List[HourlyForecastSchema] = Field(default_factory=list)

class RiskSchema(BaseModel):
    level: str = Field(..., description="low, moderate, high, inconclusive")
    summary: str
    factors: List[str] = Field(default_factory=list)

class RecommendationSchema(BaseModel):
    what_to_do_now: List[str] = Field(default_factory=list)
    what_to_avoid: List[str] = Field(default_factory=list)
    timing: str
    reassess: str
    expert_help: str

class ExplanationSchema(BaseModel):
    leaf_evidence: str
    weather_context: str
    reasoning: str
    decision: str

class AnalysisResponseSchema(BaseModel):
    diagnosis: DiagnosisSchema
    location: LocationSchema
    weather: WeatherSchema
    risk: RiskSchema
    recommendation: RecommendationSchema
    explanation: ExplanationSchema
    is_demo_mode: bool = False
