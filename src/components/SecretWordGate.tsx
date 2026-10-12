'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { COUPLE_CONFIG } from '@/config/content';

interface SecretWordGateProps {
  onSuccess: () => void;
}

export default function SecretWordGate({ onSuccess }: SecretWordGateProps) {
  const [inputWord, setInputWord] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputWord.trim()) return;

    setError('');
    setLoading(true);

    try {
      // Server-side verification
      const res = await fetch('/api/verify-secret', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secretWord: inputWord.trim() }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Successful unlock
        setTimeout(() => {
          onSuccess();
        }, 500);
      } else {
        // Friendly Arabic error
        setError(data.error || COUPLE_CONFIG.secretGate.errorMessage);
        setLoading(false);
      }
    } catch (err) {
      // Fallback local check if offline
      const normalized = inputWord.trim().toLowerCase();
      if (normalized === COUPLE_CONFIG.secretGate.secretWord.toLowerCase()) {
        setTimeout(() => {
          onSuccess();
        }, 500);
      } else {
        setError(COUPLE_CONFIG.secretGate.errorMessage);
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-5 py-6 relative bg-[#F2E1DD]">
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.45 }}
        className="w-full max-w-[370px] flex flex-col items-center"
      >
        {/* Decorative Mini Envelope at the Top with protruding paper (as shown in reference) */}
        <div className="w-56 h-32 relative mb-6 rounded-xl bg-[#D8AE87] shadow-md overflow-hidden border border-[#BD8E65]/30">
          <div className="absolute inset-x-4 top-2 h-20 bg-[#FFF9F2] rounded-t-lg shadow-sm border border-[#D8AE87]/40 flex items-center justify-center">
            <span className="text-2xl animate-pulse">💌</span>
          </div>
          {/* Triangular flap fold */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              clipPath: 'polygon(0 0, 50% 50%, 100% 0, 100% 100%, 0 100%)',
              backgroundColor: '#D8AE87',
            }}
          />
        </div>

        {/* Heading: ENTER THE SECRET WORD */}
        <h2 className="text-sm font-semibold tracking-widest text-warmBrown/90 uppercase mb-5 font-sans text-center">
          {COUPLE_CONFIG.secretGate.heading}
        </h2>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-4">
          <div className="w-full relative">
            <input
              type="text"
              value={inputWord}
              onChange={(e) => {
                setInputWord(e.target.value);
                if (error) setError('');
              }}
              placeholder={COUPLE_CONFIG.secretGate.placeholder}
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck="false"
              className="w-full py-3.5 px-6 rounded-full bg-[#FFF9F2] border border-[#D8AE87]/40 text-warmBrown text-center text-lg placeholder:text-warmBrown/40 placeholder:text-base focus:outline-none focus:ring-2 focus:ring-roseAccent/50 focus:border-roseAccent shadow-soft transition-all"
            />
          </div>

          {/* Friendly Error Display */}
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs sm:text-sm text-[#C95D58] font-arabic font-medium text-center px-3"
            >
              {error}
            </motion.p>
          )}

          {/* Rose Open Gift Button */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            className="w-full py-3.5 px-6 rounded-full bg-[#D88C88] hover:bg-[#CF7E7A] text-white font-arabic font-semibold text-base shadow-md border border-[#D88C88]/40 flex items-center justify-center gap-2 transition-all disabled:opacity-75"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                <span>جاري التحقق...</span>
              </span>
            ) : (
              <span>{COUPLE_CONFIG.secretGate.buttonText}</span>
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
