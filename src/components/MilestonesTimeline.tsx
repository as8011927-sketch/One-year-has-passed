'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { COUPLE_CONFIG, Milestone } from '@/config/content';

interface MilestonesTimelineProps {
  milestones?: Milestone[];
}

export default function MilestonesTimeline({
  milestones = COUPLE_CONFIG.milestones,
}: MilestonesTimelineProps) {
  return (
    <div className="w-full flex flex-col items-center py-6 px-4">
      <div className="w-full max-w-[390px] flex flex-col">
        {/* Section Title */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <h2 className="text-base sm:text-lg font-bold text-warmBrown font-arabic flex items-center gap-2">
            <span>📆</span>
            <span>محطات قصتنا</span>
          </h2>
        </div>

        {/* Milestone Cards Container */}
        <div className="flex flex-col gap-3.5">
          {milestones.map((milestone, idx) => (
            <motion.div
              key={milestone.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="w-full bg-[#FFF9F2] rounded-3xl p-5 shadow-card border border-[#D8AE87]/25 flex flex-col items-center text-center relative overflow-hidden"
            >
              {/* Top Title */}
              <h3 className="text-base font-bold text-warmBrown font-arabic mb-3">
                {milestone.title}
              </h3>

              {/* Date Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF3EB] border border-[#D8AE87]/30 text-warmBrown text-xs sm:text-sm font-sans font-semibold tracking-wide shadow-xs">
                <Calendar size={14} className="text-roseAccent" />
                <span>{milestone.date}</span>
              </div>

              {/* Optional Description */}
              {milestone.description && (
                <p className="text-xs text-warmBrown/70 font-arabic mt-3">
                  {milestone.description}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
