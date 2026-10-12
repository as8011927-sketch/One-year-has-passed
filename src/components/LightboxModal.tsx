'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { MemoryItem } from '@/config/content';

interface LightboxModalProps {
  memory: MemoryItem | null;
  allMemories: MemoryItem[];
  isOpen: boolean;
  onClose: () => void;
  onSelect: (item: MemoryItem) => void;
}

export default function LightboxModal({
  memory,
  allMemories,
  isOpen,
  onClose,
  onSelect,
}: LightboxModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen || !memory) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, memory]);

  if (!isOpen || !memory) return null;

  const currentIndex = allMemories.findIndex((m) => m.id === memory.id);

  const handleNext = () => {
    if (currentIndex < allMemories.length - 1) {
      onSelect(allMemories[currentIndex + 1]);
    } else {
      onSelect(allMemories[0]);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      onSelect(allMemories[currentIndex - 1]);
    } else {
      onSelect(allMemories[allMemories.length - 1]);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md">
        {/* Backdrop click */}
        <div className="absolute inset-0" onClick={onClose} />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-55 w-11 h-11 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all backdrop-blur-sm"
          aria-label="Close Lightbox"
        >
          <X size={22} />
        </button>

        {/* Previous button */}
        <button
          onClick={handlePrev}
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-55 w-11 h-11 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all backdrop-blur-sm"
          aria-label="Previous Memory"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Next button */}
        <button
          onClick={handleNext}
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-55 w-11 h-11 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all backdrop-blur-sm"
          aria-label="Next Memory"
        >
          <ChevronRight size={24} />
        </button>

        {/* Modal Card */}
        <motion.div
          key={memory.id}
          initial={{ opacity: 0, scale: 0.93 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.93 }}
          transition={{ duration: 0.3 }}
          className="relative z-52 max-w-[420px] w-full max-h-[90vh] bg-[#FFF9F2] rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-[#D8AE87]/40"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Photo Container */}
          <div className="relative w-full aspect-[3/4] bg-[#F2E1DD] flex items-center justify-center overflow-hidden">
            <img
              src={memory.image}
              alt={memory.title}
              className="w-full h-full object-contain sm:object-cover"
              onError={(e) => {
                // Graceful fallback to lovely placeholder
                (e.target as HTMLImageElement).src = '/images/memories/memory-1.jpg';
              }}
            />
            {memory.favorite && (
              <div className="absolute top-3 left-3 bg-[#D88C88] text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-sm">
                <Heart size={12} fill="white" />
                <span>المفضلة</span>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="p-5 flex flex-col text-right">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-roseAccent font-semibold font-sans">
                {memory.date || 'ذكرى خاصة'}
              </span>
              <span className="text-xs text-warmBrown/50 font-sans">
                {currentIndex + 1} / {allMemories.length}
              </span>
            </div>
            <h3 className="text-base font-bold text-warmBrown font-arabic leading-snug">
              {memory.title}
            </h3>
            {memory.caption && (
              <p className="text-xs sm:text-sm text-warmBrown/75 font-arabic mt-1.5 leading-relaxed">
                {memory.caption}
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
