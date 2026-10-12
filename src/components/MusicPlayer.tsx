'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Heart, AlertCircle, Loader2, ExternalLink } from 'lucide-react';
import { COUPLE_CONFIG } from '@/config/content';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLocalAudio, setHasLocalAudio] = useState(false);
  const [localAudioError, setLocalAudioError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isSeekingRef = useRef(false);

  useEffect(() => {
    // Singleton HTML5 Audio instance with preload="metadata"
    const audio = new Audio();
    audio.preload = 'metadata';
    audio.src = COUPLE_CONFIG.music.audioSrc || '/audio/do-re-mi.mp3';
    audioRef.current = audio;

    const handleLoadedMetadata = () => {
      const dur = audio.duration;
      if (!isNaN(dur) && isFinite(dur) && dur > 0) {
        setDuration(dur);
        setHasLocalAudio(true);
        setLocalAudioError(null);
      }
      setIsLoading(false);
    };

    const handleCanPlay = () => {
      setIsLoading(false);
      setHasLocalAudio(true);
    };

    const handleTimeUpdate = () => {
      if (!isSeekingRef.current) {
        setCurrentTime(audio.currentTime);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      audio.currentTime = 0;
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
      setIsPlaying(false);
      setHasLocalAudio(false);

      const err = audio.error;
      let msg = 'تعذر تشغيل الملف الصوتي حالياً';
      if (err) {
        switch (err.code) {
          case 1:
            msg = 'تم إلغاء تشغيل الصوت';
            break;
          case 2:
            msg = 'خطأ في شبكة الاتصال أثناء تحميل الصوت';
            break;
          case 3:
            msg = 'خطأ في فك ترميز الملف الصوتي';
            break;
          case 4:
            msg = 'الملف الصوتي الأصلي غير متوفر محلياً';
            break;
        }
      }
      setLocalAudioError(msg);
      console.warn('Local audio unavailable or failed to load:', {
        src: audio.src,
        errorCode: err?.code,
        errorMessage: err?.message,
      });
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('waiting', handleWaiting);
    audio.addEventListener('playing', handlePlaying);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('error', handleError);

    return () => {
      audio.pause();
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('waiting', handleWaiting);
      audio.removeEventListener('playing', handlePlaying);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('error', handleError);
      audio.src = '';
      audioRef.current = null;
    };
  }, []);

  const togglePlay = async () => {
    // If local audio is not available or errored, expand the player to reveal the SoundCloud fallback
    if (!hasLocalAudio || !audioRef.current) {
      setExpanded(true);
      return;
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        setIsLoading(true);
        await audioRef.current.play();
        // State is updated accurately via handlePlaying event
      } catch (err: unknown) {
        setIsLoading(false);
        setIsPlaying(false);
        const error = err as Error;
        if (error?.name !== 'AbortError') {
          console.warn('Playback request failed:', err);
          setLocalAudioError('تعذر بدء تشغيل الملف الصوتي');
          setExpanded(true);
        }
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

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current || duration <= 0) return;
    const seekTime = parseFloat(e.target.value);
    isSeekingRef.current = true;
    setCurrentTime(seekTime);
  };

  const handleSeekCommit = (e: React.MouseEvent<HTMLInputElement> | React.TouchEvent<HTMLInputElement>) => {
    if (!audioRef.current || duration <= 0) return;
    const target = e.currentTarget;
    const seekTime = parseFloat(target.value);
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
    isSeekingRef.current = false;
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <>
      {/* Floating Bottom Pill Player matching warm romantic theme */}
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
              className="w-9 h-9 rounded-full flex items-center justify-center text-white shadow-xs transition-transform active:scale-90 bg-[#D88C88] hover:bg-[#CF7E7A]"
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

      {/* Expanded Progress & Seeking / Fallback Card */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-20 left-0 right-0 z-40 flex justify-center px-4"
          >
            <div className="bg-[#FFF9F2] rounded-3xl p-4 shadow-2xl border border-[#D8AE87]/40 w-full max-w-[360px] flex flex-col gap-3">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex flex-col text-right">
                  <span className="text-xs font-bold text-warmBrown font-arabic">
                    {COUPLE_CONFIG.music.title}
                  </span>
                  <span className="text-[10px] text-warmBrown/60 font-sans">
                    {COUPLE_CONFIG.music.artist}
                  </span>
                </div>
                {hasLocalAudio && (
                  <button
                    onClick={toggleMute}
                    className="text-warmBrown/70 hover:text-warmBrown p-1.5 rounded-full hover:bg-[#FAF3EB] transition-colors"
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  </button>
                )}
              </div>

              {/* Local Audio Progress Slider (When local audio file is loaded) */}
              {hasLocalAudio && (
                <div className="flex flex-col gap-1 w-full">
                  <input
                    type="range"
                    min={0}
                    max={duration || 100}
                    value={currentTime}
                    onChange={handleSeekChange}
                    onMouseUp={handleSeekCommit}
                    onTouchEnd={handleSeekCommit}
                    className="w-full h-1.5 bg-[#FAF3EB] rounded-lg appearance-none cursor-pointer accent-roseAccent"
                  />
                  <div className="flex items-center justify-between text-[10px] font-sans text-warmBrown/60">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>
              )}

              {/* Fallback Section (When local audio file is absent or unplayable) */}
              {!hasLocalAudio && (
                <div className="flex flex-col gap-2.5 pt-1">
                  {localAudioError && (
                    <div className="text-[11px] text-[#A6635B] font-arabic flex items-center justify-center gap-1.5 bg-[#FAF3EB] py-1.5 px-3 rounded-xl border border-[#D8AE87]/20">
                      <AlertCircle size={13} className="shrink-0 text-roseAccent" />
                      <span>{localAudioError}</span>
                    </div>
                  )}

                  {/* Tested Official SoundCloud Embed */}
                  {COUPLE_CONFIG.music.soundCloudEmbedUrl && (
                    <div className="w-full h-[120px] rounded-2xl overflow-hidden bg-[#FAF3EB] border border-[#D8AE87]/25 shadow-inner">
                      <iframe
                        width="100%"
                        height="120"
                        scrolling="no"
                        frameBorder="no"
                        allow="autoplay"
                        src={COUPLE_CONFIG.music.soundCloudEmbedUrl}
                        className="w-full h-full border-0"
                        title="DO RE MI - SoundCloud Player"
                      />
                    </div>
                  )}

                  {/* Primary Fallback Link: "استمع على SoundCloud" */}
                  <a
                    href={COUPLE_CONFIG.music.soundCloudUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-3 rounded-full bg-[#D88C88] hover:bg-[#CF7E7A] text-white text-xs font-arabic font-bold flex items-center justify-center gap-1.5 shadow-xs transition-transform active:scale-98"
                  >
                    <span>استمع على SoundCloud ❤️</span>
                    <ExternalLink size={13} />
                  </a>
                </div>
              )}

              {/* If local audio is playing, still give SoundCloud link as an option */}
              {hasLocalAudio && (
                <a
                  href={COUPLE_CONFIG.music.soundCloudUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-roseAccent hover:underline flex items-center justify-center gap-1 font-arabic pt-1"
                >
                  <span>استمع على SoundCloud</span>
                  <ExternalLink size={11} />
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
