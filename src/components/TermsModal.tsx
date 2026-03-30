import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  t: any;
}

export function TermsModal({ isOpen, onClose, t }: TermsModalProps) {
  if (!t.terms) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />
          
          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center p-4 z-[101] pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden pointer-events-auto flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between shrink-0">
                <h2 className="text-2xl font-bold text-gray-900">{t.terms.title}</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Content */}
              <div className="px-8 py-8 overflow-y-auto custom-scrollbar">
                <div className="space-y-8">
                  <p className="text-gray-600 leading-relaxed">
                    {t.terms.intro}
                  </p>

                  <section>
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <div className="w-1.5 h-5 bg-blue-600 rounded-full" />
                      {t.terms.termsTitle}
                    </h3>
                    <ul className="space-y-3">
                      {t.terms.terms.map((item: string, idx: number) => (
                        <li key={idx} className="flex gap-3 text-gray-500 leading-relaxed">
                          <span className="font-bold text-blue-600 shrink-0">{idx + 1}.</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <div className="w-1.5 h-5 bg-blue-600 rounded-full" />
                      {t.terms.privacyTitle}
                    </h3>
                    <ul className="space-y-3">
                      {t.terms.privacy.map((item: string, idx: number) => (
                        <li key={idx} className="flex gap-3 text-gray-500 leading-relaxed">
                          <span className="font-bold text-blue-600 shrink-0">{idx + 7}.</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>
              </div>

              {/* Footer */}
              <div className="px-8 py-6 border-t border-gray-100 flex justify-end shrink-0">
                <button
                  onClick={onClose}
                  className="px-6 py-2 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
