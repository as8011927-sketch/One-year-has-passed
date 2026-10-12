'use client';

import React, { useEffect, useState } from 'react';

interface Heart {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

export default function FloatingHearts({ count = 12 }: { count?: number }) {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const colors = ['#D88C88', '#F3CED0', '#E5A7A3', '#D8AE87', '#BD8E65'];
    const generated: Heart[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.floor(Math.random() * 92) + 4,
      size: Math.floor(Math.random() * 12) + 14,
      duration: Math.floor(Math.random() * 4) + 5,
      delay: Math.random() * 5,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setHearts(generated);
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="floating-heart"
          style={{
            left: `${h.left}%`,
            bottom: '-20px',
            fontSize: `${h.size}px`,
            color: h.color,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
            opacity: 0.6,
          }}
        >
          ❤
        </span>
      ))}
    </div>
  );
}
