'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COUPLE_CONFIG } from '@/config/content';

interface EnvelopeIntroProps {
  onOpen: () => void;
}

export default function EnvelopeIntro({ onOpen }: EnvelopeIntroProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    // Give time for envelope flap to open and letter to emerge
    setTimeout(() => {
      onOpen();
    }, 1200);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 relative overflow-hidden select-none bg-[#F2E1DD]">
      {/* Gentle Floating Envelope Container */}
      <motion.div
        animate={isOpen ? { y: 20 } : { y: [0, -10, 0] }}
        transition={{
          duration: 3.5,
          repeat: isOpen ? 0 : Infinity,
          ease: 'easeInOut',
        }}
        className="w-full max-w-[370px] relative cursor-pointer"
        onClick={handleOpen}
      >
        {/* Envelope Outer Wrapper */}
        <div className="relative w-full aspect-[1.38/1] rounded-2xl shadow-envelope bg-[#D8AE87] overflow-visible envelope-perspective">
          {/* Back Wall of Envelope */}
          <div className="absolute inset-0 bg-[#BD8E65] rounded-2xl" />

          {/* Paper Letter Sliding Up on Click */}
          <motion.div
            initial={{ y: 0, opacity: 0 }}
            animate={isOpen ? { y: -130, opacity: 1, scale: 1.02 } : { y: 0, opacity: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: 'easeOut' }}
            className="absolute left-4 right-4 top-2 h-48 bg-[#FFF9F2] rounded-xl shadow-lg border border-[#D8AE87]/30 flex flex-col items-center justify-center p-4 z-10"
          >
            <span className="text-3xl mb-1 animate-pulse">❤️</span>
            <p className="text-xs text-warmBrown/70 font-arabic text-center">
              رسالة خاصة جداً من زياد...
            </p>
          </motion.div>

          {/* Left Flap */}
          <div
            className="absolute inset-0 z-20 pointer-events-none"
            style={{
              clipPath: 'polygon(0 0, 50% 50%, 0 100%)',
              backgroundColor: '#D1A37A',
            }}
          />

          {/* Right Flap */}
          <div
            className="absolute inset-0 z-20 pointer-events-none"
            style={{
              clipPath: 'polygon(100% 0, 50% 50%, 100% 100%)',
              backgroundColor: '#C89A71',
            }}
          />

          {/* Bottom Flap */}
          <div
            className="absolute inset-0 z-20 pointer-events-none"
            style={{
              clipPath: 'polygon(0 100%, 50% 48%, 100% 100%)',
              backgroundColor: '#D8AE87',
            }}
          />

          {/* Top Flap (Origami Fold) */}
          <motion.div
            initial={false}
            animate={{ rotateX: isOpen ? 180 : 0 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
            className="absolute top-0 left-0 right-0 h-1/2 z-30 origin-top pointer-events-none"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              backgroundColor: '#E4C3A3',
              boxShadow: '0 4px 10px rgba(121, 92, 83, 0.15)',
            }}
          />

          {/* Envelope Front Details & Typography */}
          <div className="absolute inset-0 z-25 flex flex-col items-center justify-between p-6 pointer-events-none">
            {/* Top Text on Envelope */}
            <div className="text-center pt-2">
              <p className="text-xs uppercase tracking-widest text-warmBrown/80 font-medium">
                {COUPLE_CONFIG.envelope.letterFor}
              </p>
              <h1 className="text-3xl md:text-4xl font-script text-warmBrown mt-0.5 tracking-wide">
                {COUPLE_CONFIG.envelope.recipient}
              </h1>
            </div>

            {/* Heart Seal Button in the Center */}
            <div className="my-auto pointer-events-auto">
              <motion.button
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.94 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpen();
                }}
                className="w-14 h-14 rounded-full bg-[#D88C88] shadow-md flex items-center justify-center text-white text-2xl border-2 border-[#FFF9F2]/70 focus:outline-none transition-shadow hover:shadow-lg"
                aria-label="Open Letter"
              >
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                >
                  ❤️
                </motion.span>
              </motion.button>
            </div>

            {/* Bottom blank area for spacing */}
            <div className="h-4" />
          </div>
        </div>
      </motion.div>

      {/* Instruction text below envelope */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-8 text-center"
      >
        <p className="text-sm font-semibold tracking-wide text-warmBrown/80 flex items-center justify-center gap-1.5 font-arabic">
          <span className="text-roseAccent text-base">♥</span>
          <span>{COUPLE_CONFIG.envelope.hint.replace(/[♥]/g, '').trim()}</span>
          <span className="text-roseAccent text-base">♥</span>
        </p>
      </motion.div>
    </div>
  );
}
