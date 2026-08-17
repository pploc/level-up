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
        <linearGradient id="gopherSkinKnight" x1="50" y1="15" x2="50" y2="85" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFA726" />
          <stop offset="50%" stopColor="#FF7A00" />
          <stop offset="100%" stopColor="#D84315" />
        </linearGradient>
        <linearGradient id="knightHelm" x1="50" y1="10" x2="50" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#374151" />
          <stop offset="100%" stopColor="#111827" />
        </linearGradient>
      </defs>

      <circle cx="50" cy="50" r="46" fill="url(#knightAura)" />

      {/* Gopher Ears sticking through armor */}
      <circle cx="28" cy="25" r="7" fill="#FF7A00" stroke="#FFFFFF" strokeWidth="1.2" />
      <circle cx="28" cy="25" r="4" fill="#FFE082" />
      <circle cx="72" cy="25" r="7" fill="#FF7A00" stroke="#FFFFFF" strokeWidth="1.2" />
      <circle cx="72" cy="25" r="4" fill="#FFE082" />

      {/* Knight Crest Flame */}
      <path d="M 50 4 C 55 12 58 18 50 24 C 42 18 45 12 50 4 Z" fill="#FF5722" stroke="#FFFFFF" strokeWidth="0.8" />
      <path d="M 50 8 C 53 14 54 18 50 22 C 46 18 47 14 50 8 Z" fill="#FFD54F" />

      {/* Gopher Body */}
      <path
        d="M 50 18 C 68 18 76 28 76 46 C 76 68 72 84 50 84 C 28 84 24 68 24 46 C 24 28 32 18 50 18 Z"
        fill="url(#gopherSkinKnight)"
        stroke="#FFFFFF"
        strokeWidth="1.5"
      />

      {/* Knight Helmet Forehead Plate */}
      <path
        d="M 32 26 C 42 22 58 22 68 26 L 66 34 C 58 32 42 32 34 34 Z"
        fill="url(#knightHelm)"
        stroke="#FF7A00"
        strokeWidth="1.2"
      />

      {/* Eyes */}
      <circle cx="37" cy="38" r="9.5" fill="#FFFFFF" stroke="#0D0D0D" strokeWidth="1.5" />
      <circle cx="63" cy="38" r="9.5" fill="#FFFFFF" stroke="#0D0D0D" strokeWidth="1.5" />

      {isHappy ? (
        <g stroke="#0D0D0D" strokeWidth="2.8" strokeLinecap="round">
          <path d="M 32 38 Q 37 32 42 38" />
          <path d="M 58 38 Q 63 32 68 38" />
        </g>
      ) : (
        <g fill="#0D0D0D">
          <circle cx="39" cy="38" r="4.2" />
          <circle cx="61" cy="38" r="4.2" />
          <circle cx="41" cy="36" r="1.5" fill="#FFFFFF" />
          <circle cx="63" cy="36" r="1.5" fill="#FFFFFF" />
        </g>
      )}

      {/* Snout & Buck Teeth */}
      <ellipse cx="50" cy="46" rx="4.5" ry="3" fill="#2E1C14" />
      <circle cx="51" cy="45" r="1" fill="#FFFFFF" opacity="0.8" />
      <rect x="46" y="49" width="3.5" height="5" rx="1" fill="#FFFFFF" stroke="#0D0D0D" strokeWidth="0.8" />
      <rect x="50.5" y="49" width="3.5" height="5" rx="1" fill="#FFFFFF" stroke="#0D0D0D" strokeWidth="0.8" />

      {/* Armored Plate Belly */}
      <path
        d="M 36 60 L 64 60 L 58 80 L 42 80 Z"
        fill="#1F2937"
        stroke="#FF7A00"
        strokeWidth="1.2"
      />

      {/* Steel Knight Coffee Goblet */}
      <path d="M 62 64 C 68 64 68 74 62 74" stroke="#9CA3AF" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path
        d="M 38 58 L 62 58 L 59 78 C 59 80 57 82 54 82 L 46 82 C 43 82 41 80 41 78 Z"
        fill="#111827"
        stroke="#9CA3AF"
        strokeWidth="1.5"
      />

      {/* Fiery Java Logo */}
      <path d="M 48 66 Q 50 63 48 61 Q 52 63 50 67" stroke="#EF4444" strokeWidth="1.3" strokeLinecap="round" fill="none" />
      <path d="M 52 66 Q 54 63 52 61 Q 56 63 54 67" stroke="#38BDF8" strokeWidth="1.3" strokeLinecap="round" fill="none" />
      <path d="M 46 71 Q 50 73 54 71" stroke="#EF4444" strokeWidth="1.3" strokeLinecap="round" fill="none" />

      {/* Steam */}
      <path d="M 46 54 Q 44 49 48 46" stroke="#FDE047" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M 50 53 Q 54 48 50 44" stroke="#F97316" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M 54 54 Q 56 49 52 46" stroke="#FDE047" strokeWidth="1.5" strokeLinecap="round" fill="none" />

      {/* Paws */}
      <circle cx="36" cy="68" r="4.2" fill="#FF7A00" stroke="#FFFFFF" strokeWidth="1" />
      <circle cx="64" cy="68" r="4.2" fill="#FF7A00" stroke="#FFFFFF" strokeWidth="1" />
    </svg>
  );
};
