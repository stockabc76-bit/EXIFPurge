import React from 'react';
import { languages, Language } from '../translations';
import { Globe } from 'lucide-react';
import { cn } from '../lib/utils';

interface LanguageSelectorProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ currentLang, onLanguageChange }) => {
  return (
    <div className="relative group">
      <div className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-full shadow-sm hover:border-gray-300 transition-all cursor-pointer">
        <Globe className="w-4 h-4 text-gray-500" />
        <span className="text-sm font-medium text-gray-700">
          {languages.find(l => l.code === currentLang)?.native}
        </span>
      </div>
      
      <div className="absolute right-0 top-full mt-2 w-64 max-h-96 overflow-y-auto bg-white border border-gray-200 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 py-2">
        <div className="grid grid-cols-1">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => onLanguageChange(lang.code)}
              className={cn(
                "flex items-center justify-between px-4 py-2 text-sm text-left hover:bg-gray-50 transition-colors",
                currentLang === lang.code ? "text-blue-600 font-semibold bg-blue-50/50" : "text-gray-700"
              )}
            >
              <span>{lang.native}</span>
              <span className="text-xs text-gray-400">{lang.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
