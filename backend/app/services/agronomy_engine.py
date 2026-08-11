from typing import Dict, Any, List
from app.schemas.analysis import (
    DiagnosisSchema,
    WeatherSchema,
    RiskSchema,
    RecommendationSchema,
    ExplanationSchema
)

def evaluate_agronomic_decision(diagnosis: DiagnosisSchema, weather: WeatherSchema) -> Dict[str, Any]:
    """
    Hybrid Agronomic Reasoning Engine.
    Merges AI plant diagnosis with real-time weather & forecast parameters to generate
    weather-aware actionable recommendations and a transparent explainability chain.
    """
    
    # 1. Handle Inconclusive / Poor Image Quality
    if diagnosis.confidence_level == "inconclusive" or diagnosis.image_quality != "good":
        risk = RiskSchema(
            level="inconclusive",
            summary="Assessment inconclusive due to image visual quality or low diagnostic confidence.",
            factors=[
                "Image focus, lighting, or distance prevents clear symptom identification.",
                "Unable to evaluate microclimate impact without verified diagnosis."
            ]
        )
        recommendation = RecommendationSchema(
            what_to_do_now=[
                "Capture a new, close-up photograph of the affected leaf in bright natural light.",
                "Ensure a single clear leaf fills the camera view with crisp focus on lesion margins.",
                "Physically inspect the underside of leaves for fungal spores or insect pests."
            ],
            what_to_avoid=[
                "Avoid applying chemical sprays based on an unconfirmed diagnosis.",
                "Avoid disturbing diseased foliage during wet morning hours."
            ],
            timing="Capture a clearer photo as soon as possible before taking treatment measures.",
            reassess="Re-evaluate plant condition once a clear image diagnosis is completed.",
            expert_help="If symptoms spread rapidly or plant wilting occurs, consult a local agricultural extension agent."
        )
        explanation = ExplanationSchema(
            leaf_evidence="Visual symptoms could not be clearly resolved from the provided image.",
            weather_context=f"Field weather is {weather.temperature}°C, {weather.humidity}% humidity.",
            reasoning="Without clear visual diagnosis, applying chemical or cultural treatments risks unnecessary expense or plant injury.",
            decision="Prioritize capturing a clearer leaf photo before proceeding with agronomic interventions."
        )
        return {
            "risk": risk,
            "recommendation": recommendation,
            "explanation": explanation
        }

    # 2. Extract Key Variables
    is_fungal = "blight" in diagnosis.possible_issue.lower() or "spot" in diagnosis.possible_issue.lower() or "rust" in diagnosis.possible_issue.lower() or "mildew" in diagnosis.possible_issue.lower() or "rot" in diagnosis.possible_issue.lower()
    is_pest = diagnosis.issue_type == "pest" or "pest" in diagnosis.possible_issue.lower() or "mite" in diagnosis.possible_issue.lower() or "aphid" in diagnosis.possible_issue.lower()
    is_healthy = diagnosis.issue_type == "healthy" or "healthy" in diagnosis.possible_issue.lower()
    
    humidity = weather.humidity
    next_rain = weather.next_rain_hours
    rain_prob = weather.rain_probability
    wind_speed = weather.wind_speed

    # 3. Determine Environmental Risk Level
    risk_factors: List[str] = []
    
    if is_healthy:
        risk_level = "low"
        risk_summary = f"Crop foliage appears healthy. Field environment ({humidity}% RH, {weather.temperature}°C) is within acceptable bounds."
        risk_factors.append("No active pathogen symptoms observed.")
    else:
        # Evaluate environmental risk factors
        if is_fungal:
            if humidity >= 80:
                risk_factors.append(f"High relative humidity ({humidity}%) provides optimal leaf wetness duration for fungal spore germination.")
            elif humidity >= 65:
                risk_factors.append(f"Moderate relative humidity ({humidity}%) supports gradual fungal spore proliferation.")
            
            if next_rain is not None and next_rain <= 6:
                risk_factors.append(f"Rainfall expected within ~{int(next_rain)} hours (probability {int(rain_prob)}%) can splash fungal spores to adjacent healthy leaves.")
            elif next_rain is not None:
                risk_factors.append(f"Rainfall anticipated within {int(next_rain)} hours will increase canopy moisture.")
        
        if wind_speed >= 20:
            risk_factors.append(f"High wind speed ({wind_speed} km/h) increases mechanical crop stress and spray drift risk.")
        
        # Risk level logic
        if diagnosis.severity == "high" or (humidity >= 80 and next_rain is not None and next_rain <= 12):
            risk_level = "high"
            risk_summary = f"ELEVATED RISK: {diagnosis.possible_issue} combined with favorable microclimate conditions ({humidity}% humidity, rain in ~{int(next_rain) if next_rain else 'N/A'}h) increases disease transmission concern."
        elif diagnosis.severity == "moderate" or humidity >= 70 or (next_rain is not None and next_rain <= 24):
            risk_level = "moderate"
            risk_summary = f"MODERATE RISK: {diagnosis.possible_issue} present. Weather conditions warrant active field management and close monitoring."
        else:
            risk_level = "low"
            risk_summary = f"LOW RISK: {diagnosis.possible_issue} detected at early severity with manageable weather parameters."

    risk = RiskSchema(
        level=risk_level,
        summary=risk_summary,
        factors=risk_factors
    )

    # 4. Generate Weather-Aware Recommendations
    do_now: List[str] = []
    to_avoid: List[str] = []
    timing_guidance = ""
    reassess_guidance = ""
    expert_guidance = ""

    if is_healthy:
        do_now = [
            "Maintain standard crop nutritional and water management routines.",
            "Continue routine scout checks twice a week, focusing on lower leaf canopy.",
            "Ensure proper crop row spacing and weed control to promote airflow."
        ]
        to_avoid = [
            "Avoid excessive nitrogen fertilization which causes overly dense canopy growth.",
            "Avoid late evening overhead irrigation that leaves foliage wet overnight."
        ]
        timing_guidance = "No emergency interventions needed under current weather forecast."
        reassess_guidance = "Re-inspect field during routine scouting in 5–7 days."
        expert_guidance = "No professional escalation required at this time."
    else:
        # Cultural actions
        do_now.append(f"Sanitation: Prune severely affected {diagnosis.crop.lower()} leaves showing clear symptoms and dispose of them away from the field.")
        do_now.append("Scouting: Inspect neighboring rows within a 5-meter radius for early lesion formation.")
        do_now.append("Airflow Management: Prune lower non-productive suckers or weeds to enhance canopy ventilation.")

        to_avoid.append("Avoid overhead splash irrigation while foliage is damp or diseased.")
        to_avoid.append("Avoid working in wet field rows to prevent mechanical vectoring of pathogens.")
        to_avoid.append("Avoid applying unverified chemical mixtures without confirming local label safety.")

        # Weather-aware Timing (CRITICAL!)
        if next_rain is not None and next_rain <= 6:
            timing_guidance = f"⚠️ RAIN ADVISORY: Rain expected within ~{int(next_rain)} hours ({int(rain_prob)}% chance). Avoid applying weather-sensitive sprays immediately before rainfall as rain will wash off foliar treatments. Wait until foliage dries after rain passes."
        elif wind_speed >= 20:
            timing_guidance = f"⚠️ WIND ADVISORY: Wind speed ({wind_speed} km/h) exceeds safe spraying thresholds. Delay foliar treatments until wind subsides below 15 km/h to prevent spray drift."
        elif humidity >= 80:
            timing_guidance = f"HIGH HUMIDITY ADVISORY: Current humidity ({humidity}%) is high. Apply protective sanitation or approved organic treatments during dry daytime windows when foliage dries rapidly."
        else:
            timing_guidance = "Current weather conditions are stable for scheduled field management activities."

        reassess_guidance = "Recheck marked monitoring plants in 24–48 hours to assess symptom progression."
        expert_guidance = "Seek guidance from your local agricultural officer if symptoms spread to >15% of plants or severity escalates rapidly."

    recommendation = RecommendationSchema(
        what_to_do_now=do_now,
        what_to_avoid=to_avoid,
        timing=timing_guidance,
        reassess=reassess_guidance,
        expert_help=expert_guidance
    )

    # 5. Build Transparent Explainability Chain
    symptoms_str = ", ".join(diagnosis.visible_symptoms) if diagnosis.visible_symptoms else "Visual foliage symptoms"
    explanation = ExplanationSchema(
        leaf_evidence=f"Observed visual symptoms: {symptoms_str}.",
        weather_context=f"Field location weather: Temp {weather.temperature}°C, Humidity {weather.humidity}%, Rain probability {weather.rain_probability}% (Next rain ~{int(next_rain) if next_rain else 'None'}h).",
        reasoning=f"AI visual model diagnosed '{diagnosis.possible_issue}' with {diagnosis.confidence_level} confidence. Microclimate analysis indicates relative humidity ({weather.humidity}%) and rainfall forecast directly affect disease propagation speed and treatment efficacy.",
        decision=f"System recommended prioritizing field sanitation and tailored weather-aware timing ({timing_guidance}) rather than immediate blind chemical spraying."
    )

    return {
        "risk": risk,
        "recommendation": recommendation,
        "explanation": explanation
    }
