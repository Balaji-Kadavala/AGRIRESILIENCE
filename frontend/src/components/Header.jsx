import React, { useState } from 'react';
import { Sprout, Sparkles, Sun, Moon, Globe, ChevronDown, Check } from 'lucide-react';
import { LANGUAGES, TRANSLATIONS } from '../utils/language';

export default function Header({ onTryDemo, isAnalyzing, isDark, onToggleTheme, lang, onLangChange, onOpenLangModal }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  const currentLangObj = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];

  return (
    <header className={`sticky top-0 z-40 transition-colors duration-300 border-b ${
      isDark 
        ? 'glass-panel border-emerald-500/20 bg-slate-900/95 text-slate-100' 
        : 'bg-white/95 border-slate-200 text-slate-900 shadow-sm backdrop-blur-md'
    }`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        
        {/* Brand & Subtitle */}
        <div className="flex items-center space-x-2.5 sm:space-x-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-lg shadow-emerald-600/30 shrink-0">
            <Sprout className="w-6 h-6 sm:w-7 sm:h-7 text-white stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5 sm:space-x-2">
              <h1 className={`text-base sm:text-xl font-extrabold tracking-tight ${
                isDark 
                  ? 'bg-gradient-to-r from-emerald-400 via-green-300 to-teal-200 bg-clip-text text-transparent' 
                  : 'text-emerald-950'
              }`}>
                {t.title}
              </h1>
              <span className={`hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
                isDark 
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                  : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
              }`}>
                Farmer Friendly
              </span>
            </div>
            <p className={`text-[11px] sm:text-xs font-medium truncate max-w-[180px] sm:max-w-none ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {t.subtitle}
            </p>
          </div>
        </div>

        {/* Right CTA Actions */}
        <div className="flex items-center space-x-1.5 sm:space-x-2.5">
          
          {/* STYLISH FARMER VISUAL LANGUAGE SELECTOR BOX */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 sm:py-2 rounded-xl text-xs font-extrabold border transition-all duration-200 shadow-sm active:scale-95 ${
                isDark
                  ? 'bg-slate-800 hover:bg-slate-700 border-emerald-500/40 text-emerald-300'
                  : 'bg-emerald-50 hover:bg-emerald-100 border-emerald-300 text-emerald-950'
              }`}
              title="Change Farmer Language"
            >
              <span className="text-base">{currentLangObj.flag}</span>
              <span className="hidden sm:inline">{currentLangObj.label}</span>
              <ChevronDown className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            </button>

            {/* Dropdown Menu */}
            {isLangDropdownOpen && (
              <div className={`absolute right-0 mt-2 w-56 rounded-2xl p-2 border shadow-2xl z-50 transition-all ${
                isDark ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
              }`}>
                <div className="px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 border-b border-slate-200 dark:border-slate-800 mb-1">
                  Select Language / भाषा चुनें
                </div>
                {LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    type="button"
                    onClick={() => {
                      onLangChange(l.code);
                      setIsLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-between transition-colors ${
                      lang === l.code
                        ? (isDark ? 'bg-emerald-500/20 text-emerald-300' : 'bg-emerald-50 text-emerald-900')
                        : (isDark ? 'hover:bg-slate-800 text-slate-200' : 'hover:bg-slate-100 text-slate-800')
                    }`}
                  >
                    <span className="flex items-center space-x-2">
                      <span className="text-base">{l.flag}</span>
                      <span>{l.label}</span>
                    </span>
                    {lang === l.code && <Check className="w-4 h-4 text-emerald-500" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Switcher Button */}
          <button
            type="button"
            onClick={onToggleTheme}
            className={`flex items-center space-x-1 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl font-semibold text-xs transition-all duration-200 border focus:outline-none focus:ring-2 focus:ring-emerald-500/50 active:scale-95 ${
              isDark
                ? 'bg-slate-800 hover:bg-slate-700 text-amber-300 border-slate-700'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300 shadow-inner'
            }`}
            title={isDark ? "Switch to White / Light Theme" : "Switch to Black / Dark Theme"}
          >
            {isDark ? (
              <>
                <Sun className="w-4 h-4 text-amber-400 fill-amber-400/20" />
                <span className="hidden lg:inline">White Theme</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-slate-700 fill-slate-700/20" />
                <span className="hidden lg:inline">Black Theme</span>
              </>
            )}
          </button>

          {/* Demo Scenario Button */}
          <button
            type="button"
            onClick={onTryDemo}
            disabled={isAnalyzing}
            className={`flex items-center space-x-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl font-bold text-xs transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 active:scale-95 disabled:opacity-50 ${
              isDark
                ? 'bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-700/20'
            }`}
            title="Run complete Tomato Early Blight demo scenario"
          >
            <Sparkles className={`w-4 h-4 animate-pulse ${isDark ? 'text-emerald-400' : 'text-emerald-200'}`} />
            <span className="hidden sm:inline">Try Demo</span>
          </button>
        </div>

      </div>
    </header>
  );
}
