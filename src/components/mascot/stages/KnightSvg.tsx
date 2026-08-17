import React from 'react';
import { MascotMood } from '../../../types/mascot';

export const KnightSvg: React.FC<{ mood: MascotMood; size?: number }> = ({ mood, size = 100 }) => {
  const isHappy = mood === 'happy' || mood === 'celebrating';

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="knightAura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF5722" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="helmGrad" x1="50" y1="20" x2="50" y2="85" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2A2A2A" />
          <stop offset="50%" stopColor="#141414" />
          <stop offset="100%" stopColor="#0A0A0A" />
        </linearGradient>
      </defs>

      <circle cx="50" cy="50" r="45" fill="url(#knightAura)" />

      {/* Helmet Plume (Fire Crest) */}
      <path d="M 50 6 C 58 16 62 26 58 35 C 50 28 50 20 50 6 Z" fill="#FF7A00" />
      <path d="M 50 6 C 42 16 38 26 42 35 C 50 28 50 20 50 6 Z" fill="#FF5722" />
      <path d="M 50 12 C 54 20 54 28 50 32 C 46 28 46 20 50 12 Z" fill="#FFD54F" />

      {/* Obsidian Greathelm */}
      <path
        d="M 50 24 C 68 24 74 36 74 54 C 74 72 65 82 50 84 C 35 82 26 72 26 54 C 26 36 32 24 50 24 Z"
        fill="url(#helmGrad)"
        stroke="#FF7A00"
        strokeWidth="1.8"
      />

      {/* Visor Slit */}
      <path
        d="M 32 48 L 48 51 L 52 51 L 68 48 C 66 58 58 60 50 60 C 42 60 34 58 32 48 Z"
        fill="#050505"
        stroke="#FF5722"
        strokeWidth="1.2"
      />

      {/* Blazing Eyes inside Visor */}
      <ellipse cx="43" cy="53" rx={isHappy ? 3.5 : 4} ry={isHappy ? 2 : 2.5} fill="#FFA726" />
      <ellipse cx="57" cy="53" rx={isHappy ? 3.5 : 4} ry={isHappy ? 2 : 2.5} fill="#FFA726" />
      <circle cx="43" cy="53" r="1.2" fill="#FFFFFF" />
      <circle cx="57" cy="53" r="1.2" fill="#FFFFFF" />

      {/* Knight Gorget / Collar */}
      <path d="M 36 76 L 50 84 L 64 76 L 50 88 Z" fill="#FF5722" stroke="#FFFFFF" strokeWidth="1" />
    </svg>
  );
};
