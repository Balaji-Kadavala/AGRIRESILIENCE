import React from 'react';
import { CloudSun, Thermometer, Droplets, Wind, CloudRain, Clock } from 'lucide-react';
import { TRANSLATIONS } from '../utils/language';

export default function WeatherCard({ weather, isLoading, isDark, lang }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  if (isLoading) {
    return (
      <div className={`rounded-2xl p-5 border shadow-lg animate-pulse ${
        isDark ? 'glass-panel border-emerald-500/20' : 'bg-white border-slate-200'
      }`}>
        <div className={`h-5 rounded w-1/3 mb-4 ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`} />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={`h-16 rounded-xl ${isDark ? 'bg-slate-800/80' : 'bg-slate-100'}`} />
          ))}
        </div>
      </div>
    );
  }

  if (!weather) return null;

  const {
    temperature,
    humidity,
    rain_probability,
    precipitation,
    wind_speed,
    weather_condition,
    next_rain_hours,
    agricultural_summary,
    forecast = []
  } = weather;

  return (
    <div className={`rounded-2xl p-5 border shadow-lg relative overflow-hidden transition-all duration-300 ${
      isDark 
        ? 'glass-panel border-sky-500/20' 
        : 'bg-white border-slate-200 shadow-slate-200/50'
    }`}>
      
      {/* Glow */}
      <div className={`absolute top-0 right-0 w-48 h-48 rounded-full blur-2xl pointer-events-none ${
        isDark ? 'bg-sky-500/5' : 'bg-sky-200/30'
      }`} />

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <span className={`flex items-center justify-center w-7 h-7 rounded-lg font-bold text-sm ${
            isDark ? 'bg-sky-500/20 text-sky-400' : 'bg-sky-100 text-sky-800'
          }`}>
            3
          </span>
          <h3 className={`text-base font-bold flex items-center space-x-2 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
            <span>{t.weatherTitle}</span>
            <CloudSun className="w-5 h-5 text-sky-500" />
          </h3>
        </div>

        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
          isDark ? 'bg-slate-800 text-sky-300 border-sky-500/30' : 'bg-sky-50 text-sky-800 border-sky-200'
        }`}>
          Open-Meteo Live
        </span>
      </div>

      {/* Weather Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        
        {/* Temp */}
        <div className={`p-3 rounded-xl border flex items-center space-x-3 ${
          isDark ? 'bg-slate-950/60 border-slate-800/80' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
            <Thermometer className="w-5 h-5" />
          </div>
          <div>
            <p className={`text-[11px] font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{t.tempLabel}</p>
            <p className={`text-base font-black ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>{temperature}°C</p>
          </div>
        </div>

        {/* Humidity */}
        <div className={`p-3 rounded-xl border flex items-center space-x-3 ${
          humidity >= 80 
            ? (isDark ? 'bg-indigo-950/40 border-indigo-500/40' : 'bg-indigo-50 border-indigo-200')
            : (isDark ? 'bg-slate-950/60 border-slate-800/80' : 'bg-slate-50 border-slate-200')
        }`}>
          <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-500">
            <Droplets className="w-5 h-5" />
          </div>
          <div>
            <p className={`text-[11px] font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{t.humidityLabel}</p>
            <p className={`text-base font-black ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>{humidity}%</p>
          </div>
        </div>

        {/* Rain Prob */}
        <div className={`p-3 rounded-xl border flex items-center space-x-3 ${
          rain_probability >= 60 
            ? (isDark ? 'bg-sky-950/40 border-sky-500/40' : 'bg-sky-50 border-sky-200')
            : (isDark ? 'bg-slate-950/60 border-slate-800/80' : 'bg-slate-50 border-slate-200')
        }`}>
          <div className="p-2 rounded-lg bg-sky-500/10 text-sky-500">
            <CloudRain className="w-5 h-5" />
          </div>
          <div>
            <p className={`text-[11px] font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{t.rainChanceLabel}</p>
            <p className={`text-base font-black ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>{rain_probability}%</p>
          </div>
        </div>

        {/* Wind */}
        <div className={`p-3 rounded-xl border flex items-center space-x-3 ${
          isDark ? 'bg-slate-950/60 border-slate-800/80' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="p-2 rounded-lg bg-teal-500/10 text-teal-500">
            <Wind className="w-5 h-5" />
          </div>
          <div>
            <p className={`text-[11px] font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{t.windSpeedLabel}</p>
            <p className={`text-base font-black ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>{wind_speed} <span className="text-xs font-normal">km/h</span></p>
          </div>
        </div>

      </div>

      {/* Rain Alert Banner */}
      {next_rain_hours !== null && next_rain_hours !== undefined && (
        <div className={`mb-4 p-3 rounded-xl border flex items-start space-x-2 text-xs ${
          isDark ? 'bg-amber-500/10 border-amber-500/30 text-amber-300' : 'bg-amber-50 border-amber-300 text-amber-900'
        }`}>
          <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">{t.upcomingRainAdvisory} </span>
            <span>Precipitation (~{rain_probability}% probability) expected within the next {intOrFloat(next_rain_hours)} hours. Foliar sprays should be timed with care.</span>
          </div>
        </div>
      )}

      {/* Hourly forecast strip (24-Hour Timeline) */}
      {forecast.length > 0 && (
        <div className={`mt-3 pt-3 border-t ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
          <div className="flex items-center justify-between mb-2">
            <p className={`text-[11px] font-bold uppercase tracking-wider ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>
              {t.timelineTitle || "24-Hour Forecast Timeline"}
            </p>
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
              isDark ? 'bg-slate-800 text-sky-300' : 'bg-sky-50 text-sky-700 border border-sky-200'
            }`}>
              {forecast.length >= 24 ? "24 Hours Ahead" : `${forecast.length} Hours`}
            </span>
          </div>
          
          <div className="flex items-center space-x-2 overflow-x-auto pb-3 pt-1 scrollbar-thin">
            {forecast.slice(0, 24).map((item, idx) => {
              const isHighRain = item.rain_probability >= 50;
              const isNow = idx === 0;
              return (
                <div
                  key={idx}
                  className={`shrink-0 w-22 p-2.5 rounded-xl border text-center transition-all duration-200 ${
                    isNow
                      ? (isDark ? 'bg-sky-950/80 border-sky-500/60 shadow-sky-500/20' : 'bg-sky-50/90 border-sky-400 shadow-sm')
                      : isHighRain
                      ? (isDark ? 'bg-amber-950/40 border-amber-500/40' : 'bg-amber-50/70 border-amber-300')
                      : (isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200')
                  }`}
                >
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    <span className={`text-[10px] font-mono font-bold ${
                      isNow
                        ? (isDark ? 'text-sky-400 font-extrabold' : 'text-sky-700 font-extrabold')
                        : (isDark ? 'text-slate-400' : 'text-slate-600')
                    }`}>
                      {isNow ? 'NOW' : item.time}
                    </span>
                  </div>

                  <span className={`text-xs font-black block my-0.5 ${
                    isDark ? 'text-slate-100' : 'text-slate-900'
                  }`}>
                    {item.temperature}°C
                  </span>

                  <span className={`text-[10px] font-bold block ${
                    isHighRain ? 'text-amber-600 dark:text-amber-400 font-extrabold' : 'text-sky-600 dark:text-sky-400'
                  }`}>
                    💧 {Math.round(item.rain_probability)}%
                  </span>

                  {item.precipitation > 0 && (
                    <span className="text-[9px] text-slate-400 block font-mono mt-0.5">
                      {item.precipitation.toFixed(1)}mm
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Agricultural Weather Interpretation */}
      <div className={`mt-3 p-3 rounded-xl border text-xs leading-relaxed ${
        isDark ? 'bg-slate-950/60 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
      }`}>
        <span className="font-bold text-emerald-600">{t.interpretationTitle} </span>
        {agricultural_summary}
      </div>

    </div>
  );
}

function intOrFloat(val) {
  return typeof val === 'number' ? val.toFixed(0) : val;
}
