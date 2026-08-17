import React from 'react';
import { MascotMood } from '../../../types/mascot';

export const NoviceSvg: React.FC<{ mood: MascotMood; size?: number }> = ({ mood, size = 100 }) => {
  const isHappy = mood === 'happy' || mood === 'celebrating';
  const isSad = mood === 'sad';

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="gopherGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFA726" stopOpacity="0.8" />
          <stop offset="60%" stopColor="#FF7A00" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#FF5722" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="gopherSkin" x1="50" y1="15" x2="50" y2="85" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFA726" />
          <stop offset="50%" stopColor="#FF7A00" />
          <stop offset="100%" stopColor="#E64A19" />
        </linearGradient>
        <linearGradient id="cupGrad" x1="50" y1="58" x2="50" y2="82" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#E0E0E0" />
        </linearGradient>
      </defs>

      {/* Aura background */}
      <circle cx="50" cy="50" r="45" fill="url(#gopherGlow)" />

      {/* Gopher Ears */}
      <circle cx="28" cy="25" r="7" fill="#FF7A00" stroke="#FFFFFF" strokeWidth="1.2" />
      <circle cx="28" cy="25" r="4" fill="#FFE082" />
      <circle cx="72" cy="25" r="7" fill="#FF7A00" stroke="#FFFFFF" strokeWidth="1.2" />
      <circle cx="72" cy="25" r="4" fill="#FFE082" />

      {/* Gopher Chubby Body */}
      <path
        d="M 50 18 C 68 18 76 28 76 46 C 76 68 72 84 50 84 C 28 84 24 68 24 46 C 24 28 32 18 50 18 Z"
        fill="url(#gopherSkin)"
        stroke="#FFFFFF"
        strokeWidth="1.5"
      />

      {/* Belly Patch */}
      <ellipse cx="50" cy="62" rx="18" ry="16" fill="#FFE082" opacity="0.9" />

      {/* Big Bulging Gopher Eyes */}
      <circle cx="37" cy="38" r="9.5" fill="#FFFFFF" stroke="#0D0D0D" strokeWidth="1.5" />
      <circle cx="63" cy="38" r="9.5" fill="#FFFFFF" stroke="#0D0D0D" strokeWidth="1.5" />

      {/* Eye Pupils based on Mood */}
      {isHappy ? (
        <g stroke="#0D0D0D" strokeWidth="2.5" strokeLinecap="round">
          <path d="M 32 38 Q 37 32 42 38" />
          <path d="M 58 38 Q 63 32 68 38" />
        </g>
      ) : isSad ? (
        <g stroke="#0D0D0D" strokeWidth="2.5" strokeLinecap="round">
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

      {/* Iconic Gopher Buck Teeth */}
      <rect x="46" y="49" width="3.5" height="5" rx="1" fill="#FFFFFF" stroke="#0D0D0D" strokeWidth="0.8" />
      <rect x="50.5" y="49" width="3.5" height="5" rx="1" fill="#FFFFFF" stroke="#0D0D0D" strokeWidth="0.8" />

      {/* Rosy Cheeks */}
      <circle cx="28" cy="45" r="3" fill="#FF5722" opacity="0.5" />
      <circle cx="72" cy="45" r="3" fill="#FF5722" opacity="0.5" />

      {/* Steaming Java Coffee Cup */}
      {/* Cup Handle */}
      <path d="M 62 64 C 67 64 67 74 62 74" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" fill="none" />

      {/* Cup Body */}
      <path
        d="M 38 60 L 62 60 L 59 78 C 59 80 57 82 54 82 L 46 82 C 43 82 41 80 41 78 Z"
        fill="url(#cupGrad)"
        stroke="#1A1A1A"
        strokeWidth="1.2"
      />

      {/* Java Coffee Logo on Cup (Red & Blue Wisps) */}
      <path d="M 48 67 Q 50 64 48 62 Q 52 64 50 68" stroke="#E53935" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      <path d="M 52 67 Q 54 64 52 62 Q 56 64 54 68" stroke="#0288D1" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      <path d="M 46 72 Q 50 74 54 72" stroke="#E53935" strokeWidth="1.2" strokeLinecap="round" fill="none" />

      {/* Coffee Steam Wisps Rising from Mug */}
      <path d="M 45 57 Q 43 53 46 51" stroke="#FFCC80" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.8" />
      <path d="M 50 56 Q 53 52 49 49" stroke="#FFE082" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.9" />
      <path d="M 55 57 Q 57 53 54 50" stroke="#FFCC80" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.8" />

      {/* Gopher Paws Clasping the Cup */}
      <circle cx="37" cy="68" r="4" fill="#FF7A00" stroke="#FFFFFF" strokeWidth="1" />
      <circle cx="63" cy="68" r="4" fill="#FF7A00" stroke="#FFFFFF" strokeWidth="1" />
    </svg>
  );
};
