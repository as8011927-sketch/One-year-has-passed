'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Music, Heart, AlertCircle, Loader2 } from 'lucide-react';
import { COUPLE_CONFIG } from '@/config/content';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Single singleton HTML5 Audio instance
    const audio = new Audio();
    audio.src = COUPLE_CONFIG.music.audioSrc || '/audio/do-re-mi.mp3';
    audio.preload = 'metadata';
    audioRef.current = audio;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
      setIsLoading(false);
      setHasError(false);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const handleWaiting = () => {
      setIsLoading(true);
    };

    const handlePlaying = () => {
      setIsLoading(false);
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleError = () => {
      setIsLoading(false);
      setHasError(true);
      console.warn('Audio playback error for /audio/do-re-mi.mp3');
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('waiting', handleWaiting);
    audio.addEventListener('playing', handlePlaying);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('error', handleError);

    return () => {
      audio.pause();
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('waiting', handleWaiting);
      audio.removeEventListener('playing', handlePlaying);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('error', handleError);
      audioRef.current = null;
    };
  }, []);

  const togglePlay = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        setIsLoading(true);
        await audioRef.current.play();
        setIsPlaying(true);
        setIsLoading(false);
        setHasError(false);
      } catch (err) {
        setIsLoading(false);
        setHasError(true);
        console.error('Playback failed:', err);
      }
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    const nextMute = !isMuted;
    audioRef.current.muted = nextMute;
    setIsMuted(nextMute);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const seekTime = parseFloat(e.target.value);
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <>
      {/* Small Floating Player matching warm romantic theme */}
      <div className="fixed bottom-4 left-0 right-0 z-40 flex justify-center px-4 pointer-events-none">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="pointer-events-auto bg-[#FFF9F2]/95 backdrop-blur-md rounded-full px-4 py-2.5 shadow-card border border-[#D8AE87]/35 flex items-center justify-between gap-3 w-full max-w-[360px]"
        >
          {/* Play/Pause Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={togglePlay}
              disabled={hasError}
              className={`w-9 h-9 rounded-full flex items-center justify-center text-white shadow-xs transition-transform active:scale-90 ${
                hasError
                  ? 'bg-warmBrown/40 cursor-not-allowed'
                  : 'bg-[#D88C88] hover:bg-[#CF7E7A]'
              }`}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isLoading ? (
                <Loader2 size={15} className="animate-spin" />
              ) : isPlaying ? (
                <Pause size={15} />
              ) : (
                <Play size={15} className="ml-0.5" />
              )}
            </button>

            {/* Audio Wave Visualizer Dots */}
            <div className="flex items-center gap-1 h-3 px-1">
              {[0, 1, 2, 3].map((dot) => (
                <motion.span
                  key={dot}
                  animate={
                    isPlaying
                      ? {
                          height: ['4px', '14px', '4px'],
                          backgroundColor: ['#D8AE87', '#D88C88', '#D8AE87'],
                        }
                      : { height: '4px', backgroundColor: '#D8AE87' }
                  }
                  transition={{
                    duration: 0.8,
                    repeat: isPlaying ? Infinity : 0,
                    delay: dot * 0.18,
                    ease: 'easeInOut',
                  }}
                  className="w-1 rounded-full bg-roseAccent inline-block"
                />
              ))}
            </div>
          </div>

          {/* Song Info & Expand Drawer */}
          <div
            className="flex items-center gap-2 cursor-pointer select-none flex-1 justify-end"
            onClick={() => setExpanded(!expanded)}
          >
            <div className="flex flex-col text-right">
              <span className="text-xs font-bold text-warmBrown font-arabic leading-tight">
                {COUPLE_CONFIG.music.arabicName}
              </span>
              <span className="text-[10px] text-warmBrown/60 font-sans leading-tight mt-0.5">
                {COUPLE_CONFIG.music.artist}
              </span>
            </div>

            <div className="w-7 h-7 rounded-full bg-[#F3CED0] flex items-center justify-center text-roseAccent">
              <Heart size={13} className="fill-roseAccent" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Expanded Progress & Seeking Card */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-20 left-0 right-0 z-40 flex justify-center px-4"
          >
            <div className="bg-[#FFF9F2] rounded-3xl p-4 shadow-2xl border border-[#D8AE87]/40 w-full max-w-[360px] flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex flex-col text-right">
                  <span className="text-xs font-bold text-warmBrown font-arabic">
                    {COUPLE_CONFIG.music.title}
                  </span>
                  <span className="text-[10px] text-warmBrown/60 font-sans">
                    {COUPLE_CONFIG.music.artist}
                  </span>
                </div>
                <button
                  onClick={toggleMute}
                  className="text-warmBrown/70 hover:text-warmBrown p-1.5 rounded-full hover:bg-[#FAF3EB]"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>
              </div>

              {/* Progress Slider */}
              <div className="flex flex-col gap-1 w-full">
                <input
                  type="range"
                  min={0}
                  max={duration || 100}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-1.5 bg-[#FAF3EB] rounded-lg appearance-none cursor-pointer accent-roseAccent"
                />
                <div className="flex items-center justify-between text-[10px] font-sans text-warmBrown/60">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {hasError && (
                <div className="text-[11px] text-[#C95D58] font-arabic flex items-center justify-center gap-1">
                  <AlertCircle size={12} />
                  <span>تعذر تشغيل الملف الصوتي حالياً</span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
