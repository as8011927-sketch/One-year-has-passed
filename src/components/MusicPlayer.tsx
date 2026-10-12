'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Heart, ExternalLink, ChevronDown, X, Music } from 'lucide-react';
import { COUPLE_CONFIG } from '@/config/content';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [isPillVisible, setIsPillVisible] = useState(true);
  const [hasStartedPlayback, setHasStartedPlayback] = useState(false);

  // Close modal with ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && expanded) {
        setExpanded(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [expanded]);

  const handleOpenPlayer = () => {
    setExpanded(true);
    setHasStartedPlayback(true);
  };

  const handleCloseModal = () => {
    setExpanded(false);
  };

  const handleTogglePillVisibility = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPillVisible(false);
  };

  return (
    <>
      {/* 
        Persistent Fullscreen Modal for Music Player:
        KEPT MOUNTED IN DOM so the SoundCloud iframe NEVER reloads or stops playing audio.
        When expanded = false: pointer-events-none and opacity-0 allow complete interaction with the page behind it.
        When expanded = true: centered modal with dark backdrop and clear close/minimize controls.
      */}
      <div
        className={`fixed inset-0 z-[80] flex items-center justify-center p-4 transition-all duration-300 ${
          expanded
            ? 'bg-black/65 backdrop-blur-sm opacity-100 pointer-events-auto'
            : 'bg-transparent opacity-0 pointer-events-none'
        }`}
        onClick={handleCloseModal}
      >
        {/* Modal Card */}
        <div
          className={`relative w-full max-w-[360px] bg-[#FFF9F2] rounded-3xl p-5 shadow-2xl border border-[#D8AE87]/40 flex flex-col gap-3.5 transition-all duration-300 ${
            expanded ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header with Title and Close Button */}
          <div className="flex items-center justify-between pb-2 border-b border-[#D8AE87]/20">
            <button
              type="button"
              onClick={handleCloseModal}
              className="w-8 h-8 rounded-full bg-[#FAF3EB] hover:bg-[#F2E1DD] active:scale-95 text-warmBrown flex items-center justify-center transition-all shadow-xs"
              aria-label="إغلاق المشغل"
            >
              <X size={18} />
            </button>

            <div className="flex flex-col text-right">
              <span className="text-xs font-bold text-warmBrown font-arabic">
                {COUPLE_CONFIG.music.arabicName}
              </span>
              <span className="text-[10px] text-warmBrown/60 font-sans">
                {COUPLE_CONFIG.music.artist}
              </span>
            </div>
          </div>

          {/* Embedded SoundCloud Player */}
          <div className="w-full h-[120px] rounded-2xl overflow-hidden bg-[#FAF3EB] border border-[#D8AE87]/30 shadow-inner">
            <iframe
              width="100%"
              height="120"
              scrolling="no"
              frameBorder="no"
              allow="autoplay"
              src={COUPLE_CONFIG.music.soundCloudEmbedUrl}
              className="w-full h-full border-0"
              title="DO RE MI - SoundCloud Player"
              onLoad={() => setIsPlaying(true)}
            />
          </div>

          {/* Tip */}
          <div className="text-[11px] text-warmBrown/80 font-arabic bg-[#FAF3EB] p-2.5 rounded-xl text-center flex items-center justify-center gap-1.5 border border-[#D8AE87]/20">
            <Music size={13} className="text-roseAccent shrink-0" />
            <span>شغّل الأغنية ثم اضغط <b>تصغير</b> وستستمر في العمل أثناء تصفحك ❤️</span>
          </div>

          {/* Minimize / Continue in Background Button */}
          <button
            type="button"
            onClick={handleCloseModal}
            className="w-full py-2.5 px-4 rounded-full bg-[#FAF3EB] hover:bg-[#F2E1DD] active:scale-98 text-warmBrown text-xs font-arabic font-bold flex items-center justify-center gap-2 transition-all border border-[#D8AE87]/30 shadow-xs"
          >
            <ChevronDown size={16} />
            <span>تصغير والمتابعة في الخلفية 🎵</span>
          </button>

          {/* Fallback Direct Link */}
          <a
            href={COUPLE_CONFIG.music.soundCloudUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2 px-3 rounded-full bg-[#D88C88] hover:bg-[#CF7E7A] text-white text-xs font-arabic font-bold flex items-center justify-center gap-1.5 shadow-xs transition-transform active:scale-98"
          >
            <span>فتح الرابط المباشر على SoundCloud</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </div>

      {/* Floating Bottom Pill Player */}
      {isPillVisible ? (
        <div className="fixed bottom-4 left-0 right-0 z-40 flex justify-center px-4 pointer-events-none pb-safe">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="pointer-events-auto bg-[#FFF9F2]/95 backdrop-blur-md rounded-full px-4 py-2.5 shadow-card border border-[#D8AE87]/40 flex items-center justify-between gap-3 w-full max-w-[360px]"
          >
            {/* Play/Open Button */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleOpenPlayer}
                className="w-9 h-9 rounded-full flex items-center justify-center text-white shadow-xs transition-transform active:scale-90 bg-[#D88C88] hover:bg-[#CF7E7A]"
                aria-label="تشغيل / فتح المشغل"
              >
                {hasStartedPlayback ? <Pause size={15} /> : <Play size={15} className="ml-0.5" />}
              </button>

              {/* Audio Wave Visualizer Dots */}
              <div className="flex items-center gap-1 h-3 px-1">
                {[0, 1, 2, 3].map((dot) => (
                  <motion.span
                    key={dot}
                    animate={
                      hasStartedPlayback
                        ? {
                            height: ['4px', '14px', '4px'],
                            backgroundColor: ['#D8AE87', '#D88C88', '#D8AE87'],
                          }
                        : { height: '4px', backgroundColor: '#D8AE87' }
                    }
                    transition={{
                      duration: 0.8,
                      repeat: hasStartedPlayback ? Infinity : 0,
                      delay: dot * 0.18,
                      ease: 'easeInOut',
                    }}
                    className="w-1 rounded-full bg-roseAccent inline-block"
                  />
                ))}
              </div>
            </div>

            {/* Song Info (Click to open) */}
            <div
              className="flex items-center gap-2 cursor-pointer select-none flex-1 justify-end"
              onClick={handleOpenPlayer}
              title="اضغط لفتح المشغل"
            >
              <div className="flex flex-col text-right">
                <span className="text-xs font-bold text-warmBrown font-arabic leading-tight">
                  {COUPLE_CONFIG.music.arabicName}
                </span>
                <span className="text-[10px] text-warmBrown/60 font-sans leading-tight mt-0.5">
                  {hasStartedPlayback ? 'شغالة في الخلفية 🎵 (اضغط للفتح)' : COUPLE_CONFIG.music.artist}
                </span>
              </div>

              <div className="w-7 h-7 rounded-full bg-[#F3CED0] flex items-center justify-center text-roseAccent">
                <Heart size={13} className="fill-roseAccent" />
              </div>
            </div>

            {/* Close Pill Button (To completely dismiss the bar if user wants full screen clean view) */}
            <button
              type="button"
              onClick={handleTogglePillVisibility}
              className="p-1 rounded-full text-warmBrown/40 hover:text-warmBrown hover:bg-[#FAF3EB] transition-colors"
              title="إخفاء الشريط"
              aria-label="إخفاء شريط الموسيقى"
            >
              <X size={15} />
            </button>
          </motion.div>
        </div>
      ) : (
        /* Minimized Floating Bubble when user closes the pill completely */
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={() => setIsPillVisible(true)}
          className="fixed bottom-4 right-4 z-40 w-11 h-11 rounded-full bg-[#FFF9F2] shadow-card border border-[#D8AE87]/40 flex items-center justify-center text-roseAccent hover:bg-[#FAF3EB] active:scale-95 transition-all"
          title="إظهار مشغل الموسيقى"
          aria-label="إظهار مشغل الموسيقى"
        >
          <Music size={18} />
        </motion.button>
      )}
    </>
  );
}
