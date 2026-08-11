import React from 'react';
import { Sprout, Sparkles } from 'lucide-react';
import { TRANSLATIONS } from '../utils/language';

export default function Hero({ onTryDemo, isDark, lang }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  return (
    <section className="relative pt-4 pb-2 text-center transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Simple Farmer Welcome Badge */}
        <div className={`inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-extrabold mb-3 shadow-md ${
          isDark 
            ? 'bg-emerald-900/80 border border-emerald-400/40 text-emerald-200' 
            : 'bg-emerald-100 border border-emerald-300 text-emerald-900'
        }`}>
          <Sprout className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>{t.heroBadge || "Farmer-Friendly AI Crop Protection"}</span>
        </div>

        {/* Big Bold Headline */}
        <h2 className={`text-2xl sm:text-4xl font-black tracking-tight leading-tight ${
          isDark ? 'text-white' : 'text-emerald-950'
        }`}>
          {t.heroHeadline}
        </h2>

        {/* Simple Subtitle */}
        <p className={`mt-2 text-xs sm:text-sm font-semibold max-w-2xl mx-auto leading-relaxed ${
          isDark ? 'text-slate-300' : 'text-slate-700'
        }`}>
          {t.heroSub}
        </p>

      </div>
    </section>
  );
}

