import { useState, useEffect } from 'react';
import { Language, translations } from './translations';
import { LanguageSelector } from './components/LanguageSelector';
import { ImageProcessor } from './components/ImageProcessor';
import { TermsModal } from './components/TermsModal';
import { Shield, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  // Try to detect browser language on first load
  useEffect(() => {
    const browserLang = navigator.language.split('-')[0] as Language;
    const supportedLangs = Object.keys(translations) as Language[];
    if (supportedLangs.includes(browserLang)) {
      setLang(browserLang);
    }
  }, []);

  const t = translations[lang];

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-gray-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-bottom border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
              <Shield className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900">
              EXIF<span className="text-blue-600">Purge</span>
            </span>
          </div>
          
          <LanguageSelector currentLang={lang} onLanguageChange={setLang} />
        </div>
      </header>

      <main className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-12 sm:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                <Sparkles className="w-3 h-3" />
                <span>Privacy First</span>
              </div>
              <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
                {t.title}
              </h1>
              <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                {t.subtitle}
              </p>
            </motion.div>
          </div>

          {/* Processor Component */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <ImageProcessor lang={lang} />
          </motion.div>

          {/* Educational Section */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-24 max-w-4xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <div className="w-2 h-6 bg-blue-600 rounded-full" />
                  {t.whatIsMetadata}
                </h3>
                <p className="text-gray-500 leading-relaxed">
                  {t.metadataDesc}
                </p>
              </div>
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <div className="w-2 h-6 bg-blue-600 rounded-full" />
                  {t.whatIsExif}
                </h3>
                <p className="text-gray-500 leading-relaxed">
                  {t.exifDesc}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-sm text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} EXIF Purge. No data leaves your device.
            </p>
            <span className="hidden sm:inline text-gray-200">|</span>
            <button 
              onClick={() => setIsTermsOpen(true)}
              className="hover:text-blue-600 transition-colors font-medium underline underline-offset-4"
            >
              {t.terms?.link || 'Terms and Privacy'}
            </button>
          </div>
        </div>
      </footer>

      <TermsModal 
        isOpen={isTermsOpen} 
        onClose={() => setIsTermsOpen(false)} 
        t={t} 
      />
    </div>
  );
}
