import React, { useRef } from 'react';
import { Upload, Camera, Image as ImageIcon, X, RefreshCw, CheckCircle2 } from 'lucide-react';
import { TRANSLATIONS } from '../utils/language';

export default function ImageUpload({
  imageFile,
  imagePreview,
  onImageSelected,
  onImageRemoved,
  onSelectSampleImage,
  isDark,
  lang
}) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const processFile = (file) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (JPEG, PNG, WEBP).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      onImageSelected(file, e.target?.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
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
            1
          </span>
          <h3 className={`text-base font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
            {t.uploadTitle}
          </h3>
        </div>

        {imagePreview && (
          <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
            isDark ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-emerald-100 text-emerald-800'
          }`}>
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{t.photoLoaded}</span>
          </span>
        )}
      </div>

      {/* Hidden inputs */}
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
      <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" onChange={handleFileChange} className="hidden" />

      {/* Upload area or Image preview */}
      {!imagePreview ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className={`border-2 border-dashed rounded-xl p-6 text-center transition-all duration-200 cursor-pointer group ${
            isDark
              ? 'border-slate-700 hover:border-emerald-500/50 bg-slate-950/40 hover:bg-slate-900/60'
              : 'border-slate-300 hover:border-emerald-500 bg-slate-50 hover:bg-emerald-50/50'
          }`}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 transition-colors ${
            isDark
              ? 'bg-slate-800 group-hover:bg-emerald-500/20 text-slate-400 group-hover:text-emerald-400'
              : 'bg-slate-200 group-hover:bg-emerald-100 text-slate-600 group-hover:text-emerald-700'
          }`}>
            <Upload className="w-6 h-6" />
          </div>

          <p className={`text-sm font-semibold ${
            isDark ? 'text-slate-200 group-hover:text-emerald-300' : 'text-slate-800 group-hover:text-emerald-700'
          }`}>
            {t.clickUpload}
          </p>
          <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            {t.uploadNote}
          </p>

          {/* Buttons bar */}
          <div className="mt-4 flex items-center justify-center space-x-3" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => cameraInputRef.current?.click()}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300 shadow-sm'
              }`}
            >
              <Camera className="w-4 h-4 text-emerald-500" />
              <span>{t.takePhoto}</span>
            </button>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300 shadow-sm'
              }`}
            >
              <ImageIcon className="w-4 h-4 text-sky-500" />
              <span>{t.browseFile}</span>
            </button>
          </div>

          {/* Quick sample test photo buttons */}
          <div className={`mt-4 pt-3 border-t flex flex-wrap items-center justify-center gap-2 ${
            isDark ? 'border-slate-800' : 'border-slate-200'
          }`} onClick={(e) => e.stopPropagation()}>
            <span className={`text-[11px] font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {t.quickTest}
            </span>
            <button
              type="button"
              onClick={() => onSelectSampleImage('tomato_leaf')}
              className={`text-[11px] px-2.5 py-1 rounded font-medium border transition-colors ${
                isDark
                  ? 'bg-slate-800 hover:bg-emerald-950 text-slate-300 hover:text-emerald-300 border-slate-700'
                  : 'bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border-slate-300 shadow-sm'
              }`}
            >
              {t.sampleTomato}
            </button>
            <button
              type="button"
              onClick={() => onSelectSampleImage('healthy_rice')}
              className={`text-[11px] px-2.5 py-1 rounded font-medium border transition-colors ${
                isDark
                  ? 'bg-slate-800 hover:bg-green-950 text-slate-300 hover:text-green-300 border-slate-700'
                  : 'bg-white hover:bg-green-50 text-slate-700 hover:text-green-800 border-slate-300 shadow-sm'
              }`}
            >
              {t.sampleRice}
            </button>
            <button
              type="button"
              onClick={() => onSelectSampleImage('yellow_mosaic')}
              className={`text-[11px] px-2.5 py-1 rounded font-medium border transition-colors ${
                isDark
                  ? 'bg-slate-800 hover:bg-amber-950 text-slate-300 hover:text-amber-300 border-slate-700'
                  : 'bg-white hover:bg-amber-50 text-slate-700 hover:text-amber-800 border-slate-300 shadow-sm'
              }`}
            >
              {t.sampleMosaic}
            </button>
            <button
              type="button"
              onClick={() => onSelectSampleImage('blurry_leaf')}
              className={`text-[11px] px-2.5 py-1 rounded font-medium border transition-colors ${
                isDark
                  ? 'bg-slate-800 hover:bg-red-950 text-slate-300 hover:text-red-300 border-slate-700'
                  : 'bg-white hover:bg-red-50 text-slate-700 hover:text-red-800 border-slate-300 shadow-sm'
              }`}
            >
              {t.sampleBlurry}
            </button>
          </div>

        </div>
      ) : (
        <div className={`relative rounded-xl overflow-hidden border p-3 ${
          isDark ? 'border-slate-700 bg-slate-950/60' : 'border-slate-200 bg-slate-50'
        }`}>
          <div className={`relative aspect-video sm:aspect-[16/9] w-full rounded-lg overflow-hidden flex items-center justify-center ${
            isDark ? 'bg-slate-900' : 'bg-slate-200'
          }`}>
            <img src={imagePreview} alt="Crop leaf preview" className="max-h-full max-w-full object-contain rounded-lg" />
            <button
              type="button"
              onClick={onImageRemoved}
              className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-900/80 hover:bg-red-600 text-white border border-slate-700 transition-colors shadow"
              title="Remove image"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-3 flex items-center justify-between text-xs px-1">
            <span className={`truncate max-w-[200px] font-mono ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {imageFile?.name || "leaf_sample.jpg"}
            </span>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className={`flex items-center space-x-1 px-2.5 py-1 rounded-md text-xs font-medium border ${
                isDark ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700' : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300 shadow-sm'
              }`}
            >
              <RefreshCw className="w-3 h-3 text-emerald-500" />
              <span>{t.replaceBtn}</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
