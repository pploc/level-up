import React from 'react';
import { MascotMood } from '../../../types/mascot';

export const AscendantSvg: React.FC<{ mood: MascotMood; size?: number }> = ({ mood, size = 100 }) => {
  const isHappy = mood === 'happy' || mood === 'celebrating';

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="ascendantCorona" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="35%" stopColor="#FF7A00" stopOpacity="0.8" />
          <stop offset="70%" stopColor="#E040FB" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Divine Corona Ring */}
      <circle cx="50" cy="50" r="47" fill="url(#ascendantCorona)" />
      <circle cx="50" cy="50" r="44" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="6 3" />
      <circle cx="50" cy="50" r="40" stroke="#E040FB" strokeWidth="1" strokeDasharray="3 4" />

      {/* Celestial Phoenix Wings */}
      <path d="M 26 44 C 4 30 2 10 14 6 C 24 16 28 32 30 42 Z" fill="#FFA726" stroke="#FFFFFF" strokeWidth="1.5" />
      <path d="M 22 52 C 2 42 2 26 12 22 C 20 30 24 42 26 50 Z" fill="#E040FB" opacity="0.8" />

      <path d="M 74 44 C 96 30 98 10 86 6 C 76 16 72 32 70 42 Z" fill="#FFA726" stroke="#FFFFFF" strokeWidth="1.5" />
      <path d="M 78 52 C 98 42 98 26 88 22 C 80 30 76 42 74 50 Z" fill="#E040FB" opacity="0.8" />

      {/* Sacred Deity Core */}
      <path
        d="M 50 16 C 66 16 72 28 72 50 C 72 68 64 84 50 88 C 36 84 28 68 28 50 C 28 28 34 16 50 16 Z"
        fill="#080808"
        stroke="#FFFFFF"
        strokeWidth="2"
      />

      {/* Transcendent Headpiece */}
      <polygon points="50,8 55,20 50,16 45,20" fill="#FFFFFF" />
      <circle cx="50" cy="18" r="3" fill="#FF7A00" stroke="#FFFFFF" strokeWidth="1" />

      {/* Pure Starlight Eyes */}
      <ellipse cx="42" cy="46" rx={isHappy ? 3.5 : 4} ry="2.5" fill="#FFFFFF" />
      <ellipse cx="58" cy="46" rx={isHappy ? 3.5 : 4} ry="2.5" fill="#FFFFFF" />
      <ellipse cx="42" cy="46" rx="1.5" ry="1.5" fill="#E040FB" />
      <ellipse cx="58" cy="46" rx="1.5" ry="1.5" fill="#E040FB" />

      {/* Heart Prism Gem */}
      <polygon points="50,60 58,68 50,78 42,68" fill="#FFFFFF" stroke="#E040FB" strokeWidth="1.5" />
    </svg>
  );
};
