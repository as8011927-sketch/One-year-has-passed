'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Pencil } from 'lucide-react';
import { COUPLE_CONFIG } from '@/config/content';

interface SecondLetterProps {
  onEnterMain: () => void;
}

export default function SecondLetter({ onEnterMain }: SecondLetterProps) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center px-5 py-8 relative bg-[#F2E1DD]">
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-[370px] bg-[#FFF9F2] rounded-3xl p-7 shadow-card border border-[#D8AE87]/25 relative flex flex-col items-center text-center"
      >
        {/* Subtle decorative pencil icon in the upper-right corner */}
        <div className="absolute top-5 right-5 text-warmBrown/30 p-1.5 rounded-full hover:text-warmBrown/60 transition-colors">
          <Pencil size={18} strokeWidth={1.75} />
        </div>

        {/* Crying Face Emoji at the Top */}
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="text-4xl mt-3 mb-6"
        >
          {COUPLE_CONFIG.secondLetter.emoji}
        </motion.div>

        {/* Emotional Message */}
        <div className="my-4 px-2">
          <p className="text-base sm:text-lg text-warmBrown font-arabic leading-relaxed font-medium whitespace-pre-line">
            {COUPLE_CONFIG.secondLetter.message}
          </p>
        </div>

        {/* Enter Site Button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          onClick={onEnterMain}
          className="mt-8 mb-2 w-full py-3.5 px-6 rounded-full bg-[#F3CED0] hover:bg-[#EBBEC1] text-warmBrown font-arabic font-semibold text-base shadow-sm border border-[#D88C88]/30 flex items-center justify-center gap-2 transition-all"
        >
          <span>{COUPLE_CONFIG.secondLetter.buttonText}</span>
        </motion.button>
      </motion.div>
    </div>
  );
}
