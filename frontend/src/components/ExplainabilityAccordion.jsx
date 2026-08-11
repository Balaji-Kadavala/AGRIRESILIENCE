import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Brain, FileText, CloudRain, CheckCircle } from 'lucide-react';
import { TRANSLATIONS, getLocalizedText } from '../utils/language';

export default function ExplainabilityAccordion({ explanation, isDark, lang }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const [isOpen, setIsOpen] = useState(false);

  if (!explanation) return null;

  const { leaf_evidence, weather_context, reasoning, decision } = explanation;

  return (
    <div className={`rounded-2xl border overflow-hidden shadow-lg mb-6 transition-all duration-300 ${
      isDark 
        ? 'glass-panel border-teal-500/30' 
        : 'bg-white border-slate-200 shadow-slate-200/50'
    }`}>
      
      {/* Accordion Toggle Header */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full p-4 sm:p-5 flex items-center justify-between text-left transition-colors ${
          isDark 
            ? 'bg-slate-900/80 hover:bg-slate-800/80' 
            : 'bg-slate-50 hover:bg-slate-100'
        }`}
      >
        <div className="flex items-center space-x-3">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold ${
            isDark ? 'bg-teal-500/20 text-teal-400' : 'bg-teal-100 text-teal-800'
          }`}>
            🧠
          </div>
          <div>
            <h3 className={`text-base font-extrabold flex items-center space-x-2 ${
              isDark ? 'text-slate-100' : 'text-slate-900'
            }`}>
              <span>{t.whyTitle}</span>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${
                isDark ? 'bg-teal-500/10 text-teal-300 border-teal-500/30' : 'bg-teal-50 text-teal-800 border-teal-200'
              }`}>
                {t.reasoningChainTitle}
              </span>
            </h3>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {t.whySub}
            </p>
          </div>
        </div>

        <div className={`p-2 rounded-lg ${isDark ? 'bg-slate-800 text-slate-300' : 'bg-white text-slate-600 border border-slate-200'}`}>
          {isOpen ? <ChevronUp className="w-5 h-5 text-teal-500" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
        </div>
      </button>

      {/* Accordion Content */}
      {isOpen && (
        <div className={`p-5 border-t space-y-4 ${
          isDark ? 'border-slate-800 bg-slate-950/60' : 'border-slate-200 bg-white'
        }`}>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* 1. Leaf Evidence */}
            <div className={`p-3.5 rounded-xl border flex items-start space-x-3 ${
              isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500 shrink-0 mt-0.5">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <p className={`text-xs font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{t.evidenceTitle}</p>
                <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {getLocalizedText(leaf_evidence, lang)}
                </p>
              </div>
            </div>

            {/* 2. Weather Context */}
            <div className={`p-3.5 rounded-xl border flex items-start space-x-3 ${
              isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="p-2 rounded-lg bg-sky-500/10 text-sky-500 shrink-0 mt-0.5">
                <CloudRain className="w-4 h-4" />
              </div>
              <div>
                <p className={`text-xs font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{t.weatherContextTitle}</p>
                <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {getLocalizedText(weather_context, lang)}
                </p>
              </div>
            </div>

          </div>

          {/* 3. Integrated Agronomic Reasoning */}
          <div className={`p-3.5 rounded-xl border flex items-start space-x-3 ${
            isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="p-2 rounded-lg bg-teal-500/10 text-teal-500 shrink-0 mt-0.5">
              <Brain className="w-4 h-4" />
            </div>
            <div>
              <p className={`text-xs font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{t.diagnosticReasoningTitle}</p>
              <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {getLocalizedText(reasoning, lang)}
              </p>
            </div>
          </div>

          {/* 4. Final Decision Rationale */}
          <div className={`p-3.5 rounded-xl border flex items-start space-x-3 ${
            isDark 
              ? 'bg-gradient-to-r from-emerald-950/40 to-slate-900 border-emerald-500/30' 
              : 'bg-emerald-50 border-emerald-300'
          }`}>
            <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-600 shrink-0 mt-0.5">
              <CheckCircle className="w-4 h-4" />
            </div>
            <div>
              <p className={`text-xs font-bold ${isDark ? 'text-emerald-300' : 'text-emerald-900'}`}>{t.synthesisTitle}</p>
              <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                {getLocalizedText(decision, lang)}
              </p>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}

