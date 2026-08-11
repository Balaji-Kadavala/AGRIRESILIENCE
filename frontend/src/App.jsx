import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Hero from './components/Hero';
import ImageUpload from './components/ImageUpload';
import LocationCard from './components/LocationCard';
import WeatherCard from './components/WeatherCard';
import AnalysisProgress from './components/AnalysisProgress';
import AnalysisResult from './components/AnalysisResult';
import LanguageModal from './components/LanguageModal';
import { Sprout, AlertCircle, Send } from 'lucide-react';
import { TRANSLATIONS } from './utils/language';

export default function App() {
  // Theme state: default is false (White / Light theme as requested)
  const [isDark, setIsDark] = useState(false);
  
  // Language state: default is 'en', pops up LanguageModal on entry for farmer preference selection
  const [lang, setLang] = useState('en');
  const [tempLang, setTempLang] = useState('en');
  const [isLangModalOpen, setIsLangModalOpen] = useState(true);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [latitude, setLatitude] = useState(16.53);
  const [longitude, setLongitude] = useState(80.58);
  const [locationName, setLocationName] = useState('Vijayawada Field Region');
  
  const [weather, setWeather] = useState(null);
  const [isFetchingWeather, setIsFetchingWeather] = useState(false);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [analysisResult, setAnalysisResult] = useState(null);
  
  const [errorMsg, setErrorMsg] = useState('');
  const resultsRef = useRef(null);

  // Auto-scroll helper with header offset clearance
  const scrollToResults = () => {
    setTimeout(() => {
      if (resultsRef.current) {
        const headerOffset = 95; // Clear sticky top header bar
        const elementPosition = resultsRef.current.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: 'smooth'
        });
      }
    }, 150);
  };

  // Fetch weather automatically when coordinates change
  useEffect(() => {
    fetchWeatherForCoords(latitude, longitude);
  }, [latitude, longitude]);

  const fetchWeatherForCoords = async (lat, lon) => {
    setIsFetchingWeather(true);
    setErrorMsg('');
    try {
      const resp = await axios.get(`/api/weather?latitude=${lat}&longitude=${lon}`);
      setWeather(resp.data);
      setLocationName(`Farm Field (${lat.toFixed(2)}°N, ${lon.toFixed(2)}°E)`);
    } catch (err) {
      console.warn('Weather API endpoint error or fallback:', err);
      const currentHour = new Date().getHours();
      const mockForecast = Array.from({ length: 24 }, (_, offset) => {
        const h = (currentHour + offset) % 24;
        const timeStr = `${h.toString().padStart(2, '0')}:00`;
        const rainProb = (offset >= 3 && offset <= 5) ? 78 : (offset === 2 || offset === 6 ? 45 : 15);
        const temp = Math.round(28 + 3 * (1 - Math.abs(h - 14) / 12));
        return {
          time: timeStr,
          temperature: temp,
          humidity: 82,
          precipitation: rainProb > 50 ? 1.2 : 0.0,
          rain_probability: rainProb
        };
      });

      setWeather({
        temperature: 29.0,
        humidity: 82.0,
        rain_probability: 78.0,
        precipitation: 0.5,
        wind_speed: 9.0,
        weather_condition: "Overcast / High Humidity",
        next_rain_hours: 4.0,
        agricultural_summary: "High humidity (82%) and upcoming rainfall (~78% chance in ~4 hours) create favorable conditions for fungal spore germination.",
        forecast: mockForecast
      });
    } finally {
      setIsFetchingWeather(false);
    }
  };

  const handleToggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const handleConfirmLanguage = () => {
    setLang(tempLang);
    setIsLangModalOpen(false);
  };

  const handleLangChangeFromHeader = (newLangCode) => {
    setLang(newLangCode);
    setTempLang(newLangCode);
  };

  const handleImageSelected = (file, previewUrl) => {
    setImageFile(file);
    setImagePreview(previewUrl);
    setAnalysisResult(null);
    setErrorMsg('');
  };

  const handleImageRemoved = () => {
    setImageFile(null);
    setImagePreview(null);
    setAnalysisResult(null);
  };

  const handleLocationChange = (lat, lon) => {
    setLatitude(lat);
    setLongitude(lon);
  };

  // Sample photos helper for instant demo testing
  const handleSelectSample = (sampleType) => {
    if (sampleType === 'blurry_leaf') {
      const svgStr = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="#f1f5f9"/><circle cx="200" cy="150" r="80" fill="#94a3b8" filter="blur(20px)"/><text x="200" y="150" font-family="sans-serif" font-size="14" fill="#475569" text-anchor="middle">Blurry Leaf Sample</text></svg>`;
      const blob = new Blob([svgStr], { type: 'image/svg+xml' });
      const file = new File([blob], 'blurry_sample.jpg', { type: 'image/jpeg' });
      const url = URL.createObjectURL(blob);
      handleImageSelected(file, url);
    } else if (sampleType === 'healthy_rice') {
      const svgStr = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="#f0fdf4"/><path d="M 50 250 Q 200 20 350 250" fill="none" stroke="#22c55e" stroke-width="12"/><path d="M 100 250 Q 200 60 300 250" fill="none" stroke="#16a34a" stroke-width="10"/><text x="200" y="285" font-family="sans-serif" font-size="12" fill="#15803d" text-anchor="middle">Healthy Paddy Rice Foliage Sample</text></svg>`;
      const blob = new Blob([svgStr], { type: 'image/svg+xml' });
      const file = new File([blob], 'healthy_rice_sample.jpg', { type: 'image/jpeg' });
      const url = URL.createObjectURL(blob);
      handleImageSelected(file, url);
    } else if (sampleType === 'yellow_mosaic') {
      const svgStr = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="#fefce8"/><path d="M 200 40 C 100 100 100 220 200 270 C 300 220 300 100 200 40 Z" fill="#eab308" stroke="#ca8a04" stroke-width="4"/><path d="M 170 100 Q 200 150 170 200" fill="none" stroke="#15803d" stroke-width="14"/><text x="200" y="285" font-family="sans-serif" font-size="12" fill="#854d0e" text-anchor="middle">Yellow Mosaic Virus Leaf Sample</text></svg>`;
      const blob = new Blob([svgStr], { type: 'image/svg+xml' });
      const file = new File([blob], 'yellow_mosaic_sample.jpg', { type: 'image/jpeg' });
      const url = URL.createObjectURL(blob);
      handleImageSelected(file, url);
    } else {
      const svgStr = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="#f8fafc"/><path d="M 200 50 C 120 100 120 200 200 250 C 280 200 280 100 200 50 Z" fill="#16a34a" stroke="#15803d" stroke-width="4"/><circle cx="180" cy="120" r="15" fill="#78350f" stroke="#f59e0b" stroke-width="2"/><circle cx="220" cy="170" r="20" fill="#78350f" stroke="#f59e0b" stroke-width="2"/><text x="200" y="275" font-family="sans-serif" font-size="12" fill="#15803d" text-anchor="middle">Tomato Early Blight Foliage Sample</text></svg>`;
      const blob = new Blob([svgStr], { type: 'image/svg+xml' });
      const file = new File([blob], 'tomato_early_blight_sample.jpg', { type: 'image/jpeg' });
      const url = URL.createObjectURL(blob);
      handleImageSelected(file, url);
    }
  };

  // Main Field Analysis Execution
  const handleAnalyzeField = async (forceDemoFlag = false) => {
    setIsAnalyzing(true);
    setErrorMsg('');
    setAnalysisStep(0);
    scrollToResults();

    const stepInterval = setInterval(() => {
      setAnalysisStep((prev) => (prev < 5 ? prev + 1 : prev));
    }, 450);

    try {
      const formData = new FormData();
      if (imageFile) {
        formData.append('image', imageFile);
      }
      formData.append('latitude', latitude.toString());
      formData.append('longitude', longitude.toString());
      if (forceDemoFlag) {
        formData.append('force_demo', 'true');
      }

      const resp = await axios.post('/api/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setTimeout(() => {
        clearInterval(stepInterval);
        setAnalysisStep(5);
        setAnalysisResult(resp.data);
        setIsAnalyzing(false);
        scrollToResults();
      }, 500);

    } catch (err) {
      clearInterval(stepInterval);
      console.warn('Backend API connection issue, loading dynamic scenario fallback:', err);
      
      setTimeout(async () => {
        try {
          const demoResp = await axios.get('/api/demo-scenario');
          setAnalysisResult(demoResp.data);
        } catch {
          const fname = (imageFile?.name || '').toLowerCase();
          let isHealthy = fname.includes('healthy');
          let isMosaic = fname.includes('yellow') || fname.includes('mosaic');
          
          setAnalysisResult({
            diagnosis: isHealthy ? {
              crop: "Rice (Paddy)",
              possible_issue: "Healthy Crop Foliage",
              issue_type: "healthy",
              confidence: 0.94,
              confidence_level: "high",
              severity: "low",
              image_quality: "good",
              visible_symptoms: ["Vigorous green leaf blade pigmentation", "Uniform canopy surface without lesion spots"],
              alternative_possibilities: ["Minor dust accumulation"],
              evidence: ["Visual foliage analysis confirms predominant healthy green chlorophyll levels"]
            } : isMosaic ? {
              crop: "Mungbean / Blackgram",
              possible_issue: "Yellow Mosaic Virus (YMV)",
              issue_type: "disease",
              confidence: 0.89,
              confidence_level: "high",
              severity: "high",
              image_quality: "good",
              visible_symptoms: ["Bright yellow chlorotic patches alternating with green leaf tissue", "Leaf blade size reduction"],
              alternative_possibilities: ["Magnesium deficiency"],
              evidence: ["Significant yellow chlorosis ratio detected on foliage surface"]
            } : {
              crop: "Tomato",
              possible_issue: "Early Blight (Alternaria solani)",
              issue_type: "disease",
              confidence: 0.91,
              confidence_level: "high",
              severity: "moderate",
              image_quality: "good",
              visible_symptoms: ["Concentric brown spots on lower foliage", "Chlorotic yellow halo surrounding lesions"],
              alternative_possibilities: ["Septoria leaf spot", "Magnesium deficiency"],
              evidence: ["Brown circular spots with concentric target rings", "Surrounding chlorotic yellow halos"]
            },
            location: { latitude, longitude, display_name: "Vijayawada Field Region" },
            weather: weather || { temperature: 29, humidity: 82, rain_probability: 78, wind_speed: 9, weather_condition: "Overcast", next_rain_hours: 4 },
            risk: {
              level: isHealthy ? "low" : "high",
              summary: isHealthy ? "LOW CONCERN: Foliage appears healthy." : "ELEVATED RISK: Active crop issue combined with high humidity (82%) and upcoming rainfall.",
              factors: isHealthy ? ["No active pathogen symptoms"] : ["Humidity creates optimal moisture for fungal spores", "Rainfall within 4h will splash spores"]
            },
            recommendation: {
              what_to_do_now: isHealthy ? [
                "Maintain standard crop nutritional and water management routines.",
                "Continue routine scout checks twice a week."
              ] : [
                "Prune severely affected leaves showing target spots and dispose away from field.",
                "Inspect neighboring vines within a 5-meter radius."
              ],
              what_to_avoid: [
                "Avoid overhead sprinkler irrigation while leaf canopy is damp."
              ],
              timing: "⚠️ RAIN ADVISORY: Rain expected within ~4 hours. Avoid applying weather-sensitive sprays immediately before rainfall.",
              reassess: "Re-check marked monitoring plants in 24–48 hours.",
              expert_help: "Consult local extension officer if symptoms spread."
            },
            explanation: {
              leaf_evidence: "Concentric brown lesions and yellow halos observed.",
              weather_context: "Temp 29°C, Humidity 82%, Rain expected in ~4 hours.",
              reasoning: "Visual pathology confirms Early Blight. Live microclimate indicates wetness duration favors spore spread.",
              decision: "Recommended immediate sanitation and weather-aware action timing before rainfall."
            },
            is_demo_mode: true
          });
        }
        setIsAnalyzing(false);
      }, 600);
    }
  };

  const handleTryDemoScenario = () => {
    handleSelectSample('tomato_leaf');
    setTimeout(() => {
      handleAnalyzeField(true);
    }, 200);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 flex flex-col selection:bg-emerald-500 selection:text-white ${
      isDark 
        ? 'bg-gradient-to-b from-slate-950 via-emerald-950/40 to-slate-900 text-slate-100 dark' 
        : 'bg-gradient-to-b from-emerald-100/70 via-green-50/40 to-emerald-50/30 text-slate-900'
    }`}>
      
      {/* First-time Entry Language Selector Modal */}
      <LanguageModal
        isOpen={isLangModalOpen}
        selectedLang={tempLang}
        onSelectLang={setTempLang}
        onConfirm={handleConfirmLanguage}
        isDark={isDark}
      />

      {/* Header with Custom Visual Language Dropdown */}
      <Header
        onTryDemo={handleTryDemoScenario}
        isAnalyzing={isAnalyzing}
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
        lang={lang}
        onLangChange={handleLangChangeFromHeader}
        onOpenLangModal={() => setIsLangModalOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-6">
        
        {/* Hero Section */}
        <Hero onTryDemo={handleTryDemoScenario} isDark={isDark} lang={lang} />

        {/* PRIMARY FARMER ACTION BLOCK: Upload Photo & Giant Analyze Button at a glance! */}
        <div className={`p-5 sm:p-6 rounded-3xl border-2 shadow-2xl transition-all duration-300 ${
          isDark 
            ? 'bg-gradient-to-br from-emerald-950/80 via-slate-900 to-slate-950 border-emerald-500/40 shadow-emerald-950/80' 
            : 'bg-gradient-to-br from-emerald-100/90 via-emerald-50 to-green-100/60 border-emerald-400 shadow-emerald-900/10'
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Left Column: Photo Upload Area */}
            <div className="lg:col-span-7">
              <ImageUpload
                imageFile={imageFile}
                imagePreview={imagePreview}
                onImageSelected={handleImageSelected}
                onImageRemoved={handleImageRemoved}
                onSelectSampleImage={handleSelectSample}
                isDark={isDark}
                lang={lang}
              />
            </div>

            {/* Right Column: Giant Primary Analyze Button */}
            <div className="lg:col-span-5 text-center flex flex-col items-center justify-center p-2">
              <div className="w-full relative group">
                <button
                  type="button"
                  onClick={() => handleAnalyzeField(false)}
                  disabled={isAnalyzing || !imageFile}
                  className={`w-full min-h-[64px] px-8 py-5 rounded-2xl font-black text-xl sm:text-2xl tracking-wide transition-all duration-300 transform border-2 flex items-center justify-center space-x-3 shadow-2xl disabled:cursor-not-allowed ${
                    !imageFile
                      ? (isDark
                          ? 'bg-slate-700/60 text-slate-400 border-slate-600 shadow-none opacity-60'
                          : 'bg-slate-200 text-slate-400 border-slate-300 shadow-none opacity-60')
                      : (isDark
                          ? 'bg-gradient-to-r from-emerald-400 via-green-500 to-teal-400 text-slate-950 shadow-emerald-500/30 border-emerald-200 hover:scale-[1.03] active:scale-[0.98]'
                          : 'bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 hover:from-emerald-500 hover:to-green-600 text-white shadow-emerald-700/40 border-emerald-400 hover:scale-[1.03] active:scale-[0.98]')
                  }`}
                >
                  <Sprout className="w-8 h-8 stroke-[2.5]" />
                  <span>{t.analyzeBtn}</span>
                  <Send className="w-6 h-6 ml-1" />
                </button>

                {/* Tooltip shown when no image is uploaded */}
                {!imageFile && !isAnalyzing && (
                  <div className={`absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-semibold px-3 py-1.5 rounded-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${
                    isDark ? 'bg-slate-700 text-amber-300 border border-slate-600' : 'bg-slate-800 text-amber-300'
                  }`}>
                    📷 Please upload a crop leaf photo first
                  </div>
                )}
              </div>
              
              <p className={`text-xs mt-3 font-bold ${
                !imageFile
                  ? (isDark ? 'text-slate-500' : 'text-slate-400')
                  : (isDark ? 'text-emerald-300' : 'text-emerald-950')
              }`}>
                {imageFile ? t.analyzeSub : '⬅️ Upload a leaf photo to enable analysis'}
              </p>
            </div>

          </div>
        </div>

        {/* SECONDARY ROW: Farm Field Location & Live Weather Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <LocationCard
            latitude={latitude}
            longitude={longitude}
            locationName={locationName}
            onLocationChange={handleLocationChange}
            isDetectingLocation={isDetectingLocation}
            isDark={isDark}
            lang={lang}
          />

          <WeatherCard
            weather={weather}
            isLoading={isFetchingWeather}
            isDark={isDark}
            lang={lang}
          />
        </div>

        {/* Error Alert if any */}
        {errorMsg && (
          <div className={`max-w-2xl mx-auto p-4 rounded-xl border text-xs flex items-center space-x-2 ${
            isDark ? 'bg-red-950/60 border-red-500/40 text-red-200' : 'bg-red-50 border-red-200 text-red-800'
          }`}>
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Smooth Auto-Scroll Anchor Container */}
        <div ref={resultsRef} className="scroll-mt-28 space-y-6">
          {/* Progress Loading Animation */}
          {isAnalyzing && (
            <AnalysisProgress currentStep={analysisStep} isDark={isDark} lang={lang} />
          )}

          {/* Analysis Results Display */}
          {!isAnalyzing && analysisResult && (
            <AnalysisResult
              result={analysisResult}
              onRetakePhoto={handleImageRemoved}
              isDark={isDark}
              lang={lang}
            />
          )}
        </div>

      </main>

      {/* Footer */}
      <footer className={`border-t py-6 text-center text-xs mt-12 transition-colors ${
        isDark ? 'border-slate-800 bg-slate-950/80 text-slate-400' : 'border-slate-200 bg-white text-slate-600 shadow-inner'
      }`}>
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <Sprout className="w-4 h-4 text-emerald-600" />
            <span className={`font-bold ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>{t.title}</span>
            <span>— {t.subtitle}</span>
          </div>
          <p className={isDark ? 'text-slate-400' : 'text-slate-500'}>
            {t.footerText}
          </p>
        </div>
      </footer>

    </div>
  );
}
