import React from 'react';
import { MascotMood } from '../../../types/mascot';

export const SolarChampionSvg: React.FC<{ mood: MascotMood; size?: number }> = ({ mood, size = 100 }) => {
  const isHappy = mood === 'happy' || mood === 'celebrating';

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="solarHalo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFD700" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#FF7A00" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#FF5722" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Solar Halo */}
      <circle cx="50" cy="50" r="46" fill="url(#solarHalo)" />
      <circle cx="50" cy="50" r="42" stroke="#FFD700" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.8" />

      {/* Radiant Solar Wings */}
      <path d="M 28 48 C 10 35 6 18 16 16 C 24 24 28 36 32 46 Z" fill="#FF9800" stroke="#FFFFFF" strokeWidth="1" />
      <path d="M 72 48 C 90 35 94 18 84 16 C 76 24 72 36 68 46 Z" fill="#FF9800" stroke="#FFFFFF" strokeWidth="1" />

      {/* Core Solar Armor Body */}
      <path
        d="M 50 20 C 66 20 72 32 72 52 C 72 70 64 82 50 85 C 36 82 28 70 28 52 C 28 32 34 20 50 20 Z"
        fill="#121212"
        stroke="#FFD700"
        strokeWidth="2"
      />

      {/* Golden Crown */}
      <path d="M 38 24 L 43 14 L 50 20 L 57 14 L 62 24 Z" fill="#FFD700" stroke="#FFFFFF" strokeWidth="1" />

      {/* Radiant Visor */}
      <path d="M 34 46 L 50 50 L 66 46 C 64 56 58 60 50 60 C 42 60 36 56 34 46 Z" fill="#FF5722" />

      {/* Sun Eyes */}
      <circle cx="43" cy="51" r={isHappy ? 3 : 3.5} fill="#FFFFFF" />
      <circle cx="57" cy="51" r={isHappy ? 3 : 3.5} fill="#FFFFFF" />
      <circle cx="43" cy="51" r="1.5" fill="#FFD700" />
      <circle cx="57" cy="51" r="1.5" fill="#FFD700" />

      {/* Chest Solar Emblem */}
      <polygon points="50,65 54,72 50,78 46,72" fill="#FFD700" stroke="#FFFFFF" strokeWidth="0.8" />
    </svg>
  );
};
