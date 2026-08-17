import React from 'react';
import { MascotMood } from '../../../types/mascot';

export const AscendantSvg: React.FC<{ mood: MascotMood; size?: number }> = ({ mood, size = 100 }) => {
  const isHappy = mood === 'happy' || mood === 'celebrating';

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="ascendantGopherCorona" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="35%" stopColor="#FF7A00" stopOpacity="0.8" />
          <stop offset="70%" stopColor="#E040FB" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="gopherSkinAscendant" x1="50" y1="15" x2="50" y2="85" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFCC80" />
          <stop offset="50%" stopColor="#FF7A00" />
          <stop offset="100%" stopColor="#D84315" />
        </linearGradient>
      </defs>

      {/* Divine Corona Rings */}
      <circle cx="50" cy="50" r="47" fill="url(#ascendantGopherCorona)" />
      <circle cx="50" cy="50" r="44" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="6 3" />
      <circle cx="50" cy="50" r="40" stroke="#E040FB" strokeWidth="1" strokeDasharray="3 4" />

      {/* Celestial Phoenix Wings */}
      <path d="M 24 42 C 4 28 2 10 14 6 C 24 16 26 30 28 40 Z" fill="#FFA726" stroke="#FFFFFF" strokeWidth="1.5" />
      <path d="M 20 50 C 2 40 2 24 12 20 C 18 28 22 40 24 48 Z" fill="#E040FB" opacity="0.8" />

      <path d="M 76 42 C 96 28 98 10 86 6 C 76 16 74 30 72 40 Z" fill="#FFA726" stroke="#FFFFFF" strokeWidth="1.5" />
      <path d="M 80 50 C 98 40 98 24 88 20 C 82 28 78 40 76 48 Z" fill="#E040FB" opacity="0.8" />

      {/* Transcendent Headpiece */}
      <polygon points="50,8 55,18 50,15 45,18" fill="#FFFFFF" />
      <circle cx="50" cy="16" r="2.5" fill="#FF7A00" stroke="#FFFFFF" strokeWidth="1" />

      {/* Gopher Ears */}
      <circle cx="28" cy="25" r="7" fill="#FF7A00" stroke="#FFFFFF" strokeWidth="1.2" />
      <circle cx="28" cy="25" r="4" fill="#FFE082" />
      <circle cx="72" cy="25" r="7" fill="#FF7A00" stroke="#FFFFFF" strokeWidth="1.2" />
      <circle cx="72" cy="25" r="4" fill="#FFE082" />

      {/* Gopher Body */}
      <path
        d="M 50 18 C 68 18 76 28 76 46 C 76 68 72 84 50 84 C 28 84 24 68 24 46 C 24 28 32 18 50 18 Z"
        fill="url(#gopherSkinAscendant)"
        stroke="#FFFFFF"
        strokeWidth="1.5"
      />

      {/* Eyes with Starlight reflections */}
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
          <circle cx="41" cy="36" r="1.5" fill="#E040FB" />
          <circle cx="63" cy="36" r="1.5" fill="#E040FB" />
        </g>
      )}

      {/* Snout & Buck Teeth */}
      <ellipse cx="50" cy="46" rx="4.5" ry="3" fill="#2E1C14" />
      <circle cx="51" cy="45" r="1" fill="#FFFFFF" opacity="0.8" />
      <rect x="46" y="49" width="3.5" height="5" rx="1" fill="#FFFFFF" stroke="#0D0D0D" strokeWidth="0.8" />
      <rect x="50.5" y="49" width="3.5" height="5" rx="1" fill="#FFFFFF" stroke="#0D0D0D" strokeWidth="0.8" />

      {/* Celestial Prism Java Coffee Mug */}
      <path d="M 62 64 C 68 64 68 74 62 74" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path
        d="M 38 58 L 62 58 L 59 78 C 59 80 57 82 54 82 L 46 82 C 43 82 41 80 41 78 Z"
        fill="#121212"
        stroke="#FFFFFF"
        strokeWidth="1.5"
      />

      {/* Cosmic Java Logo */}
      <path d="M 48 66 Q 50 63 48 61 Q 52 63 50 67" stroke="#FF5722" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M 52 66 Q 54 63 52 61 Q 56 63 54 67" stroke="#E040FB" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M 46 71 Q 50 73 54 71" stroke="#FF5722" strokeWidth="1.5" strokeLinecap="round" fill="none" />

      {/* Steam Wisps */}
      <path d="M 46 54 Q 44 49 48 46" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M 50 53 Q 54 48 50 44" stroke="#E040FB" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M 54 54 Q 56 49 52 46" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" fill="none" />

      {/* Paws */}
      <circle cx="36" cy="68" r="4.2" fill="#FF7A00" stroke="#FFFFFF" strokeWidth="1.2" />
      <circle cx="64" cy="68" r="4.2" fill="#FF7A00" stroke="#FFFFFF" strokeWidth="1.2" />
    </svg>
  );
};
