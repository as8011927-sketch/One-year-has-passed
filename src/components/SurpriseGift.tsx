'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { COUPLE_CONFIG } from '@/config/content';

interface SurpriseGiftProps {
  onScrollToMemories: () => void;
}

export default function SurpriseGift({ onScrollToMemories }: SurpriseGiftProps) {
  const [isOpened, setIsOpened] = useState(false);

  const handleOpenGift = () => {
    if (isOpened) return;
    setIsOpened(true);

    try {
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.75 },
        colors: ['#D88C88', '#F3CED0', '#E5A7A3', '#D8AE87', '#BD8E65'],
      });
    } catch {
      // safe fallback
    }
  };

  return (
    <div className="w-full flex flex-col items-center py-6 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[390px] bg-[#FFF9F2] rounded-3xl p-6 sm:p-7 shadow-card border border-[#D8AE87]/25 flex flex-col items-center text-center relative overflow-hidden"
      >
        {/* Heading */}
        <h2 className="text-base sm:text-lg font-bold text-warmBrown font-arabic mb-6">
          {COUPLE_CONFIG.hiddenGift.heading}
        </h2>

        {/* Gift Box Container */}
        <div
          onClick={handleOpenGift}
          className="relative w-52 h-44 cursor-pointer flex flex-col items-center justify-end select-none group"
        >
          {/* Gift Box Lid */}
          <motion.div
            animate={
              isOpened
                ? { y: -50, rotate: -15, opacity: 0.4 }
                : { y: [0, -3, 0] }
            }
            transition={{
              duration: isOpened ? 0.6 : 3,
              repeat: isOpened ? 0 : Infinity,
              ease: 'easeInOut',
            }}
            className="w-48 h-10 bg-[#E8A5A1] rounded-t-xl relative z-20 shadow-md flex items-center justify-center border-b border-[#D88C88]/40"
          >
            {/* Cream Ribbon Horiz */}
            <div className="absolute inset-y-0 w-8 bg-[#FFF9F2] shadow-xs flex items-center justify-center" />
            {/* Ribbon Knot / Heart */}
            <div className="absolute -top-3 w-8 h-8 rounded-full bg-[#D88C88] border-2 border-[#FFF9F2] shadow-sm flex items-center justify-center text-white text-xs z-30">
              ❤️
            </div>
          </motion.div>

          {/* Gift Box Base */}
          <div className="w-44 h-28 bg-[#D88C88] rounded-b-2xl relative z-10 shadow-lg flex items-center justify-center overflow-hidden">
            {/* Cream Ribbon Vertical */}
            <div className="absolute inset-y-0 w-8 bg-[#FFF9F2] shadow-xs flex items-center justify-center">
              {/* Heart in Center of Ribbon */}
              <div className="w-6 h-6 rounded-full bg-[#E8A5A1] flex items-center justify-center text-xs text-white shadow-xs">
                ❤️
              </div>
            </div>
          </div>

          {/* Subtle Glow */}
          <div className="absolute inset-0 bg-roseAccent/10 rounded-full blur-xl pointer-events-none -z-10" />
        </div>

        {/* Prompt or Revealed Content */}
        <AnimatePresence mode="wait">
          {!isOpened ? (
            <motion.p
              key="prompt"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-5 text-sm font-arabic font-semibold text-warmBrown/80 cursor-pointer hover:text-roseAccent transition-colors"
              onClick={handleOpenGift}
            >
              {COUPLE_CONFIG.hiddenGift.promptText}
            </motion.p>
          ) : (
            <motion.div
              key="revealed"
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 flex flex-col items-center w-full"
            >
              <div className="p-4 rounded-2xl bg-[#FAF3EB] border border-[#D8AE87]/30 w-full mb-4 shadow-xs flex flex-col items-center">
                <div className="w-full max-w-[200px] aspect-[3/4] rounded-xl overflow-hidden mb-3 border-2 border-white shadow-md">
                  <img
                    src="/images/memories/memory-1.jpg"
                    alt="أول يوم في الكلية"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-base font-bold text-warmBrown font-arabic leading-relaxed">
                  {COUPLE_CONFIG.hiddenGift.revealedTitle}
                </p>
                {COUPLE_CONFIG.hiddenGift.revealedSubtitle && (
                  <p className="text-xs text-warmBrown/75 font-arabic mt-1.5">
                    {COUPLE_CONFIG.hiddenGift.revealedSubtitle}
                  </p>
                )}
              </div>

              {/* Continue to Memories Button */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onScrollToMemories}
                className="w-full py-3 px-5 rounded-full bg-[#F3CED0] hover:bg-[#EBBEC1] text-warmBrown font-arabic font-semibold text-sm shadow-sm border border-[#D88C88]/30 transition-all"
              >
                {COUPLE_CONFIG.hiddenGift.continueButtonText}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
