import React from 'react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { useLanguage } from '../../context/LanguageContext';
import { Sun, Contrast, Type } from 'lucide-react';

export const AccessibilityBar = () => {
  const { fontSize, setFontSize, highContrast, setHighContrast } = useAccessibility();
  const { t } = useLanguage();

  return (
    <div className="bg-moh-900 text-slate-100 text-xs py-1 px-4 flex justify-between items-center border-b border-moh-800">
      <div className="flex items-center gap-2">
        <span className="font-semibold text-moh-300">🇱🇰 {t('govHeader')}</span>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 bg-moh-800/80 px-2 py-0.5 rounded">
          <Type className="w-3 h-3 text-moh-300" />
          <button 
            onClick={() => setFontSize('normal')} 
            className={`px-1 rounded ${fontSize === 'normal' ? 'bg-moh-600 font-bold text-white' : 'text-slate-300 hover:text-white'}`}
          >
            A
          </button>
          <button 
            onClick={() => setFontSize('large')} 
            className={`px-1 rounded ${fontSize === 'large' ? 'bg-moh-600 font-bold text-white' : 'text-slate-300 hover:text-white'}`}
          >
            A+
          </button>
          <button 
            onClick={() => setFontSize('xlarge')} 
            className={`px-1 rounded ${fontSize === 'xlarge' ? 'bg-moh-600 font-bold text-white' : 'text-slate-300 hover:text-white'}`}
          >
            A++
          </button>
        </div>

        <button
          onClick={() => setHighContrast(!highContrast)}
          className={`flex items-center gap-1 px-2 py-0.5 rounded transition ${
            highContrast ? 'bg-yellow-400 text-slate-950 font-bold' : 'bg-moh-800 text-slate-300 hover:text-white'
          }`}
          title="Toggle High Contrast Mode"
        >
          <Contrast className="w-3 h-3" />
          <span className="hidden sm:inline">Contrast</span>
        </button>
      </div>
    </div>
  );
};
