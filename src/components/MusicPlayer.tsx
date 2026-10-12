'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Music, ExternalLink, ChevronUp, ChevronDown } from 'lucide-react';
import { COUPLE_CONFIG } from '@/config/content';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [audioFallbackActive, setAudioFallbackActive] = useState(false);

  const audioContextRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  // Play gentle romantic chime/melody chord progression via Web Audio API if external player fails or as ambient harmony
  const startRomanticSynth = () => {
    try {
      if (!audioContextRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioContextRef.current = new AudioCtx();
      }

      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }

      const ctx = audioContextRef.current;
      const notes = [261.63, 329.63, 392.00, 523.25, 440.00, 349.23]; // C, E, G, C, A, F
      let index = 0;

      intervalRef.current = setInterval(() => {
        if (!isPlaying || isMuted) return;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(notes[index % notes.length], ctx.currentTime);

        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.8);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 1.8);

        index++;
      }, 1200);

      setAudioFallbackActive(true);
    } catch (e) {
      console.warn('Web Audio Ambient not supported', e);
    }
  };

  const stopRomanticSynth = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const togglePlay = () => {
    const nextState = !isPlaying;
    setIsPlaying(nextState);

    // Communicate with SoundCloud Widget if accessible via iframe postMessage
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ method: nextState ? 'play' : 'pause' }),
        '*'
      );
    }

    if (nextState) {
      startRomanticSynth();
    } else {
      stopRomanticSynth();
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  useEffect(() => {
    return () => {
      stopRomanticSynth();
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <>
      {/* Floating Bottom Pill Music Player (as in reference video) */}
      <div className="fixed bottom-4 left-0 right-0 z-40 flex justify-center px-4 pointer-events-none">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="pointer-events-auto bg-[#FFF9F2]/95 backdrop-blur-md rounded-full px-4 py-2.5 shadow-card border border-[#D8AE87]/35 flex items-center justify-between gap-3 w-full max-w-[340px]"
        >
          {/* Left: Play/Pause button and wave visualizer */}
          <div className="flex items-center gap-2">
            <button
              onClick={togglePlay}
              className="w-8 h-8 rounded-full bg-[#D88C88] hover:bg-[#CF7E7A] text-white flex items-center justify-center shadow-xs transition-transform active:scale-90"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
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

          {/* Center / Right: Song Title & Note */}
          <div
            className="flex items-center gap-1.5 cursor-pointer select-none"
            onClick={() => setExpanded(!expanded)}
          >
            <div className="flex flex-col text-right">
              <span className="text-xs font-bold text-warmBrown font-arabic leading-none">
                {COUPLE_CONFIG.music.arabicName}
              </span>
              <span className="text-[10px] text-warmBrown/60 font-sans leading-none mt-0.5">
                {COUPLE_CONFIG.music.artist}
              </span>
            </div>

            <div className="w-6 h-6 rounded-full bg-[#F3CED0] flex items-center justify-center text-warmBrown/80">
              <Music size={12} />
            </div>

            <div className="text-warmBrown/50 hover:text-warmBrown ml-0.5">
              {expanded ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Expanded SoundCloud Drawer / Info */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-20 left-0 right-0 z-40 flex justify-center px-4"
          >
            <div className="bg-[#FFF9F2] rounded-3xl p-4 shadow-2xl border border-[#D8AE87]/40 w-full max-w-[340px] flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-warmBrown font-arabic">
                  {COUPLE_CONFIG.music.title}
                </span>
                <button
                  onClick={toggleMute}
                  className="text-warmBrown/70 hover:text-warmBrown p-1"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>
              </div>

              {/* SoundCloud Embed Widget */}
              <div className="w-full h-20 rounded-xl overflow-hidden bg-blush-100 border border-[#D8AE87]/20">
                <iframe
                  ref={iframeRef}
                  width="100%"
                  height="80"
                  scrolling="no"
                  frameBorder="no"
                  allow="autoplay"
                  src={`https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/mohammed-saeed-official/do-re-mi&color=%23d88c88&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false`}
                  className="w-full h-full"
                />
              </div>

              {/* Direct Link to SoundCloud Track */}
              <a
                href={COUPLE_CONFIG.music.soundCloudUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-roseAccent hover:underline flex items-center justify-center gap-1 font-arabic"
              >
                <span>الاستماع على SoundCloud مباشرة</span>
                <ExternalLink size={11} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
