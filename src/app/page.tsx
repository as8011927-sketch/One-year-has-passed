'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import FloatingHearts from '@/components/FloatingHearts';
import EnvelopeIntro from '@/components/EnvelopeIntro';
import LoveLetter from '@/components/LoveLetter';
import SecretWordGate from '@/components/SecretWordGate';
import SecondLetter from '@/components/SecondLetter';
import RelationshipCounter from '@/components/RelationshipCounter';
import MilestonesTimeline from '@/components/MilestonesTimeline';
import FavoriteMessages from '@/components/FavoriteMessages';
import SurpriseGift from '@/components/SurpriseGift';
import MemoriesGallery from '@/components/MemoriesGallery';
import MusicPlayer from '@/components/MusicPlayer';
import PWAInstallPrompt from '@/components/PWAInstallPrompt';

type Step = 'envelope' | 'love_letter' | 'secret_gate' | 'second_letter' | 'main';

export default function Home() {
  const [currentStep, setCurrentStep] = useState<Step>('envelope');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Check if session already verified
    fetch('/api/verify-secret')
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) {
          // If already authenticated, user can either stay on envelope or jump to main if requested
          // For the magical gift experience, we let them open the letter, or if query param ?skip=1 is present
          const urlParams = new URLSearchParams(window.location.search);
          if (urlParams.get('unlocked') === 'true') {
            setCurrentStep('main');
          }
        }
      })
      .catch(() => {});
  }, []);

  const scrollToMemories = () => {
    const el = document.getElementById('memories-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen bg-[#F2E1DD] text-warmBrown relative selection:bg-[#D88C88] selection:text-white pb-20">
      {/* Floating Hearts Background */}
      <FloatingHearts count={14} />

      <div className="mobile-container relative z-10">
        <AnimatePresence mode="wait">
          {currentStep === 'envelope' && (
            <motion.div
              key="envelope"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <EnvelopeIntro onOpen={() => setCurrentStep('love_letter')} />
            </motion.div>
          )}

          {currentStep === 'love_letter' && (
            <motion.div
              key="love_letter"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
            >
              <LoveLetter onContinue={() => setCurrentStep('secret_gate')} />
            </motion.div>
          )}

          {currentStep === 'secret_gate' && (
            <motion.div
              key="secret_gate"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <SecretWordGate onSuccess={() => setCurrentStep('second_letter')} />
            </motion.div>
          )}

          {currentStep === 'second_letter' && (
            <motion.div
              key="second_letter"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
            >
              <SecondLetter onEnterMain={() => setCurrentStep('main')} />
            </motion.div>
          )}

          {currentStep === 'main' && (
            <motion.div
              key="main"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col"
            >
              {/* Top Relationship Header and dynamic live counter */}
              <RelationshipCounter />

              {/* Special Milestones */}
              <MilestonesTimeline />

              {/* Favorite Messages */}
              <FavoriteMessages />

              {/* Hidden Gift Surprise */}
              <SurpriseGift onScrollToMemories={scrollToMemories} />

              {/* Memories Timeline */}
              <MemoriesGallery />

              {/* PWA Install discrete prompt */}
              <PWAInstallPrompt />

              {/* Replay Intro Link at Bottom */}
              <div className="py-8 flex flex-col items-center justify-center text-center">
                <button
                  onClick={() => setCurrentStep('envelope')}
                  className="text-xs text-warmBrown/60 hover:text-warmBrown underline font-arabic transition-colors"
                >
                  إعادة فتح الظرف من البداية 💌
                </button>
                <p className="text-[11px] text-warmBrown/40 font-arabic mt-2">
                  صُنع بكل حب من زياد لحبيبة ❤️
                </p>
              </div>

              {/* Floating Music Player */}
              <MusicPlayer />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
