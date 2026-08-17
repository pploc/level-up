import React from 'react';
import { MascotMood } from '../../../types/mascot';

export const EmberSvg: React.FC<{ mood: MascotMood; size?: number }> = ({ mood, size = 100 }) => {
  const isHappy = mood === 'happy' || mood === 'celebrating';
  const isSad = mood === 'sad';

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="emberGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF7A00" stopOpacity="0.9" />
          <stop offset="70%" stopColor="#FF5722" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#D84315" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="emberBody" x1="50" y1="15" x2="50" y2="88" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFF176" />
          <stop offset="40%" stopColor="#FF9800" />
          <stop offset="100%" stopColor="#E64A19" />
        </linearGradient>
      </defs>

      <circle cx="50" cy="50" r="42" fill="url(#emberGlow)" />

      {/* Flame Horns */}
      <path d="M 36 36 C 22 25 24 10 32 14 C 36 20 38 28 40 34 Z" fill="#FFA726" stroke="#FFFFFF" strokeWidth="1" />
      <path d="M 64 36 C 78 25 76 10 68 14 C 64 20 62 28 60 34 Z" fill="#FFA726" stroke="#FFFFFF" strokeWidth="1" />

      {/* Main Body */}
      <path
        d="M 50 16 C 68 28 78 45 75 66 C 72 80 62 86 50 86 C 38 86 28 80 25 66 C 22 45 32 28 50 16 Z"
        fill="url(#emberBody)"
        stroke="#FFFFFF"
        strokeWidth="1.5"
      />

      {/* Core Flare */}
      <path
        d="M 50 32 C 60 44 64 56 62 66 C 60 74 55 77 50 77 C 45 77 40 74 38 66 C 36 56 40 44 50 32 Z"
        fill="#FFFFFF"
        opacity="0.9"
      />

      {/* Eyes & Brow */}
      {isHappy ? (
        <g stroke="#0D0D0D" strokeWidth="2.8" strokeLinecap="round">
          <path d="M 40 52 Q 45 47 50 52" />
          <path d="M 50 52 Q 55 47 60 52" />
        </g>
      ) : isSad ? (
        <g stroke="#0D0D0D" strokeWidth="2.8" strokeLinecap="round">
          <path d="M 40 50 Q 45 54 50 50" />
          <path d="M 50 50 Q 55 54 60 50" />
        </g>
      ) : (
        <g>
          <path d="M 38 46 L 47 48" stroke="#D84315" strokeWidth="2" strokeLinecap="round" />
          <path d="M 62 46 L 53 48" stroke="#D84315" strokeWidth="2" strokeLinecap="round" />
          <circle cx="44" cy="52" r="3" fill="#0D0D0D" />
          <circle cx="56" cy="52" r="3" fill="#0D0D0D" />
          <circle cx="45" cy="51" r="1" fill="#FFFFFF" />
          <circle cx="57" cy="51" r="1" fill="#FFFFFF" />
        </g>
      )}

      {/* Flame Crest Marks */}
      <circle cx="50" cy="28" r="2.5" fill="#FFD54F" />
    </svg>
  );
};
