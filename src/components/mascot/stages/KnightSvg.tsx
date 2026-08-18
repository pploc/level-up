import React from 'react';
import { MascotMood } from '../../../types/mascot';
import { JAVA_LOGO_DATA_URI } from '../javaLogoData';

export const KnightSvg: React.FC<{ mood: MascotMood; size?: number }> = ({ mood, size = 100 }) => {
  const isHappy = mood === 'happy' || mood === 'celebrating';

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="knightAura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00ADD8" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="gopherBodyGradKnight" x1="50" y1="10" x2="50" y2="82" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFA726" />
          <stop offset="45%" stopColor="#FF7A00" />
          <stop offset="100%" stopColor="#D84315" />
        </linearGradient>
      </defs>

      <circle cx="50" cy="48" r="46" fill="url(#knightAura)" />

      {/* Knight Plume */}
      <path d="M 50 2 C 56 10 58 16 50 22 C 42 16 44 10 50 2 Z" fill="#00ADD8" stroke="#FFFFFF" strokeWidth="0.8" />
      <path d="M 50 6 C 53 12 54 16 50 20 C 46 16 47 12 50 6 Z" fill="#80DEEA" />

      {/* Gopher Ears */}
      <circle cx="25" cy="18" r="8.5" fill="#FF7A00" stroke="#FFFFFF" strokeWidth="1.5" />
      <circle cx="25" cy="18" r="4.5" fill="#FFE082" />
      <circle cx="75" cy="18" r="8.5" fill="#FF7A00" stroke="#FFFFFF" strokeWidth="1.5" />
      <circle cx="75" cy="18" r="4.5" fill="#FFE082" />

      {/* Gopher Body */}
      <path
        d="M 50 12 C 72 12 82 22 82 44 C 82 66 78 84 50 84 C 22 84 18 66 18 44 C 18 22 28 12 50 12 Z"
        fill="url(#gopherBodyGradKnight)"
        stroke="#FFFFFF"
        strokeWidth="1.8"
      />

      {/* Knight Helmet Visor Plate */}
      <path
        d="M 28 24 C 40 20 60 20 72 24 L 70 32 C 60 30 40 30 30 32 Z"
        fill="#1F2937"
        stroke="#00ADD8"
        strokeWidth="1.2"
      />

      {/* Eyes */}
      <circle cx="36" cy="32" r="10.5" fill="#FFFFFF" stroke="#0D0D0D" strokeWidth="1.8" />
      <circle cx="64" cy="32" r="10.5" fill="#FFFFFF" stroke="#0D0D0D" strokeWidth="1.8" />

      {isHappy ? (
        <g stroke="#0D0D0D" strokeWidth="2.8" strokeLinecap="round">
          <path d="M 30 32 Q 36 25 42 32" />
          <path d="M 58 32 Q 64 25 70 32" />
        </g>
      ) : (
        <g fill="#0D0D0D">
          <circle cx="38" cy="32" r="4.8" />
          <circle cx="62" cy="32" r="4.8" />
          <circle cx="40" cy="30" r="1.8" fill="#FFFFFF" />
          <circle cx="64" cy="30" r="1.8" fill="#FFFFFF" />
        </g>
      )}

      {/* Snout & Teeth */}
      <ellipse cx="50" cy="41" rx="5" ry="3.5" fill="#2E1C14" />
      <circle cx="51.5" cy="40" r="1.2" fill="#FFFFFF" opacity="0.8" />
      <rect x="45.5" y="44.5" width="4.2" height="6" rx="1" fill="#FFFFFF" stroke="#0D0D0D" strokeWidth="0.9" />
      <rect x="50.3" y="44.5" width="4.2" height="6" rx="1" fill="#FFFFFF" stroke="#0D0D0D" strokeWidth="0.9" />

      {/* Armored Java Steel Tankard */}
      <path d="M 68 59 C 78 59 78 75 68 75" stroke="#9CA3AF" strokeWidth="3.2" strokeLinecap="round" fill="none" />
      <path
        d="M 32 54 L 68 54 L 64 80 C 64 83 61 86 57 86 L 43 86 C 39 86 36 83 36 80 Z"
        fill="#111827"
        stroke="#9CA3AF"
        strokeWidth="1.8"
      />
      <ellipse cx="50" cy="54" rx="17" ry="3" fill="#1E293B" stroke="#9CA3AF" strokeWidth="1.2" />

      {/* High Resolution Java Logo */}
      <image
        href={JAVA_LOGO_DATA_URI}
        x="38"
        y="58"
        width="24"
        height="24"
        preserveAspectRatio="xMidYMid meet"
      />

      {/* Steam */}
      <path d="M 44 50 Q 40 44 45 40" stroke="#80DEEA" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M 50 49 Q 54 43 49 38" stroke="#00ADD8" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <path d="M 56 50 Q 60 44 55 39" stroke="#80DEEA" strokeWidth="1.8" strokeLinecap="round" fill="none" />

      {/* Paws */}
      <circle cx="31" cy="65" r="5" fill="#FF7A00" stroke="#FFFFFF" strokeWidth="1.4" />
      <circle cx="69" cy="65" r="5" fill="#FF7A00" stroke="#FFFFFF" strokeWidth="1.4" />
    </svg>
  );
};
