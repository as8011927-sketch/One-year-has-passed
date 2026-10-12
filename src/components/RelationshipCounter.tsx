'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { COUPLE_CONFIG } from '@/config/content';

interface TimeElapsed {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isFuture: boolean;
}

export default function RelationshipCounter() {
  const [timeElapsed, setTimeElapsed] = useState<TimeElapsed>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isFuture: false,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Explicit date: 6 November 2025, 00:00:00 local time
    const startTimestamp = new Date(2025, 10, 6, 0, 0, 0).getTime(); // Note: month 10 is November (0-indexed)

    const updateCounter = () => {
      const now = Date.now();
      const diff = now - startTimestamp;

      if (diff >= 0) {
        const totalSeconds = Math.floor(diff / 1000);
        const days = Math.floor(totalSeconds / 86400);
        const hours = Math.floor((totalSeconds % 86400) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        setTimeElapsed({ days, hours, minutes, seconds, isFuture: false });
      } else {
        // If current clock happens to be before 6 Nov 2025, show countdown until start
        const totalSeconds = Math.floor(Math.abs(diff) / 1000);
        const days = Math.floor(totalSeconds / 86400);
        const hours = Math.floor((totalSeconds % 86400) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        setTimeElapsed({ days, hours, minutes, seconds, isFuture: true });
      }
    };

    updateCounter();
    const interval = setInterval(updateCounter, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => {
    return num.toString().padStart(2, '0');
  };

  return (
    <div className="w-full flex flex-col items-center pt-8 pb-4 px-4 text-center">
      {/* Top Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-6 flex flex-col items-center"
      >
        <span className="text-3xl sm:text-4xl font-script text-warmBrown tracking-wider">
          {COUPLE_CONFIG.headerScript}
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-warmBrown mt-1 flex items-center justify-center gap-2 font-arabic">
          {COUPLE_CONFIG.coupleTitle}
        </h1>
        <p className="text-xs sm:text-sm text-warmBrown/75 font-arabic mt-1">
          {COUPLE_CONFIG.subTitle}
        </p>
      </motion.div>

      {/* Anniversary Counter Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="w-full max-w-[390px] bg-[#FFF9F2] rounded-3xl p-6 shadow-card border border-[#D8AE87]/25 flex flex-col items-center"
      >
        <div className="flex items-center justify-center gap-2 mb-5">
          <span className="text-roseAccent text-lg">💕</span>
          <h2 className="text-lg font-bold text-warmBrown font-arabic tracking-wide">
            {COUPLE_CONFIG.counterHeading}
          </h2>
          <span className="text-roseAccent text-lg">💕</span>
        </div>

        {/* 4 Counter Badges Grid */}
        <div className="grid grid-cols-4 gap-2.5 sm:gap-3 w-full mb-6">
          {/* Days */}
          <div className="bg-[#FAF3EB] border border-[#D8AE87]/20 rounded-2xl py-3 px-1 flex flex-col items-center justify-center shadow-xs">
            <span className="text-2xl sm:text-3xl font-extrabold text-warmBrown font-sans tabular-nums leading-none">
              {mounted ? timeElapsed.days : '--'}
            </span>
            <span className="text-[11px] font-arabic font-medium text-warmBrown/70 mt-1.5">
              يوم
            </span>
          </div>

          {/* Hours */}
          <div className="bg-[#FAF3EB] border border-[#D8AE87]/20 rounded-2xl py-3 px-1 flex flex-col items-center justify-center shadow-xs">
            <span className="text-2xl sm:text-3xl font-extrabold text-warmBrown font-sans tabular-nums leading-none">
              {mounted ? formatNumber(timeElapsed.hours) : '--'}
            </span>
            <span className="text-[11px] font-arabic font-medium text-warmBrown/70 mt-1.5">
              ساعة
            </span>
          </div>

          {/* Minutes */}
          <div className="bg-[#FAF3EB] border border-[#D8AE87]/20 rounded-2xl py-3 px-1 flex flex-col items-center justify-center shadow-xs">
            <span className="text-2xl sm:text-3xl font-extrabold text-warmBrown font-sans tabular-nums leading-none">
              {mounted ? formatNumber(timeElapsed.minutes) : '--'}
            </span>
            <span className="text-[11px] font-arabic font-medium text-warmBrown/70 mt-1.5">
              دقيقة
            </span>
          </div>

          {/* Seconds */}
          <div className="bg-[#FAF3EB] border border-[#D8AE87]/20 rounded-2xl py-3 px-1 flex flex-col items-center justify-center shadow-xs">
            <span className="text-2xl sm:text-3xl font-extrabold text-roseAccent font-sans tabular-nums leading-none animate-pulse">
              {mounted ? formatNumber(timeElapsed.seconds) : '--'}
            </span>
            <span className="text-[11px] font-arabic font-medium text-warmBrown/70 mt-1.5">
              ثانية
            </span>
          </div>
        </div>

        {/* Footer Text */}
        <p className="text-xs sm:text-sm text-warmBrown/80 font-arabic font-medium text-center">
          {COUPLE_CONFIG.counterFooter}
        </p>
      </motion.div>
    </div>
  );
}
