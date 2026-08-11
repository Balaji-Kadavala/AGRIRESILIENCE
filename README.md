# AGRIRESILIENCE AI 🌱
> **AI-Powered Real-Time Agricultural Decision Support**

AGRIRESILIENCE AI is a full-stack, real-time decision-support web application for modern resilient agriculture. Unlike traditional plant disease detectors that merely convert a leaf image into a disease label, AGRIRESILIENCE AI fuses **multimodal vision pathology** with **live microclimate weather intelligence** from Open-Meteo and **browser geolocation** to generate **weather-aware action plans**.

---

## 1. Problem Statement

Traditional agricultural apps provide static plant disease classification (`Leaf Photo → Disease Name`). However, in real field conditions, a disease diagnosis alone is insufficient for a farmer. Applying foliar sprays right before unexpected rainfall washes away chemical treatments, wastes money, and risks runoff. 

Farmers require an intelligent assistant that answers:
1. *What is wrong with my crop?*
2. *How serious is it?*
3. *What should I do now?*
4. *Is it safe and effective to act given upcoming local weather?*
5. *What should I avoid doing?*
6. *When should I reassess?*

---

## 2. Core Differentiator & Value Proposition

AGRIRESILIENCE AI converts raw field inputs into a weather-aware decision pipeline:

```
Raw Field Input (Leaf Photo + Farm GPS + Live Microclimate)
       ↓
Multimodal AI Disease Analysis (Pathology & Confidence Assessment)
       ↓
Open-Meteo Weather Intelligence (Temp, Humidity, Rain Window, Wind)
       ↓
Hybrid Agronomic Reasoning Engine (Disease Risk + Microclimate Impact)
       ↓
Weather-Aware Action Plan (What to do now, Timing advisories, What to avoid)
```

---

## 3. Technology Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide React icons, Axios.
- **Backend**: Python 3.10+, FastAPI, Pydantic v2, Uvicorn, httpx.
- **AI Engine**: Multimodal OpenAI API (`gpt-4o-mini` / vision) isolated behind backend service with local heuristic fallback.
- **Weather API**: Open-Meteo API (Free, no API key required).
- **Location & Geocoding**: HTML5 Geolocation API + OpenStreetMap Nominatim reverse geocoding.

---

## 4. Architecture & Data Flow

```
agriresilience-ai/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── ImageUpload.jsx
│   │   │   ├── LocationCard.jsx
│   │   │   ├── WeatherCard.jsx
│   │   │   ├── AnalysisProgress.jsx
│   │   │   ├── AnalysisResult.jsx
│   │   │   ├── InconclusiveCard.jsx
│   │   │   └── ExplainabilityAccordion.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── package.json
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── routes/api.py
│   │   ├── services/
│   │   │   ├── ai_service.py
│   │   │   ├── weather_service.py
│   │   │   ├── location_service.py
│   │   │   └── agronomy_engine.py
│   │   ├── schemas/analysis.py
│   │   └── config.py
│   └── requirements.txt
└── README.md
```

---

## 5. API Endpoints

- `GET /api/health`: Health check endpoint.
- `GET /api/weather?latitude={lat}&longitude={lon}`: Live Open-Meteo weather report & 24h hourly forecast.
- `POST /api/analyze`: Multipart form upload (`image`, `latitude`, `longitude`) returning full diagnosis, weather risk, and weather-aware action plan.
- `GET /api/demo-scenario`: Pre-populated Tomato Early Blight scenario with 4-hour rain advisory for instant live hackathon demonstration.

---

## 6. Environment Variables

Create `backend/.env` using `backend/.env.example`:

```env
# Optional: If provided, uses OpenAI vision models. If omitted, uses intelligent fallback demo engine.
OPENAI_API_KEY=your_openai_api_key_here
PORT=8000
HOST=0.0.0.0
```

---

## 7. How to Run Locally

### Backend Setup
```bash
cd backend
python -m venv venv
# On Windows:
.\venv\Scripts\activate
# Install dependencies:
pip install -r requirements.txt
# Run FastAPI server:
uvicorn app.main:app --reload --port 8000
```
Backend will run at: `http://localhost:8000` (Swagger docs at `http://localhost:8000/docs`).

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend will run at: `http://localhost:5173`.

---

## 8. Hackathon 2-Minute Live Demo Flow

1. **Step 1 (0:00 - 0:20)**: Open `http://localhost:5173`. Highlight the tagline and 6-step integrated decision pipeline banner.
2. **Step 2 (0:20 - 0:45)**: Click **"Try Demo Scenario"** or upload the sample Tomato leaf photo. Show how farm coordinates (`16.53°N, 80.58°E`) fetch live field weather parameters (Temp 29°C, Humidity 82%, Rain expected in ~4 hours).
3. **Step 3 (0:45 - 1:15)**: Click **"🌱 Analyze My Crop"**. Observe the multi-stage progress screen tracking leaf parsing, weather retrieval, and agronomic reasoning.
4. **Step 4 (1:15 - 1:45)**: Review the **Weather-Aware Action Plan**. Point out the critical Rain Advisory: *"Rain expected within ~4 hours. Avoid applying contact fungicides immediately before rainfall as rain will wash off foliar sprays."*
5. **Step 5 (1:45 - 2:00)**: Expand **"🧠 Why did we recommend this?"** to demonstrate transparent step-by-step AI + microclimate explainability to the judges.

---

## 9. Safety & Agronomic Disclaimer

AGRIRESILIENCE AI is a decision-support prototype. It does not issue scientifically calibrated lab diagnoses or unverified pesticide doses. Always consult certified local agricultural extension officers before taking major treatment actions.
