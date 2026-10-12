'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { COUPLE_CONFIG, FavoriteMessage } from '@/config/content';

interface FavoriteMessagesProps {
  messages?: FavoriteMessage[];
}

export default function FavoriteMessages({
  messages = COUPLE_CONFIG.messages,
}: FavoriteMessagesProps) {
  return (
    <div className="w-full flex flex-col items-center py-6 px-4">
      <div className="w-full max-w-[390px] flex flex-col">
        {/* Title: ❤️ Fav messages ❤️ */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <h2 className="text-base sm:text-lg font-bold text-warmBrown font-arabic flex items-center gap-1.5">
            <span className="text-roseAccent">❤️</span>
            <span className="font-sans font-semibold">Fav messages</span>
            <span className="text-roseAccent">❤️</span>
          </h2>
        </div>

        {/* Message Bubbles Container */}
        <div className="flex flex-col gap-3.5">
          {messages.map((msg, index) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, x: -15, y: 10 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.5,
                delay: index * 0.12,
                ease: 'easeOut',
              }}
              className="w-full bg-[#FFF9F2] rounded-3xl p-4 sm:p-5 shadow-card border border-[#D8AE87]/25 flex flex-col relative"
            >
              {/* Sender Tag */}
              <div className="self-end mb-1 text-[11px] font-sans font-semibold text-warmBrown/60">
                {msg.sender || COUPLE_CONFIG.he}
              </div>

              {/* Message Content */}
              <p className="text-sm sm:text-base text-warmBrown font-arabic font-medium leading-relaxed text-right">
                {msg.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
