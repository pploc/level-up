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
        <linearGradient id="gopherBodyGradAscendant" x1="50" y1="10" x2="50" y2="82" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFD54F" />
          <stop offset="45%" stopColor="#FF7A00" />
          <stop offset="100%" stopColor="#D84315" />
        </linearGradient>
      </defs>

      {/* Divine Corona Rings */}
      <circle cx="50" cy="48" r="47" fill="url(#ascendantGopherCorona)" />
      <circle cx="50" cy="48" r="44" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="6 3" />
      <circle cx="50" cy="48" r="40" stroke="#E040FB" strokeWidth="1" strokeDasharray="3 4" />

      {/* Celestial Phoenix Wings */}
      <path d="M 22 40 C 4 26 2 10 14 6 C 22 14 26 28 26 38 Z" fill="#FFA726" stroke="#FFFFFF" strokeWidth="1.5" />
      <path d="M 18 48 C 2 38 2 22 12 18 C 18 26 22 38 24 46 Z" fill="#E040FB" opacity="0.8" />

      <path d="M 78 40 C 96 26 98 10 86 6 C 78 14 74 28 74 38 Z" fill="#FFA726" stroke="#FFFFFF" strokeWidth="1.5" />
      <path d="M 82 48 C 98 38 98 22 88 18 C 82 26 78 38 76 46 Z" fill="#E040FB" opacity="0.8" />

      {/* Transcendent Headpiece */}
      <polygon points="50,4 55,14 50,11 45,14" fill="#FFFFFF" />
      <circle cx="50" cy="12" r="2.5" fill="#FF7A00" stroke="#FFFFFF" strokeWidth="1" />

      {/* Gopher Ears */}
      <circle cx="25" cy="18" r="8.5" fill="#FF7A00" stroke="#FFFFFF" strokeWidth="1.5" />
      <circle cx="25" cy="18" r="4.5" fill="#FFE082" />
      <circle cx="75" cy="18" r="8.5" fill="#FF7A00" stroke="#FFFFFF" strokeWidth="1.5" />
      <circle cx="75" cy="18" r="4.5" fill="#FFE082" />

      {/* Gopher Body */}
      <path
        d="M 50 12 C 72 12 82 22 82 44 C 82 66 78 84 50 84 C 22 84 18 66 18 44 C 18 22 28 12 50 12 Z"
        fill="url(#gopherBodyGradAscendant)"
        stroke="#FFFFFF"
        strokeWidth="1.8"
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
          <circle cx="40" cy="30" r="1.8" fill="#E040FB" />
          <circle cx="64" cy="30" r="1.8" fill="#E040FB" />
        </g>
      )}

      {/* Snout & Teeth */}
      <ellipse cx="50" cy="41" rx="5" ry="3.5" fill="#2E1C14" />
      <circle cx="51.5" cy="40" r="1.2" fill="#FFFFFF" opacity="0.8" />
      <rect x="45.5" y="44.5" width="4.2" height="6" rx="1" fill="#FFFFFF" stroke="#0D0D0D" strokeWidth="0.9" />
      <rect x="50.3" y="44.5" width="4.2" height="6" rx="1" fill="#FFFFFF" stroke="#0D0D0D" strokeWidth="0.9" />

      {/* Cosmic Java Mug */}
      <path d="M 68 59 C 78 59 78 75 68 75" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" fill="none" />
      <path
        d="M 32 54 L 68 54 L 64 80 C 64 83 61 86 57 86 L 43 86 C 39 86 36 83 36 80 Z"
        fill="#121212"
        stroke="#FFFFFF"
        strokeWidth="1.8"
      />
      <ellipse cx="50" cy="54" rx="17" ry="3" fill="#E040FB" stroke="#FFFFFF" strokeWidth="1.2" />

      {/* Clear Java Logo */}
      <path d="M 47 64 C 45 61 49 59 47 57 C 51 60 49 63 47 64 Z" fill="#FF5722" />
      <path d="M 52 64 C 50 60 55 58 53 56 C 57 59 55 63 52 64 Z" fill="#E040FB" />
      <path d="M 44 69 C 47 71 53 71 56 69 C 54 70 46 70 44 69 Z" fill="#38BDF8" stroke="#38BDF8" strokeWidth="0.8" />
      <path d="M 42 74 C 47 76 53 76 58 74 C 55 75 45 75 42 74 Z" fill="#38BDF8" stroke="#38BDF8" strokeWidth="0.8" />

      {/* Steam */}
      <path d="M 44 50 Q 40 44 45 40" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M 50 49 Q 54 43 49 38" stroke="#E040FB" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <path d="M 56 50 Q 60 44 55 39" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" fill="none" />

      {/* Paws */}
      <circle cx="31" cy="65" r="5" fill="#FF7A00" stroke="#FFFFFF" strokeWidth="1.4" />
      <circle cx="69" cy="65" r="5" fill="#FF7A00" stroke="#FFFFFF" strokeWidth="1.4" />
    </svg>
  );
};
