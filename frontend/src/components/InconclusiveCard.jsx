import React from 'react';
import { AlertTriangle, Camera, CheckCircle2 } from 'lucide-react';
import { TRANSLATIONS } from '../utils/language';

export default function InconclusiveCard({ onRetake, isDark, lang }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  return (
    <div className={`rounded-2xl p-6 border-2 shadow-2xl max-w-3xl mx-auto my-6 text-left transition-all duration-300 ${
      isDark 
        ? 'glass-panel border-amber-500/40 bg-amber-950/20' 
        : 'bg-amber-50/90 border-amber-300 text-amber-950 shadow-amber-900/5'
    }`}>
      
      {/* Header */}
      <div className="flex items-center space-x-3 mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${
          isDark ? 'bg-amber-500/20 border-amber-500/40 text-amber-400' : 'bg-amber-100 border-amber-300 text-amber-700'
        }`}>
          <AlertTriangle className="w-7 h-7 stroke-[2.5]" />
        </div>
        <div>
          <h3 className={`text-xl font-extrabold ${isDark ? 'text-amber-200' : 'text-amber-900'}`}>
            {t.inconclusiveTitle}
          </h3>
          <p className={`text-xs font-medium ${isDark ? 'text-amber-300/80' : 'text-amber-700'}`}>
            {t.inconclusiveSub}
          </p>
        </div>
      </div>

      <p className={`text-sm mb-4 leading-relaxed ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
        {t.inconclusiveDesc}
      </p>

      {/* Guidelines Box */}
      <div className={`rounded-xl p-4 border mb-6 ${
        isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-white border-amber-200 shadow-sm'
      }`}>
        <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-3">
          {t.photoTipsTitle}
        </h4>
        <div className={`grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs ${
          isDark ? 'text-slate-300' : 'text-slate-700'
        }`}>
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>{t.tip1}</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>{t.tip2}</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>{t.tip3}</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>{t.tip4}</span>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="flex justify-end">
        <button
          onClick={onRetake}
          className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-all duration-200 shadow-lg shadow-amber-950/30"
        >
          <Camera className="w-4 h-4" />
          <span>{t.retakeBtn}</span>
        </button>
      </div>

    </div>
  );
}
