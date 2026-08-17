import React from 'react';
import { MascotMood } from '../../../types/mascot';

export const SolarChampionSvg: React.FC<{ mood: MascotMood; size?: number }> = ({ mood, size = 100 }) => {
  const isHappy = mood === 'happy' || mood === 'celebrating';

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="solarHaloGopher" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFD700" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#FF7A00" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#FF5722" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="gopherSkinSolar" x1="50" y1="15" x2="50" y2="85" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFA726" />
          <stop offset="50%" stopColor="#FF7A00" />
          <stop offset="100%" stopColor="#D84315" />
        </linearGradient>
      </defs>

      {/* Solar Aura Halo */}
      <circle cx="50" cy="50" r="46" fill="url(#solarHaloGopher)" />
      <circle cx="50" cy="50" r="42" stroke="#FFD700" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.8" />

      {/* Radiant Solar Wings */}
      <path d="M 24 45 C 8 32 4 18 14 16 C 22 24 26 36 28 44 Z" fill="#FF9800" stroke="#FFFFFF" strokeWidth="1" />
      <path d="M 76 45 C 92 32 96 18 86 16 C 78 24 74 36 72 44 Z" fill="#FF9800" stroke="#FFFFFF" strokeWidth="1" />

      {/* Golden Solar Crown */}
      <path d="M 40 18 L 44 10 L 50 15 L 56 10 L 60 18 Z" fill="#FFD700" stroke="#FFFFFF" strokeWidth="1" />

      {/* Gopher Ears */}
      <circle cx="28" cy="25" r="7" fill="#FF7A00" stroke="#FFFFFF" strokeWidth="1.2" />
      <circle cx="28" cy="25" r="4" fill="#FFE082" />
      <circle cx="72" cy="25" r="7" fill="#FF7A00" stroke="#FFFFFF" strokeWidth="1.2" />
      <circle cx="72" cy="25" r="4" fill="#FFE082" />

      {/* Gopher Body */}
      <path
        d="M 50 18 C 68 18 76 28 76 46 C 76 68 72 84 50 84 C 28 84 24 68 24 46 C 24 28 32 18 50 18 Z"
        fill="url(#gopherSkinSolar)"
        stroke="#FFFFFF"
        strokeWidth="1.5"
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
          <circle cx="41" cy="36" r="1.5" fill="#FFD700" />
          <circle cx="63" cy="36" r="1.5" fill="#FFD700" />
        </g>
      )}

      {/* Snout & Buck Teeth */}
      <ellipse cx="50" cy="46" rx="4.5" ry="3" fill="#2E1C14" />
      <circle cx="51" cy="45" r="1" fill="#FFFFFF" opacity="0.8" />
      <rect x="46" y="49" width="3.5" height="5" rx="1" fill="#FFFFFF" stroke="#0D0D0D" strokeWidth="0.8" />
      <rect x="50.5" y="49" width="3.5" height="5" rx="1" fill="#FFFFFF" stroke="#0D0D0D" strokeWidth="0.8" />

      {/* Golden Solar Chalice Java Coffee */}
      <path d="M 62 64 C 68 64 68 74 62 74" stroke="#FFD700" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path
        d="M 38 58 L 62 58 L 59 78 C 59 80 57 82 54 82 L 46 82 C 43 82 41 80 41 78 Z"
        fill="#262626"
        stroke="#FFD700"
        strokeWidth="1.5"
      />

      {/* Radiant Java Logo */}
      <path d="M 48 66 Q 50 63 48 61 Q 52 63 50 67" stroke="#FF5722" strokeWidth="1.4" strokeLinecap="round" fill="none" />
      <path d="M 52 66 Q 54 63 52 61 Q 56 63 54 67" stroke="#FFD700" strokeWidth="1.4" strokeLinecap="round" fill="none" />
      <path d="M 46 71 Q 50 73 54 71" stroke="#FF5722" strokeWidth="1.4" strokeLinecap="round" fill="none" />

      {/* Steam Wisps */}
      <path d="M 46 54 Q 44 49 48 46" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M 50 53 Q 54 48 50 44" stroke="#FFA726" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M 54 54 Q 56 49 52 46" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" fill="none" />

      {/* Paws */}
      <circle cx="36" cy="68" r="4.2" fill="#FF7A00" stroke="#FFD700" strokeWidth="1.2" />
      <circle cx="64" cy="68" r="4.2" fill="#FF7A00" stroke="#FFD700" strokeWidth="1.2" />
    </svg>
  );
};
