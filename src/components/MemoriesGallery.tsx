'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Maximize2 } from 'lucide-react';
import { COUPLE_CONFIG, MemoryItem } from '@/config/content';
import LightboxModal from './LightboxModal';

interface MemoriesGalleryProps {
  memories?: MemoryItem[];
}

export default function MemoriesGallery({
  memories = COUPLE_CONFIG.memories,
}: MemoriesGalleryProps) {
  const [selectedMemory, setSelectedMemory] = useState<MemoryItem | null>(null);
  const [likes, setLikes] = useState<Record<string, number>>({});

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  return (
    <div id="memories-section" className="w-full flex flex-col items-center py-8 px-4">
      <div className="w-full max-w-[390px] flex flex-col">
        {/* Section Heading */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="text-xl">🩵</span>
          <h2 className="text-xl sm:text-2xl font-bold text-warmBrown font-sans tracking-wide flex items-center gap-2">
            <span>Our Memories</span>
            <span className="text-roseAccent">❤️</span>
          </h2>
          <span className="text-xl">🩵</span>
        </div>

        {/* Memories Cards Grid / Vertical Flow */}
        <div className="flex flex-col gap-6">
          {memories.map((item, index) => {
            // Alternate between Polaroid and Full-card style
            const isPolaroid = index % 2 === 0;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: 0.1 }}
                onClick={() => setSelectedMemory(item)}
                className={`w-full bg-[#FFF9F2] rounded-3xl p-4 sm:p-5 shadow-card border border-[#D8AE87]/25 cursor-pointer relative overflow-hidden group transition-transform hover:-translate-y-1 ${
                  isPolaroid ? 'pb-5' : ''
                }`}
              >
                {/* Photo frame */}
                <div
                  className={`relative w-full rounded-2xl overflow-hidden bg-[#FAF3EB] border border-[#D8AE87]/20 ${
                    item.aspectRatio === 'square'
                      ? 'aspect-square'
                      : item.aspectRatio === 'landscape'
                      ? 'aspect-[4/3]'
                      : 'aspect-[3/4]'
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/memories/memory-1.jpg';
                    }}
                  />

                  {/* Top Badges */}
                  <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
                    {item.date ? (
                      <span className="bg-[#FFF9F2]/90 backdrop-blur-xs text-warmBrown text-[11px] font-sans font-semibold px-2.5 py-1 rounded-full shadow-xs">
                        {item.date}
                      </span>
                    ) : <div />}

                    <div className="w-8 h-8 rounded-full bg-[#FFF9F2]/90 backdrop-blur-xs flex items-center justify-center text-warmBrown/70 shadow-xs group-hover:text-roseAccent transition-colors">
                      <Maximize2 size={14} />
                    </div>
                  </div>
                </div>

                {/* Caption / Title */}
                <div className="mt-4 flex flex-col text-right">
                  <div className="flex items-start justify-between gap-2">
                    <button
                      onClick={(e) => handleLike(item.id, e)}
                      className="flex items-center gap-1 text-xs text-roseAccent bg-[#F2E1DD]/80 hover:bg-[#F2E1DD] px-2.5 py-1 rounded-full transition-transform active:scale-90"
                    >
                      <Heart
                        size={14}
                        className={likes[item.id] ? 'fill-roseAccent' : ''}
                      />
                      <span className="font-sans font-semibold tabular-nums">
                        {(likes[item.id] || 0) + 1}
                      </span>
                    </button>

                    <h3 className="text-base font-bold text-warmBrown font-arabic leading-snug">
                      {item.title}
                    </h3>
                  </div>

                  {item.caption && (
                    <p className="text-xs sm:text-sm text-warmBrown/75 font-arabic mt-2 leading-relaxed">
                      {item.caption}
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        memory={selectedMemory}
        allMemories={memories}
        isOpen={Boolean(selectedMemory)}
        onClose={() => setSelectedMemory(null)}
        onSelect={(mem) => setSelectedMemory(mem)}
      />
    </div>
  );
}
