import React from 'react';
import { Globe, Sprout, ArrowRight, Check } from 'lucide-react';
import { LANGUAGES } from '../utils/language';

export default function LanguageModal({ isOpen, selectedLang, onSelectLang, onConfirm, isDark }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      
      <div className={`w-full max-w-lg rounded-3xl p-6 sm:p-8 border shadow-2xl transition-all ${
        isDark 
          ? 'glass-panel border-emerald-500/40 bg-slate-900/95 text-slate-100' 
          : 'bg-white border-emerald-200 text-slate-900 shadow-slate-900/20'
      }`}>
        
        {/* Header Icon */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-600/30">
          <Sprout className="w-9 h-9 text-white stroke-[2.5]" />
        </div>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-black tracking-tight mb-1">
            Welcome to AgriResilience AI 🌱
          </h2>
          <p className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Please choose your preferred language to continue
          </p>
          <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
            कृपया भाषा चुनें / దయచేసి భాషను ఎంచుకోండి
          </p>
        </div>

        {/* Language Selection Grid */}
        <div className="space-y-3 mb-6">
          {LANGUAGES.map((lang) => {
            const isSelected = selectedLang === lang.code;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => onSelectLang(lang.code)}
                className={`w-full p-4 rounded-2xl border-2 flex items-center justify-between text-left transition-all duration-200 ${
                  isSelected
                    ? (isDark
                        ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-lg shadow-emerald-950'
                        : 'bg-emerald-50 border-emerald-600 text-emerald-950 shadow-md')
                    : (isDark
                        ? 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-700/80'
                        : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100')
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">{lang.flag}</span>
                  <div>
                    <p className="text-base font-extrabold">{lang.label}</p>
                    <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      {lang.sub}
                    </p>
                  </div>
                </div>

                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-500 text-white'
                    : 'border-slate-400'
                }`}>
                  {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Confirm Action Button */}
        <button
          type="button"
          onClick={onConfirm}
          className="w-full min-h-[52px] py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 via-green-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-base tracking-wide transition-all duration-200 shadow-xl shadow-emerald-700/30 flex items-center justify-center space-x-2"
        >
          <span>Continue / आगे बढ़ें / కొనసాగించండి</span>
          <ArrowRight className="w-5 h-5 stroke-[2.5]" />
        </button>

      </div>

    </div>
  );
}
