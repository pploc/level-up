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
        <linearGradient id="gopherSkinEmber" x1="50" y1="15" x2="50" y2="85" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFB74D" />
          <stop offset="50%" stopColor="#FF7A00" />
          <stop offset="100%" stopColor="#D84315" />
        </linearGradient>
        <linearGradient id="cupGradEmber" x1="50" y1="58" x2="50" y2="82" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1E1E1E" />
          <stop offset="100%" stopColor="#0A0A0A" />
        </linearGradient>
      </defs>

      <circle cx="50" cy="50" r="46" fill="url(#emberGlow)" />

      {/* Flame Horns / Tufts behind ears */}
      <path d="M 24 22 C 14 10 18 2 24 6 C 26 12 28 18 29 24 Z" fill="#FFD54F" stroke="#FFFFFF" strokeWidth="1" />
      <path d="M 76 22 C 86 10 82 2 76 6 C 74 12 72 18 71 24 Z" fill="#FFD54F" stroke="#FFFFFF" strokeWidth="1" />

      {/* Gopher Ears */}
      <circle cx="28" cy="25" r="7" fill="#FF7A00" stroke="#FFFFFF" strokeWidth="1.2" />
      <circle cx="28" cy="25" r="4" fill="#FFE082" />
      <circle cx="72" cy="25" r="7" fill="#FF7A00" stroke="#FFFFFF" strokeWidth="1.2" />
      <circle cx="72" cy="25" r="4" fill="#FFE082" />

      {/* Main Body */}
      <path
        d="M 50 18 C 68 18 76 28 76 46 C 76 68 72 84 50 84 C 28 84 24 68 24 46 C 24 28 32 18 50 18 Z"
        fill="url(#gopherSkinEmber)"
        stroke="#FFFFFF"
        strokeWidth="1.5"
      />

      {/* Belly */}
      <ellipse cx="50" cy="62" rx="18" ry="16" fill="#FFE082" opacity="0.9" />

      {/* Eyes */}
      <circle cx="37" cy="38" r="9.5" fill="#FFFFFF" stroke="#0D0D0D" strokeWidth="1.5" />
      <circle cx="63" cy="38" r="9.5" fill="#FFFFFF" stroke="#0D0D0D" strokeWidth="1.5" />

      {isHappy ? (
        <g stroke="#0D0D0D" strokeWidth="2.8" strokeLinecap="round">
          <path d="M 32 38 Q 37 32 42 38" />
          <path d="M 58 38 Q 63 32 68 38" />
        </g>
      ) : isSad ? (
        <g stroke="#0D0D0D" strokeWidth="2.8" strokeLinecap="round">
          <path d="M 32 37 Q 37 42 42 37" />
          <path d="M 58 37 Q 63 42 68 37" />
        </g>
      ) : (
        <g fill="#0D0D0D">
          <circle cx="39" cy="38" r="4.2" />
          <circle cx="61" cy="38" r="4.2" />
          <circle cx="41" cy="36" r="1.5" fill="#FFFFFF" />
          <circle cx="63" cy="36" r="1.5" fill="#FFFFFF" />
        </g>
      )}

      {/* Snout & Nose */}
      <ellipse cx="50" cy="46" rx="4.5" ry="3" fill="#2E1C14" />
      <circle cx="51" cy="45" r="1" fill="#FFFFFF" opacity="0.8" />

      {/* Buck Teeth */}
      <rect x="46" y="49" width="3.5" height="5" rx="1" fill="#FFFFFF" stroke="#0D0D0D" strokeWidth="0.8" />
      <rect x="50.5" y="49" width="3.5" height="5" rx="1" fill="#FFFFFF" stroke="#0D0D0D" strokeWidth="0.8" />

      {/* Cheeks */}
      <circle cx="28" cy="45" r="3.2" fill="#FF5722" opacity="0.6" />
      <circle cx="72" cy="45" r="3.2" fill="#FF5722" opacity="0.6" />

      {/* Dark Ember Java Mug */}
      <path d="M 62 64 C 67 64 67 74 62 74" stroke="#FF7A00" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path
        d="M 38 60 L 62 60 L 59 78 C 59 80 57 82 54 82 L 46 82 C 43 82 41 80 41 78 Z"
        fill="url(#cupGradEmber)"
        stroke="#FF5722"
        strokeWidth="1.3"
      />

      {/* Glowing Java Logo */}
      <path d="M 48 67 Q 50 64 48 62 Q 52 64 50 68" stroke="#FF5722" strokeWidth="1.3" strokeLinecap="round" fill="none" />
      <path d="M 52 67 Q 54 64 52 62 Q 56 64 54 68" stroke="#29B6F6" strokeWidth="1.3" strokeLinecap="round" fill="none" />
      <path d="M 46 72 Q 50 74 54 72" stroke="#FF5722" strokeWidth="1.3" strokeLinecap="round" fill="none" />

      {/* Steam Wisps */}
      <path d="M 45 56 Q 42 51 47 48" stroke="#FFE082" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M 50 55 Q 54 50 49 46" stroke="#FFB74D" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M 55 56 Q 58 51 53 48" stroke="#FFE082" strokeWidth="1.5" strokeLinecap="round" fill="none" />

      {/* Paws */}
      <circle cx="37" cy="68" r="4.2" fill="#FF7A00" stroke="#FFFFFF" strokeWidth="1" />
      <circle cx="63" cy="68" r="4.2" fill="#FF7A00" stroke="#FFFFFF" strokeWidth="1" />
    </svg>
  );
};
