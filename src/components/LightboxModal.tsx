'use client';

import React, { useEffect, useState } from 'react';
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
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen || !memory) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, memory, allMemories]);

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

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null || touchStartY === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX;
    const deltaY = e.changedTouches[0].clientY - touchStartY;

    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    } else if (deltaY > 90 && Math.abs(deltaY) > Math.abs(deltaX)) {
      onClose();
    }

    setTouchStartX(null);
    setTouchStartY(null);
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Full Backdrop Click to close */}
        <div
          className="absolute inset-0 cursor-pointer"
          onClick={onClose}
          aria-label="إغلاق الصورة"
        />

        {/* Outer Top Close Button (Desktop & high-notch mobile fallback) */}
        <button
          onClick={onClose}
          className="fixed top-4 right-4 z-[110] w-10 h-10 rounded-full bg-white/20 hover:bg-white/35 active:scale-95 text-white flex items-center justify-center transition-all backdrop-blur-md border border-white/20 shadow-lg"
          aria-label="إغلاق الصورة"
        >
          <X size={20} />
        </button>

        {/* Modal Card */}
        <motion.div
          key={memory.id}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.94 }}
          transition={{ duration: 0.25 }}
          className="relative z-[105] max-w-[420px] w-full max-h-[92vh] bg-[#FFF9F2] rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-[#D8AE87]/40"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Photo Container */}
          <div className="relative w-full aspect-[3/4] bg-[#F2E1DD] flex items-center justify-center overflow-hidden select-none">
            <img
              src={memory.image}
              alt={memory.title}
              className="w-full h-full object-contain sm:object-cover pointer-events-none"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/images/memories/memory-1.jpg';
              }}
            />

            {/* In-Card Close Button on top-right of the photo */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-30 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 active:scale-90 text-white flex items-center justify-center backdrop-blur-md shadow-lg transition-transform border border-white/20"
              aria-label="إغلاق"
            >
              <X size={18} />
            </button>

            {/* Favorite Badge */}
            {memory.favorite && (
              <div className="absolute top-3 left-3 z-20 bg-[#D88C88] text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-md">
                <Heart size={12} fill="white" />
                <span>المفضلة</span>
              </div>
            )}

            {/* Overlaid Previous Button */}
            <button
              onClick={handlePrev}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/55 hover:bg-black/75 active:scale-90 text-white flex items-center justify-center transition-all backdrop-blur-md border border-white/20 shadow-xl"
              aria-label="الصورة السابقة"
            >
              <ChevronLeft size={22} />
            </button>

            {/* Overlaid Next Button */}
            <button
              onClick={handleNext}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/55 hover:bg-black/75 active:scale-90 text-white flex items-center justify-center transition-all backdrop-blur-md border border-white/20 shadow-xl"
              aria-label="الصورة التالية"
            >
              <ChevronRight size={22} />
            </button>
          </div>

          {/* Details & Bottom Navigation Footer */}
          <div className="p-4 sm:p-5 flex flex-col text-right">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-roseAccent font-semibold font-sans">
                {memory.date || 'ذكرى خاصة'}
              </span>
              <span className="text-xs text-warmBrown/60 font-sans font-bold">
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

            {/* Bottom Quick-Action Buttons for touch screens */}
            <div className="mt-3.5 pt-3 border-t border-[#D8AE87]/20 flex items-center justify-between gap-2">
              <button
                onClick={handlePrev}
                className="flex items-center gap-1 text-xs font-arabic font-semibold px-3 py-1.5 rounded-full bg-[#FAF3EB] hover:bg-[#F2E1DD] text-warmBrown active:scale-95 transition-all"
              >
                <ChevronLeft size={16} />
                <span>السابق</span>
              </button>

              <button
                onClick={onClose}
                className="text-[11px] font-arabic text-warmBrown/60 hover:text-warmBrown underline px-2 py-1"
              >
                إغلاق الصورة
              </button>

              <button
                onClick={handleNext}
                className="flex items-center gap-1 text-xs font-arabic font-semibold px-3 py-1.5 rounded-full bg-[#FAF3EB] hover:bg-[#F2E1DD] text-warmBrown active:scale-95 transition-all"
              >
                <span>التالي</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
