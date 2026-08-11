import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  CheckCircle2,
  XCircle,
  Clock,
  Stethoscope,
  Info,
  CalendarCheck,
  Volume2,
  VolumeX,
} from 'lucide-react';
import ExplainabilityAccordion from './ExplainabilityAccordion';
import InconclusiveCard from './InconclusiveCard';
import {
  TRANSLATIONS,
  getLocalizedDiagnosis,
  getLocalizedCrop,
  getLocalizedSeverity,
  getLocalizedRiskLevel,
  getLocalizedText
} from '../utils/language';

export default function AnalysisResult({ result, onRetakePhoto, isDark, lang }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [result]);

  if (!result) return null;

  const {
    diagnosis,
    location,
    weather,
    risk,
    recommendation,
    explanation,
    is_demo_mode
  } = result;

  // Handle inconclusive diagnosis
  if (diagnosis.confidence_level === 'inconclusive' || diagnosis.image_quality !== 'good') {
    return <InconclusiveCard onRetake={onRetakePhoto} isDark={isDark} lang={lang} />;
  }

  const localizedIssue = getLocalizedDiagnosis(diagnosis.possible_issue, diagnosis.crop, lang);

  // Multilingual Text-to-Speech audio reader for farmers in selected language
  const handleToggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert('Audio reading is not supported by your browser.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      window.speechSynthesis.cancel();
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }

      // Construct localized speech text based on farmer's selected language
      let textToRead = "";
      if (lang === 'hi') {
        textToRead = `किसान भाईयों के लिए सलाह। फसल: ${diagnosis.crop}। पहचान की गई बीमारी: ${localizedIssue}। स्थिति का स्तर: ${diagnosis.severity}। मौसम चेतावनी: ${recommendation.timing || ''}। अभी करने योग्य कार्य: ${recommendation.what_to_do_now?.join('. ') || ''}। इन बातों का विशेष ध्यान रखें और बचें: ${recommendation.what_to_avoid?.join('. ') || ''}।`;
      } else if (lang === 'te') {
        textToRead = `రైతుల కోసం వ్యవసాయ సలహా. పంట: ${diagnosis.crop}. వ్యాధి లేదా సమస్య: ${localizedIssue}. తీవ్రత: ${diagnosis.severity}. వాతావరణ సమాచారం: ${recommendation.timing || ''}. వెంటనే చేయాల్సిన పనులు: ${recommendation.what_to_do_now?.join('. ') || ''}. నివారించాల్సిన విషయాలు: ${recommendation.what_to_avoid?.join('. ') || ''}.`;
      } else {
        textToRead = `Farmer Guidance for ${diagnosis.crop}. Diagnosed condition: ${localizedIssue}. Severity level is ${diagnosis.severity}. Weather advisory: ${recommendation.timing || ''}. Immediate actions to take: ${recommendation.what_to_do_now?.join('. ') || ''}. Things to avoid: ${recommendation.what_to_avoid?.join('. ') || ''}.`;
      }

      const utterance = new SpeechSynthesisUtterance(textToRead);
      const targetLang = lang === 'hi' ? 'hi-IN' : (lang === 'te' ? 'te-IN' : 'en-IN');
      utterance.lang = targetLang;
      utterance.rate = 0.92;
      utterance.pitch = 1.0;

      // Select voice matching language if available
      const voices = window.speechSynthesis.getVoices();
      const matchingVoice = voices.find(v => v.lang === targetLang || v.lang.startsWith(lang));
      if (matchingVoice) {
        utterance.voice = matchingVoice;
      }

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = (e) => {
        console.error("SpeechSynthesis error:", e);
        setIsSpeaking(false);
      };

      setTimeout(() => {
        window.speechSynthesis.speak(utterance);
        setIsSpeaking(true);
      }, 100);
    }
  };

  // Visual status indicators helpers
  const getRiskBadge = (level) => {
    const labelText = getLocalizedRiskLevel(level, lang);
    switch (level?.toLowerCase()) {
      case 'high':
        return {
          label: labelText,
          bg: isDark ? 'bg-red-950/60 border-red-500/50 text-red-300' : 'bg-red-50 border-red-300 text-red-900',
        };
      case 'moderate':
        return {
          label: labelText,
          bg: isDark ? 'bg-amber-950/60 border-amber-500/50 text-amber-300' : 'bg-amber-50 border-amber-300 text-amber-900',
        };
      case 'low':
        return {
          label: labelText,
          bg: isDark ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300' : 'bg-emerald-50 border-emerald-300 text-emerald-900',
        };
      default:
        return {
          label: labelText,
          bg: isDark ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-300 text-slate-800',
        };
    }
  };

  const riskBadge = getRiskBadge(risk.level);

  return (
    <div className="space-y-6 max-w-5xl mx-auto my-8 transition-all duration-300">
      
      {/* Demo scenario indicator */}
      {is_demo_mode && (
        <div className={`flex items-center justify-between px-4 py-2.5 rounded-xl border text-xs font-semibold ${
          isDark 
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' 
            : 'bg-emerald-50 border-emerald-300 text-emerald-900 shadow-sm'
        }`}>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span>Demonstration Scenario Mode: Active</span>
          </div>
          <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>Tomato Early Blight + Upcoming Rain</span>
        </div>
      )}

      {/* FARMER QUICK SUMMARY & AUDIO READER */}
      <div className={`rounded-2xl p-5 border-2 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all duration-300 ${
        isDark 
          ? 'bg-gradient-to-r from-emerald-950/60 to-slate-900 border-emerald-500/40' 
          : 'bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-300 shadow-emerald-900/5'
      }`}>
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="text-xl">🌾</span>
            <h3 className={`text-base font-black uppercase tracking-wide ${
              isDark ? 'text-emerald-300' : 'text-emerald-900'
            }`}>
              {t.farmerSummaryTitle}
            </h3>
          </div>
          <p className={`text-xs sm:text-sm font-semibold leading-relaxed ${
            isDark ? 'text-slate-200' : 'text-slate-800'
          }`}>
            {t.cropLabel} <strong className="text-emerald-600 dark:text-emerald-400">{getLocalizedCrop(diagnosis.crop, lang)}</strong> • {localizedIssue}
          </p>
          <p className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            {getLocalizedText(recommendation.timing, lang) || "Follow field guidelines below based on local weather."}
          </p>
        </div>

        {/* Audio Speech Button */}
        <button
          type="button"
          onClick={handleToggleSpeech}
          className={`flex items-center space-x-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 shrink-0 shadow-lg active:scale-95 border ${
            isSpeaking
              ? 'bg-red-500 hover:bg-red-600 text-white border-red-400 animate-pulse'
              : (isDark ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 border-emerald-400' : 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-500')
          }`}
          title="Listen to recommendation read out loud"
        >
          {isSpeaking ? (
            <>
              <VolumeX className="w-5 h-5" />
              <span>{t.stopReading}</span>
            </>
          ) : (
            <>
              <Volume2 className="w-5 h-5" />
              <span>{t.readAloud}</span>
            </>
          )}
        </button>
      </div>

      {/* 1. DIAGNOSIS HEADER CARD */}
      <div className={`rounded-2xl p-6 border shadow-xl relative overflow-hidden transition-all duration-300 ${
        isDark 
          ? 'glass-panel border-emerald-500/30' 
          : 'bg-white border-slate-200 shadow-slate-200/50'
      }`}>
        
        <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b ${
          isDark ? 'border-slate-800' : 'border-slate-200'
        }`}>
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className={`px-2.5 py-0.5 rounded-md text-xs font-bold uppercase tracking-wider ${
                isDark ? 'bg-emerald-500/20 text-emerald-300' : 'bg-emerald-100 text-emerald-900'
              }`}>
                {t.cropLabel} {getLocalizedCrop(diagnosis.crop, lang)}
              </span>
              <span className={`px-2.5 py-0.5 rounded-md text-xs font-bold capitalize ${
                diagnosis.severity === 'high' ? 'bg-red-500/20 text-red-700 dark:text-red-300' :
                diagnosis.severity === 'moderate' ? 'bg-amber-500/20 text-amber-800 dark:text-amber-300' :
                'bg-emerald-500/20 text-emerald-800 dark:text-emerald-300'
              }`}>
                {t.severityLabel} {getLocalizedSeverity(diagnosis.severity, lang)}
              </span>
            </div>

            <h2 className={`text-2xl sm:text-3xl font-black tracking-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              {localizedIssue}
            </h2>
          </div>

          {/* Risk Level Badge */}
          <div className={`px-4 py-2.5 rounded-xl border font-black text-sm flex items-center space-x-2 shadow-md ${riskBadge.bg}`}>
            <span>{riskBadge.label}</span>
          </div>
        </div>

        {/* Confidence note section */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`p-3.5 rounded-xl border text-xs ${
            isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex items-center justify-between mb-1">
              <span className={`font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{t.aiConfidenceLabel}</span>
              <span className={`font-extrabold uppercase px-2 py-0.5 rounded border ${
                isDark ? 'text-emerald-400 bg-emerald-950/60 border-emerald-500/30' : 'text-emerald-900 bg-emerald-100 border-emerald-300'
              }`}>
                {diagnosis.confidence_level} ({Math.round(diagnosis.confidence * 100)}%)
              </span>
            </div>
            <p className={`text-[11px] mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {t.confidenceNote}
            </p>
          </div>

          {/* Location & weather snapshot */}
          <div className={`p-3.5 rounded-xl border text-xs flex items-center justify-between ${
            isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div>
              <p className={`text-[11px] font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{t.fieldContext}</p>
              <p className={`font-bold truncate max-w-[220px] ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{location.display_name}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-sky-600 dark:text-sky-300">{weather.temperature}°C | {weather.humidity}% RH</p>
              <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{t.rainChanceLabel}: {weather.rain_probability}%</p>
            </div>
          </div>
        </div>

        {/* Visible symptoms pills */}
        {diagnosis.visible_symptoms?.length > 0 && (
          <div className={`mt-4 pt-3 border-t ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
            <span className={`text-[11px] font-bold block mb-2 uppercase tracking-wider ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>
              {t.symptomsTitle}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {diagnosis.visible_symptoms.map((symptom, i) => (
                <span key={i} className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs border ${
                  isDark ? 'bg-slate-800 text-slate-200 border-slate-700' : 'bg-slate-100 text-slate-800 border-slate-200'
                }`}>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mr-1.5 shrink-0" />
                  {getLocalizedText(symptom, lang)}
                </span>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* 2. ENVIRONMENTAL RISK IMPACT CARD */}
      <div className={`rounded-2xl p-5 border shadow-lg ${
        isDark ? 'glass-panel border-amber-500/30' : 'bg-white border-amber-200 shadow-amber-900/5'
      }`}>
        <div className="flex items-center space-x-2 mb-3">
          <ShieldAlert className="w-5 h-5 text-amber-500" />
          <h3 className={`text-base font-extrabold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
            {t.envRiskTitle}
          </h3>
        </div>
        
        <p className={`text-xs sm:text-sm font-medium leading-relaxed mb-3 ${
          isDark ? 'text-slate-200' : 'text-slate-800'
        }`}>
          {getLocalizedText(risk.summary, lang)}
        </p>

        {risk.factors?.length > 0 && (
          <div className={`space-y-1.5 pt-2 border-t ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
            {risk.factors.map((factor, idx) => (
              <div key={idx} className={`flex items-start space-x-2 text-xs ${
                isDark ? 'text-slate-300' : 'text-slate-700'
              }`}>
                <span className="text-amber-500 font-bold">•</span>
                <span>{getLocalizedText(factor, lang)}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 3. WEATHER-AWARE ACTION PLAN */}
      <div className="space-y-4">
        <h3 className={`text-lg font-black flex items-center space-x-2 ${
          isDark ? 'text-slate-100' : 'text-slate-900'
        }`}>
          <span>{t.actionPlanTitle}</span>
        </h3>

        {/* Action Timing Card */}
        {recommendation.timing && (
          <div className={`rounded-2xl p-5 border-2 shadow-xl ${
            isDark 
              ? 'glass-panel border-sky-500/40 bg-sky-950/20' 
              : 'bg-sky-50/90 border-sky-300 text-sky-950 shadow-sky-900/5'
          }`}>
            <div className="flex items-center space-x-2 mb-2">
              <Clock className="w-5 h-5 text-sky-500" />
              <h4 className={`text-sm font-extrabold uppercase tracking-wide ${
                isDark ? 'text-sky-200' : 'text-sky-900'
              }`}>
                {t.timingTitle}
              </h4>
            </div>
            <p className={`text-xs sm:text-sm leading-relaxed font-medium ${
              isDark ? 'text-sky-100' : 'text-sky-900'
            }`}>
              {getLocalizedText(recommendation.timing, lang)}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* What to do now */}
          <div className={`rounded-2xl p-5 border ${
            isDark ? 'glass-panel border-emerald-500/30' : 'bg-white border-emerald-200 shadow-sm'
          }`}>
            <div className="flex items-center space-x-2 mb-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <h4 className={`text-sm font-bold uppercase tracking-wide ${
                isDark ? 'text-emerald-300' : 'text-emerald-800'
              }`}>
                {t.doNowTitle}
              </h4>
            </div>
            <ul className={`space-y-2 text-xs ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
              {recommendation.what_to_do_now?.map((item, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold shrink-0 text-[10px] mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed font-medium">{getLocalizedText(item, lang)}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* What to avoid */}
          <div className={`rounded-2xl p-5 border ${
            isDark ? 'glass-panel border-red-500/30' : 'bg-white border-red-200 shadow-sm'
          }`}>
            <div className="flex items-center space-x-2 mb-3">
              <XCircle className="w-5 h-5 text-red-500" />
              <h4 className={`text-sm font-bold uppercase tracking-wide ${
                isDark ? 'text-red-300' : 'text-red-800'
              }`}>
                {t.avoidTitle}
              </h4>
            </div>
            <ul className={`space-y-2 text-xs ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
              {recommendation.what_to_avoid?.map((item, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="text-red-500 font-bold text-base leading-none">✕</span>
                  <span className="leading-relaxed font-medium">{getLocalizedText(item, lang)}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Reassess & Expert Help Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <div className={`rounded-xl p-4 border flex items-start space-x-3 ${
            isDark ? 'glass-panel border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <CalendarCheck className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
            <div>
              <h5 className={`text-xs font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{t.reassessTitle}</h5>
              <p className={`text-xs mt-1 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{getLocalizedText(recommendation.reassess, lang)}</p>
            </div>
          </div>

          <div className={`rounded-xl p-4 border flex items-start space-x-3 ${
            isDark ? 'glass-panel border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <Stethoscope className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <h5 className={`text-xs font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{t.expertTitle}</h5>
              <p className={`text-xs mt-1 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{getLocalizedText(recommendation.expert_help, lang)}</p>
            </div>
          </div>

        </div>

      </div>

      {/* 4. EXPLAINABILITY ACCORDION */}
      <ExplainabilityAccordion explanation={explanation} isDark={isDark} lang={lang} />

      {/* 5. AGRONOMIC SAFETY DISCLAIMER */}
      <div className={`rounded-xl p-4 border text-center ${
        isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50 border-slate-200'
      }`}>
        <div className={`flex items-center justify-center space-x-1.5 text-xs font-bold mb-1 ${
          isDark ? 'text-slate-400' : 'text-slate-600'
        }`}>
          <Info className="w-4 h-4 text-emerald-500" />
          <span>{t.disclaimerTitle}</span>
        </div>
        <p className={`text-[11px] max-w-3xl mx-auto leading-relaxed ${
          isDark ? 'text-slate-400' : 'text-slate-500'
        }`}>
          {t.disclaimer}
        </p>
      </div>

    </div>
  );
}
