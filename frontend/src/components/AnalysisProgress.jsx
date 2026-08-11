import React, { useEffect, useState } from 'react';
import { CheckCircle2, Loader2, BrainCircuit } from 'lucide-react';
import { TRANSLATIONS } from '../utils/language';

export default function AnalysisProgress({ currentStep = 0, isDark, lang }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const [activeStep, setActiveStep] = useState(0);

  const STEPS = [
    t.step1Title + " " + t.photoLoaded,
    t.step2Title + " " + t.locationTitle,
    t.step3Title + " " + t.weatherTitle,
    t.step4Title + " " + t.analyzingTitle,
    t.step5Title + " " + t.envRiskTitle,
    t.step6Title + " " + t.actionPlanTitle
  ];

  useEffect(() => {
    setActiveStep(currentStep);
  }, [currentStep]);

  const progressPercent = Math.min(100, Math.round(((activeStep + 1) / STEPS.length) * 100));

  return (
    <div className={`rounded-2xl p-6 sm:p-8 border shadow-2xl max-w-xl mx-auto my-8 text-center relative overflow-hidden transition-all duration-300 ${
      isDark 
        ? 'glass-panel border-emerald-500/30' 
        : 'bg-white border-slate-200 shadow-slate-200'
    }`}>
      {/* Glow */}
      <div className={`absolute inset-0 bg-gradient-to-b pointer-events-none ${
        isDark ? 'from-emerald-500/5 to-transparent' : 'from-emerald-50 to-transparent'
      }`} />

      <div className="relative z-10">
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 border ${
          isDark 
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
            : 'bg-emerald-50 border-emerald-200 text-emerald-600'
        }`}>
          <BrainCircuit className="w-8 h-8 animate-pulse text-emerald-500" />
        </div>

        <h3 className={`text-xl font-black mb-1 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
          {t.analyzingTitle}
        </h3>
        <p className={`text-xs mb-6 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          {t.analyzingSub}
        </p>

        {/* Progress Bar */}
        <div className={`w-full rounded-full h-2.5 mb-6 overflow-hidden border ${
          isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-200 border-slate-300'
        }`}>
          <div
            className="bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 h-full rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Steps List */}
        <div className="space-y-3 text-left max-w-md mx-auto">
          {STEPS.map((stepText, idx) => {
            const isDone = idx < activeStep;
            const isCurrent = idx === activeStep;
            return (
              <div
                key={idx}
                className={`flex items-center space-x-3 p-2.5 rounded-xl border text-xs transition-all ${
                  isDone
                    ? (isDark ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300' : 'bg-emerald-50 border-emerald-200 text-emerald-900')
                    : isCurrent
                    ? (isDark ? 'bg-slate-800/90 border-emerald-500/50 text-slate-100 font-semibold shadow' : 'bg-white border-emerald-500 text-slate-900 font-bold shadow-md')
                    : (isDark ? 'bg-slate-950/20 border-slate-800/40 text-slate-500' : 'bg-slate-50 border-slate-200 text-slate-400')
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                ) : isCurrent ? (
                  <Loader2 className="w-4 h-4 text-emerald-500 animate-spin shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-slate-300 dark:border-slate-700 shrink-0" />
                )}
                <span>{stepText}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
