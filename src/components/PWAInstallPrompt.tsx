'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Share, PlusSquare, X } from 'lucide-react';

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check if already in standalone (installed) mode
    const standaloneMode =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true;
    setIsStandalone(standaloneMode);

    // Check if iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    // Listen for beforeinstallprompt (Android / Desktop Chrome)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    } else if (isIOS) {
      setShowIOSGuide(true);
    }
  };

  // If already installed or dismissed, hide
  if (isStandalone || dismissed) return null;

  return (
    <>
      {/* Discrete Floating Banner or Button at Top/Bottom */}
      <div className="w-full flex justify-center px-4 my-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-[390px] bg-[#FFF9F2] rounded-2xl p-3.5 shadow-soft border border-[#D8AE87]/30 flex items-center justify-between gap-3 text-right"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#F3CED0] flex items-center justify-center text-roseAccent">
              <Download size={16} />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-warmBrown font-arabic">
                تثبيت التطبيق على الموبايل
              </span>
              <span className="text-[11px] text-warmBrown/70 font-arabic">
                لتجربة سريعة وسهلة كبرنامج خاص ❤️
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleInstallClick}
              className="px-3 py-1.5 rounded-full bg-[#D88C88] hover:bg-[#CF7E7A] text-white text-xs font-arabic font-semibold transition-transform active:scale-95 shadow-xs"
            >
              تثبيت
            </button>
            <button
              onClick={() => setDismissed(true)}
              className="text-warmBrown/40 hover:text-warmBrown p-1"
              aria-label="Dismiss"
            >
              <X size={14} />
            </button>
          </div>
        </motion.div>
      </div>

      {/* iOS Safari Guide Modal */}
      <AnimatePresence>
        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="w-full max-w-[360px] bg-[#FFF9F2] rounded-3xl p-6 shadow-2xl border border-[#D8AE87]/40 flex flex-col text-right"
            >
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="w-8 h-8 rounded-full bg-[#FAF3EB] text-warmBrown flex items-center justify-center"
                >
                  <X size={16} />
                </button>
                <h3 className="text-base font-bold text-warmBrown font-arabic">
                  تثبيت التطبيق على iPhone 📱
                </h3>
              </div>

              <div className="flex flex-col gap-3 font-arabic text-xs sm:text-sm text-warmBrown/80 leading-relaxed">
                <div className="flex items-start gap-2.5 bg-[#FAF3EB] p-3 rounded-2xl">
                  <div className="p-1.5 bg-[#F2E1DD] rounded-lg text-roseAccent">
                    <Share size={18} />
                  </div>
                  <div>
                    <span className="font-bold text-warmBrown">1.</span> اضغطي على زر المشاركة (Share) في شريط سفاري أسفل الشاشة.
                  </div>
                </div>

                <div className="flex items-start gap-2.5 bg-[#FAF3EB] p-3 rounded-2xl">
                  <div className="p-1.5 bg-[#F2E1DD] rounded-lg text-roseAccent">
                    <PlusSquare size={18} />
                  </div>
                  <div>
                    <span className="font-bold text-warmBrown">2.</span> اختاري "إضافة إلى الشاشة الرئيسية" (Add to Home Screen).
                  </div>
                </div>

                <div className="flex items-start gap-2.5 bg-[#FAF3EB] p-3 rounded-2xl">
                  <div className="p-1.5 bg-[#F2E1DD] rounded-lg text-roseAccent">
                    <Download size={18} />
                  </div>
                  <div>
                    <span className="font-bold text-warmBrown">3.</span> اضغطي "إضافة" (Add) في الزاوية العلوية ليظهر التطبيق في شاشتك!
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-5 w-full py-2.5 rounded-full bg-[#F3CED0] text-warmBrown font-arabic font-semibold text-sm transition-all hover:bg-[#EBBEC1]"
              >
                فهمت ذلك ❤️
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
