import React from 'react';
import { MascotMood } from '../../../types/mascot';

export const NoviceSvg: React.FC<{ mood: MascotMood; size?: number }> = ({ mood, size = 100 }) => {
  const isHappy = mood === 'happy' || mood === 'celebrating';
  const isSad = mood === 'sad';

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="noviceGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFA726" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#FF7A00" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#FF5722" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="flameBody" x1="50" y1="20" x2="50" y2="85" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFD54F" />
          <stop offset="50%" stopColor="#FF7A00" />
          <stop offset="100%" stopColor="#FF5722" />
        </linearGradient>
      </defs>

      {/* Aura background */}
      <circle cx="50" cy="50" r="38" fill="url(#noviceGlow)" />

      {/* Fire Wisp Body */}
      <path
        d="M 50 18 C 65 32 75 48 72 65 C 69 78 58 84 50 84 C 42 84 31 78 28 65 C 25 48 35 32 50 18 Z"
        fill="url(#flameBody)"
        stroke="#FFFFFF"
        strokeWidth="1.5"
      />

      {/* Inner Core */}
      <path
        d="M 50 35 C 58 45 62 55 60 65 C 58 72 54 75 50 75 C 46 75 42 72 40 65 C 38 55 42 45 50 35 Z"
        fill="#FFFFFF"
        opacity="0.85"
      />

      {/* Eyes */}
      {isHappy ? (
        <g stroke="#0D0D0D" strokeWidth="2.5" strokeLinecap="round">
          <path d="M 41 54 Q 45 50 49 54" />
          <path d="M 51 54 Q 55 50 59 54" />
        </g>
      ) : isSad ? (
        <g stroke="#0D0D0D" strokeWidth="2.5" strokeLinecap="round">
          <path d="M 41 53 Q 45 56 49 53" />
          <path d="M 51 53 Q 55 56 59 53" />
        </g>
      ) : (
        <g fill="#0D0D0D">
          <circle cx="45" cy="52" r="2.8" />
          <circle cx="55" cy="52" r="2.8" />
          <circle cx="46" cy="51" r="0.9" fill="#FFFFFF" />
          <circle cx="56" cy="51" r="0.9" fill="#FFFFFF" />
        </g>
      )}

      {/* Cheeks */}
      <circle cx="39" cy="57" r="2.2" fill="#FF5722" opacity="0.6" />
      <circle cx="61" cy="57" r="2.2" fill="#FF5722" opacity="0.6" />
    </svg>
  );
};
