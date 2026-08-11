import React, { useState } from 'react';
import { MapPin, Navigation, Edit2, Check, AlertTriangle } from 'lucide-react';
import { TRANSLATIONS } from '../utils/language';

export default function LocationCard({
  latitude,
  longitude,
  locationName,
  onLocationChange,
  isDetectingLocation,
  isDark,
  lang
}) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const [isEditing, setIsEditing] = useState(false);
  const [tempLat, setTempLat] = useState(latitude.toString());
  const [tempLon, setTempLon] = useState(longitude.toString());
  const [geoError, setGeoError] = useState('');

  const handleGetCurrentLocation = () => {
    setGeoError('');
    if (!navigator.geolocation) {
      setGeoError('Geolocation is not supported by your browser. Please enter manually.');
      setIsEditing(true);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = parseFloat(position.coords.latitude.toFixed(4));
        const lon = parseFloat(position.coords.longitude.toFixed(4));
        onLocationChange(lat, lon);
        setTempLat(lat.toString());
        setTempLon(lon.toString());
        setIsEditing(false);
      },
      (error) => {
        console.warn('Geolocation error:', error);
        setGeoError('GPS permission denied or unavailable. Using manual coordinates.');
        setIsEditing(true);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const handleSaveManual = (e) => {
    e.preventDefault();
    const lat = parseFloat(tempLat);
    const lon = parseFloat(tempLon);
    if (!isNaN(lat) && !isNaN(lon) && lat >= -90 && lat <= 90 && lon >= -180 && lon <= 180) {
      onLocationChange(lat, lon);
      setIsEditing(false);
      setGeoError('');
    } else {
      setGeoError('Please enter valid latitude (-90 to 90) and longitude (-180 to 180).');
    }
  };

  return (
    <div className={`rounded-2xl p-5 border shadow-lg transition-all duration-300 ${
      isDark 
        ? 'glass-panel border-emerald-500/20' 
        : 'bg-white border-slate-200 shadow-slate-200/50'
    }`}>
      
      {/* Title */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <span className={`flex items-center justify-center w-7 h-7 rounded-lg font-bold text-sm ${
            isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-800'
          }`}>
            2
          </span>
          <h3 className={`text-base font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
            {t.locationTitle}
          </h3>
        </div>

        <button
          type="button"
          onClick={() => setIsEditing(!isEditing)}
          className={`text-xs font-medium flex items-center space-x-1 ${
            isDark ? 'text-slate-400 hover:text-emerald-300' : 'text-slate-600 hover:text-emerald-700'
          }`}
        >
          <Edit2 className="w-3.5 h-3.5" />
          <span>{isEditing ? t.cancelEdit : t.editManual}</span>
        </button>
      </div>

      {/* Geolocation Button */}
      {!isEditing ? (
        <div className="space-y-3">
          <div className={`flex items-center justify-between p-3 rounded-xl border ${
            isDark ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className={`text-xs font-semibold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                  {locationName || "Detecting field area..."}
                </p>
                <p className={`text-[11px] font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Lat: {latitude}° N, Lon: {longitude}° E
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleGetCurrentLocation}
              disabled={isDetectingLocation}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors disabled:opacity-50 border ${
                isDark
                  ? 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border-emerald-500/30'
                  : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-800 border-emerald-300'
              }`}
            >
              <Navigation className="w-3.5 h-3.5 text-emerald-500" />
              <span>{isDetectingLocation ? t.gpsFetching : t.useGps}</span>
            </button>
          </div>

          {geoError && (
            <div className="flex items-center space-x-2 text-xs text-amber-600 bg-amber-50 p-2.5 rounded-lg border border-amber-200">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{geoError}</span>
            </div>
          )}
        </div>
      ) : (
        <form onSubmit={handleSaveManual} className={`space-y-3 p-4 rounded-xl border ${
          isDark ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <p className={`text-xs font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            {t.enterCoordsTitle}
          </p>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={`block text-[11px] mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{t.latLabel}</label>
              <input
                type="number"
                step="any"
                value={tempLat}
                onChange={(e) => setTempLat(e.target.value)}
                placeholder="e.g. 16.53"
                className={`w-full px-3 py-1.5 border rounded-lg text-xs font-mono focus:outline-none focus:border-emerald-500 ${
                  isDark ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-white border-slate-300 text-slate-900'
                }`}
              />
            </div>

            <div>
              <label className={`block text-[11px] mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{t.lonLabel}</label>
              <input
                type="number"
                step="any"
                value={tempLon}
                onChange={(e) => setTempLon(e.target.value)}
                placeholder="e.g. 80.58"
                className={`w-full px-3 py-1.5 border rounded-lg text-xs font-mono focus:outline-none focus:border-emerald-500 ${
                  isDark ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-white border-slate-300 text-slate-900'
                }`}
              />
            </div>
          </div>

          {geoError && <p className="text-xs text-red-500">{geoError}</p>}

          <div className="flex justify-end space-x-2 pt-1">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                isDark ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              }`}
            >
              {t.cancelEdit}
            </button>
            <button
              type="submit"
              className="flex items-center space-x-1 px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow"
            >
              <Check className="w-3.5 h-3.5" />
              <span>{t.applyCoords}</span>
            </button>
          </div>
        </form>
      )}

    </div>
  );
}
