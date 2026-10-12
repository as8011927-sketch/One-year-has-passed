'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { COUPLE_CONFIG } from '@/config/content';

interface EnvelopeIntroProps {
  onOpen: () => void;
}

export default function EnvelopeIntro({ onOpen }: EnvelopeIntroProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (isOpen) {
      onOpen();
      return;
    }
    setIsOpen(true);

    // Allow flap to open and paper to smoothly glide upward into full view
    setTimeout(() => {
      onOpen();
    }, 1800);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 relative overflow-hidden select-none bg-[#F2E1DD]">
      {/* Gentle Floating Envelope Assembly */}
      <motion.div
        animate={isOpen ? { y: 25 } : { y: [0, -8, 0] }}
        transition={
          isOpen
            ? { duration: 0.8, ease: 'easeOut' }
            : { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }
        }
        className="w-full max-w-[370px] relative cursor-pointer"
        onClick={handleOpen}
      >
        {/*
          1. envelope-container: position relative, overflow visible
        */}
        <div className="envelope-container relative w-full aspect-[1.38/1] rounded-2xl shadow-envelope bg-[#D8AE87] envelope-perspective overflow-visible">
          
          {/* envelope-back: base interior backing */}
          <div className="envelope-back absolute inset-0 bg-[#C5966E] rounded-2xl border border-[#BD8E65]/40 z-0" />

          {/* letter-paper: separate, independently animated paper element */}
          <motion.div
            initial={{ y: 35, scale: 0.96 }}
            animate={
              isOpen
                ? {
                    y: -140,
                    scale: 1.02,
                    boxShadow: '0 16px 32px rgba(121, 92, 83, 0.22)',
                  }
                : {
                    y: 35,
                    scale: 0.96,
                    boxShadow: '0 2px 6px rgba(121, 92, 83, 0.08)',
                  }
            }
            transition={{
              duration: 0.85,
              delay: isOpen ? 0.35 : 0,
              ease: [0.25, 1, 0.5, 1],
            }}
            className="letter-paper absolute left-5 right-5 top-4 h-52 bg-[#FFF9F2] rounded-xl border border-[#D8AE87]/40 flex flex-col items-center justify-center p-4 text-center z-10"
          >
            <motion.span
              animate={isOpen ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-3xl mb-2"
            >
              ❤️
            </motion.span>
            <h3 className="text-sm sm:text-base font-bold text-warmBrown font-arabic leading-snug">
              رسالة خاصة جداً لزياد...
            </h3>
            <p className="text-xs text-warmBrown/75 font-arabic mt-1">
              من حبيبة بكل حب ❤️
            </p>
          </motion.div>

          {/* envelope-front-pocket: covers the lower part of the tucked letter */}
          <div className="envelope-front-pocket absolute inset-0 z-20 pointer-events-none">
            {/* Left Flap */}
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                clipPath: 'polygon(0 0, 50% 50%, 0 100%)',
                backgroundColor: '#D1A37A',
              }}
            />

            {/* Right Flap */}
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                clipPath: 'polygon(100% 0, 50% 50%, 100% 100%)',
                backgroundColor: '#C89A71',
              }}
            />

            {/* Bottom Flap */}
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                clipPath: 'polygon(0 100%, 50% 48%, 100% 100%)',
                backgroundColor: '#D8AE87',
                boxShadow: '0 -2px 8px rgba(121, 92, 83, 0.08)',
              }}
            />

            {/* Front Pocket External Label (Letter for Ziad) */}
            <div className="absolute inset-x-0 bottom-4 z-20 flex flex-col items-center justify-center pointer-events-none">
              <p className="text-[11px] uppercase tracking-widest text-warmBrown/75 font-medium">
                {COUPLE_CONFIG.envelope.letterFor}
              </p>
              <h1 className="text-2xl sm:text-3xl font-script text-warmBrown tracking-wide mt-0.5">
                {COUPLE_CONFIG.envelope.recipient}
              </h1>
            </div>
          </div>

          {/* envelope-flap: top triangular fold, rotates open behind the emerging paper */}
          <motion.div
            initial={{ rotateX: 0 }}
            animate={{
              rotateX: isOpen ? 180 : 0,
            }}
            transition={{
              duration: 0.65,
              ease: [0.4, 0, 0.2, 1],
            }}
            className="envelope-flap absolute top-0 left-0 right-0 h-1/2 origin-top pointer-events-none"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              backgroundColor: isOpen ? '#C89A71' : '#E4C3A3',
              boxShadow: isOpen ? 'none' : '0 4px 12px rgba(121, 92, 83, 0.16)',
              zIndex: isOpen ? 5 : 30,
            }}
          />

          {/* heart-button: seal button at the envelope center */}
          <div className="heart-button absolute inset-0 z-40 flex items-center justify-center pointer-events-none">
            <motion.div
              animate={isOpen ? { scale: 0.6, opacity: 0 } : { scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className={isOpen ? 'pointer-events-none' : 'pointer-events-auto'}
            >
              <motion.button
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.94 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpen();
                }}
                className="w-14 h-14 rounded-full bg-[#D88C88] shadow-md flex items-center justify-center text-white text-2xl border-2 border-[#FFF9F2]/80 focus:outline-none transition-shadow hover:shadow-lg cursor-pointer"
                aria-label="Open Letter"
              >
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                >
                  ❤️
                </motion.span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Instruction text below envelope */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
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
