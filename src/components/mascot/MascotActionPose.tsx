import React from 'react';
import { MascotStage, MascotMood, MascotActionType } from '../../types/mascot';
import { JAVA_LOGO_DATA_URI } from './javaLogoData';

interface MascotActionPoseProps {
  stage?: MascotStage;
  mood?: MascotMood;
  action?: MascotActionType;
  size?: number;
}

export const MascotActionPose: React.FC<MascotActionPoseProps> = ({
  action = 'coffee_sip',
  size = 220
}) => {
  return (
    <div style={{ width: size, height: size }} className="relative flex items-center justify-center select-none">
      {/* Dynamic Action-Specific Animated Vector Character */}
      {action === 'push_up' && <PushUpGopher size={size} />}
      {action === 'bicep_flex' && <BicepFlexGopher size={size} />}
      {action === 'dumbbell_press' && <DumbbellPressGopher size={size} />}
      {action === 'reading_book' && <ReadingBookGopher size={size} />}
      {action === 'laptop_coding' && <LaptopCodingGopher size={size} />}
      {action === 'zen_meditate' && <ZenMeditateGopher size={size} />}
      {action === 'water_chug' && <WaterChugGopher size={size} />}
      {action === 'celebrate_jump' && <CelebrateJumpGopher size={size} />}
      {action === 'coffee_sip' && <CoffeeSipGopher size={size} />}
    </div>
  );
};

/* ---------------- 1. PUSH-UP GOPHER (Horizontal Plank & Dip) ---------------- */
const PushUpGopher: React.FC<{ size: number }> = ({ size }) => (
  <div className="relative flex flex-col items-center justify-center">
    <svg width={size} height={size * 0.85} viewBox="0 0 140 100" fill="none" className="animate-push-up filter drop-shadow-[0_0_20px_rgba(0,173,216,0.8)]">
      <defs>
        <linearGradient id="gopherPushBody" x1="20" y1="30" x2="110" y2="70" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#7FD5EA" />
          <stop offset="50%" stopColor="#00ADD8" />
          <stop offset="100%" stopColor="#007D9C" />
        </linearGradient>
      </defs>

      {/* Gym Floor / Yoga Mat */}
      <rect x="5" y="82" width="130" height="6" rx="3" fill="#1E293B" stroke="#00ADD8" strokeWidth="1.5" />
      <line x1="15" y1="85" x2="125" y2="85" stroke="#38BDF8" strokeWidth="1" strokeDasharray="4 4" />

      {/* Gopher Body in Horizontal Plank */}
      <ellipse cx="65" cy="52" rx="42" ry="24" fill="url(#gopherPushBody)" stroke="#FFFFFF" strokeWidth="1.8" />
      <ellipse cx="60" cy="58" rx="26" ry="14" fill="#C8EBFD" opacity="0.9" />

      {/* Gopher Tail / Back Feet */}
      <circle cx="106" cy="62" r="7" fill="#00ADD8" stroke="#FFFFFF" strokeWidth="1.5" />
      <circle cx="112" cy="74" r="5" fill="#007D9C" stroke="#FFFFFF" strokeWidth="1.2" />

      {/* Gopher Head Turned Forward */}
      <circle cx="34" cy="40" r="22" fill="url(#gopherPushBody)" stroke="#FFFFFF" strokeWidth="1.8" />

      {/* Ears */}
      <circle cx="20" cy="24" r="7" fill="#00ADD8" stroke="#FFFFFF" strokeWidth="1.2" />
      <circle cx="20" cy="24" r="3.5" fill="#BFE6FF" />
      <circle cx="44" cy="22" r="7" fill="#00ADD8" stroke="#FFFFFF" strokeWidth="1.2" />
      <circle cx="44" cy="22" r="3.5" fill="#BFE6FF" />

      {/* Eyes (Determined Grunt) */}
      <circle cx="27" cy="36" r="6.5" fill="#FFFFFF" stroke="#0D0D0D" strokeWidth="1.4" />
      <circle cx="41" cy="36" r="6.5" fill="#FFFFFF" stroke="#0D0D0D" strokeWidth="1.4" />
      <path d="M 23 37 Q 27 31 31 37" stroke="#0D0D0D" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M 37 37 Q 41 31 45 37" stroke="#0D0D0D" strokeWidth="2.2" strokeLinecap="round" />

      {/* Snout & Buck Teeth */}
      <ellipse cx="34" cy="44" rx="4.5" ry="3" fill="#1E293B" />
      <rect x="30.5" y="47" width="3.2" height="4.5" rx="0.8" fill="#FFFFFF" stroke="#0D0D0D" strokeWidth="0.8" />
      <rect x="34.2" y="47" width="3.2" height="4.5" rx="0.8" fill="#FFFFFF" stroke="#0D0D0D" strokeWidth="0.8" />

      {/* Sweat Drop */}
      <path d="M 12 34 C 12 30 16 26 16 26 C 16 26 20 30 20 34 C 20 36 18 38 16 38 C 14 38 12 36 12 34 Z" fill="#38BDF8" className="animate-bounce" />

      {/* Muscular Front Arms Placed on Floor */}
      <path d="M 32 58 L 32 82" stroke="#00ADD8" strokeWidth="9" strokeLinecap="round" />
      <path d="M 32 58 L 32 82" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <circle cx="32" cy="82" r="6" fill="#007D9C" stroke="#FFFFFF" strokeWidth="1.5" />

      <path d="M 48 58 L 48 82" stroke="#00ADD8" strokeWidth="9" strokeLinecap="round" />
      <path d="M 48 58 L 48 82" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <circle cx="48" cy="82" r="6" fill="#007D9C" stroke="#FFFFFF" strokeWidth="1.5" />
    </svg>
    <div className="mt-1 px-3 py-1 bg-obsidian-900/90 border border-cyan-400 text-cyan-300 rounded-full text-xs font-black tracking-wider shadow-lg">
      💪 100 PUSH-UPS DONE!
    </div>
  </div>
);

/* ---------------- 2. BICEP FLEX GOPHER (Buff Flexing Arms) ---------------- */
const BicepFlexGopher: React.FC<{ size: number }> = ({ size }) => (
  <div className="relative flex flex-col items-center justify-center">
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" className="filter drop-shadow-[0_0_25px_rgba(0,173,216,0.9)] animate-mascot-happy">
      <defs>
        <linearGradient id="gopherFlexGrad" x1="60" y1="15" x2="60" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#7FD5EA" />
          <stop offset="45%" stopColor="#00ADD8" />
          <stop offset="100%" stopColor="#007D9C" />
        </linearGradient>
      </defs>

      {/* Aura Energy Sparks */}
      <circle cx="60" cy="60" r="54" stroke="#00E5FF" strokeWidth="1.5" strokeDasharray="6 4" className="animate-spin" style={{ animationDuration: '6s' }} />

      {/* Big Flexing Left Arm (Bicep Peak) */}
      <path d="M 38 65 C 10 65 6 35 22 28 C 30 24 38 42 38 52" fill="#00ADD8" stroke="#FFFFFF" strokeWidth="2" />
      <ellipse cx="20" cy="38" rx="8" ry="11" fill="#7FD5EA" stroke="#007D9C" strokeWidth="1.5" />
      <circle cx="24" cy="26" r="6" fill="#007D9C" stroke="#FFFFFF" strokeWidth="1.5" />

      {/* Big Flexing Right Arm (Bicep Peak) */}
      <path d="M 82 65 C 110 65 114 35 98 28 C 90 24 82 42 82 52" fill="#00ADD8" stroke="#FFFFFF" strokeWidth="2" />
      <ellipse cx="100" cy="38" rx="8" ry="11" fill="#7FD5EA" stroke="#007D9C" strokeWidth="1.5" />
      <circle cx="96" cy="26" r="6" fill="#007D9C" stroke="#FFFFFF" strokeWidth="1.5" />

      {/* Gopher Body */}
      <path
        d="M 60 20 C 82 20 90 32 90 56 C 90 78 84 96 60 96 C 36 96 30 78 30 56 C 30 32 38 20 60 20 Z"
        fill="url(#gopherFlexGrad)"
        stroke="#FFFFFF"
        strokeWidth="2"
      />
      <ellipse cx="60" cy="68" rx="22" ry="20" fill="#C8EBFD" opacity="0.95" />

      {/* Headband / Gym Sweatband */}
      <path d="M 32 30 Q 60 24 88 30" stroke="#EF4444" strokeWidth="5" strokeLinecap="round" />
      <circle cx="34" cy="30" r="3.5" fill="#EF4444" />

      {/* Bulging Victorious Eyes */}
      <circle cx="46" cy="42" r="9" fill="#FFFFFF" stroke="#0D0D0D" strokeWidth="1.6" />
      <circle cx="74" cy="42" r="9" fill="#FFFFFF" stroke="#0D0D0D" strokeWidth="1.6" />
      <path d="M 40 43 Q 46 36 52 43" stroke="#0D0D0D" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M 68 43 Q 74 36 80 43" stroke="#0D0D0D" strokeWidth="2.6" strokeLinecap="round" />

      {/* Snout & Smiling Teeth */}
      <ellipse cx="60" cy="50" rx="5" ry="3.5" fill="#1E293B" />
      <rect x="55.5" y="53.5" width="4.2" height="6" rx="1" fill="#FFFFFF" stroke="#0D0D0D" strokeWidth="0.9" />
      <rect x="60.3" y="53.5" width="4.2" height="6" rx="1" fill="#FFFFFF" stroke="#0D0D0D" strokeWidth="0.9" />

      {/* Feet */}
      <circle cx="44" cy="96" r="7" fill="#007D9C" stroke="#FFFFFF" strokeWidth="1.5" />
      <circle cx="76" cy="96" r="7" fill="#007D9C" stroke="#FFFFFF" strokeWidth="1.5" />
    </svg>
    <div className="mt-1 px-3 py-1 bg-obsidian-900/90 border border-cyan-400 text-cyan-300 rounded-full text-xs font-black tracking-wider shadow-lg">
      ⚡ MAXIMUM GAINS!
    </div>
  </div>
);

/* ---------------- 3. DUMBBELL PRESS GOPHER (Lifting Barbell / Dumbbells) ---------------- */
const DumbbellPressGopher: React.FC<{ size: number }> = ({ size }) => (
  <div className="relative flex flex-col items-center justify-center">
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" className="filter drop-shadow-[0_0_25px_rgba(0,173,216,0.9)] animate-dumbbell-lift">
      <defs>
        <linearGradient id="gopherLiftGrad" x1="60" y1="15" x2="60" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#7FD5EA" />
          <stop offset="45%" stopColor="#00ADD8" />
          <stop offset="100%" stopColor="#007D9C" />
        </linearGradient>
      </defs>

      {/* Heavy Barbell / Dumbbell Lifted Overhead */}
      <g className="animate-barbell-bob">
        <line x1="12" y1="20" x2="108" y2="20" stroke="#94A3B8" strokeWidth="4" strokeLinecap="round" />
        {/* Left Heavy Plates */}
        <rect x="8" y="8" width="6" height="24" rx="2" fill="#1E293B" stroke="#00ADD8" strokeWidth="1.5" />
        <rect x="15" y="11" width="5" height="18" rx="2" fill="#334155" stroke="#00ADD8" strokeWidth="1.2" />
        {/* Right Heavy Plates */}
        <rect x="100" y="11" width="5" height="18" rx="2" fill="#334155" stroke="#00ADD8" strokeWidth="1.2" />
        <rect x="106" y="8" width="6" height="24" rx="2" fill="#1E293B" stroke="#00ADD8" strokeWidth="1.5" />
      </g>

      {/* Upward Reaching Arms Holding Bar */}
      <path d="M 40 50 L 32 20" stroke="#00ADD8" strokeWidth="8" strokeLinecap="round" />
      <path d="M 40 50 L 32 20" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <circle cx="32" cy="20" r="5.5" fill="#007D9C" stroke="#FFFFFF" strokeWidth="1.5" />

      <path d="M 80 50 L 88 20" stroke="#00ADD8" strokeWidth="8" strokeLinecap="round" />
      <path d="M 80 50 L 88 20" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <circle cx="88" cy="20" r="5.5" fill="#007D9C" stroke="#FFFFFF" strokeWidth="1.5" />

      {/* Gopher Body */}
      <path
        d="M 60 25 C 80 25 88 36 88 60 C 88 82 82 98 60 98 C 38 98 32 82 32 60 C 32 36 40 25 60 25 Z"
        fill="url(#gopherLiftGrad)"
        stroke="#FFFFFF"
        strokeWidth="2"
      />
      <ellipse cx="60" cy="70" rx="20" ry="18" fill="#C8EBFD" opacity="0.95" />

      {/* Eyes Focused Upward */}
      <circle cx="48" cy="44" r="8.5" fill="#FFFFFF" stroke="#0D0D0D" strokeWidth="1.6" />
      <circle cx="72" cy="44" r="8.5" fill="#FFFFFF" stroke="#0D0D0D" strokeWidth="1.6" />
      <circle cx="48" cy="40" r="4" fill="#0D0D0D" />
      <circle cx="72" cy="40" r="4" fill="#0D0D0D" />
      <circle cx="50" cy="38" r="1.5" fill="#FFFFFF" />
      <circle cx="74" cy="38" r="1.5" fill="#FFFFFF" />

      {/* Snout & Teeth */}
      <ellipse cx="60" cy="52" rx="4.8" ry="3.2" fill="#1E293B" />
      <rect x="56" y="55.5" width="3.8" height="5" rx="0.8" fill="#FFFFFF" stroke="#0D0D0D" strokeWidth="0.8" />
      <rect x="60.2" y="55.5" width="3.8" height="5" rx="0.8" fill="#FFFFFF" stroke="#0D0D0D" strokeWidth="0.8" />

      {/* Feet Planted Wide */}
      <circle cx="38" cy="98" r="7" fill="#007D9C" stroke="#FFFFFF" strokeWidth="1.5" />
      <circle cx="82" cy="98" r="7" fill="#007D9C" stroke="#FFFFFF" strokeWidth="1.5" />
    </svg>
    <div className="mt-1 px-3 py-1 bg-obsidian-900/90 border border-cyan-400 text-cyan-300 rounded-full text-xs font-black tracking-wider shadow-lg">
      🏋️‍♂️ HEAVY LIFT SUCCESS!
    </div>
  </div>
);

/* ---------------- 4. READING BOOK GOPHER (Study Desk & Glasses) ---------------- */
const ReadingBookGopher: React.FC<{ size: number }> = ({ size }) => (
  <div className="relative flex flex-col items-center justify-center">
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" className="filter drop-shadow-[0_0_20px_rgba(0,173,216,0.85)]">
      <defs>
        <linearGradient id="gopherStudyGrad" x1="60" y1="10" x2="60" y2="85" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#7FD5EA" />
          <stop offset="45%" stopColor="#00ADD8" />
          <stop offset="100%" stopColor="#007D9C" />
        </linearGradient>
      </defs>

      {/* Ambient Study Lamp Glow */}
      <path d="M 60 10 L 15 110 L 105 110 Z" fill="url(#lampLight)" opacity="0.15" />
      <linearGradient id="lampLight" x1="60" y1="10" x2="60" y2="110" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#00ADD8" stopOpacity="0" />
      </linearGradient>

      {/* Gopher Body */}
      <path
        d="M 60 14 C 80 14 88 26 88 50 C 88 74 82 88 60 88 C 38 88 32 74 32 50 C 32 26 40 14 60 14 Z"
        fill="url(#gopherStudyGrad)"
        stroke="#FFFFFF"
        strokeWidth="1.8"
      />
      {/* Ears */}
      <circle cx="34" cy="20" r="7.5" fill="#00ADD8" stroke="#FFFFFF" strokeWidth="1.4" />
      <circle cx="34" cy="20" r="3.5" fill="#BFE6FF" />
      <circle cx="86" cy="20" r="7.5" fill="#00ADD8" stroke="#FFFFFF" strokeWidth="1.4" />
      <circle cx="86" cy="20" r="3.5" fill="#BFE6FF" />

      {/* Eyes Looking Down into Book */}
      <circle cx="48" cy="38" r="9" fill="#FFFFFF" stroke="#0D0D0D" strokeWidth="1.5" />
      <circle cx="72" cy="38" r="9" fill="#FFFFFF" stroke="#0D0D0D" strokeWidth="1.5" />
      <circle cx="48" cy="41" r="4.5" fill="#0D0D0D" />
      <circle cx="72" cy="41" r="4.5" fill="#0D0D0D" />
      <circle cx="50" cy="40" r="1.5" fill="#FFFFFF" />
      <circle cx="74" cy="40" r="1.5" fill="#FFFFFF" />

      {/* Reading Glasses */}
      <circle cx="48" cy="38" r="11" stroke="#00E5FF" strokeWidth="2" fill="rgba(0, 229, 255, 0.15)" />
      <circle cx="72" cy="38" r="11" stroke="#00E5FF" strokeWidth="2" fill="rgba(0, 229, 255, 0.15)" />
      <line x1="59" y1="38" x2="61" y2="38" stroke="#00E5FF" strokeWidth="2.5" />

      {/* Snout & Teeth */}
      <ellipse cx="60" cy="46" rx="4.5" ry="3" fill="#1E293B" />
      <rect x="56.5" y="49" width="3.4" height="4.5" rx="0.8" fill="#FFFFFF" stroke="#0D0D0D" strokeWidth="0.8" />
      <rect x="60.2" y="49" width="3.4" height="4.5" rx="0.8" fill="#FFFFFF" stroke="#0D0D0D" strokeWidth="0.8" />

      {/* Wooden Study Desk */}
      <rect x="12" y="80" width="96" height="12" rx="3" fill="#1E293B" stroke="#00ADD8" strokeWidth="1.8" />

      {/* Big Glowing Open Tome Book on Desk */}
      <g className="animate-pulse">
        <path d="M 60 68 Q 38 58 20 64 L 20 86 Q 38 80 60 88 Q 82 80 100 86 L 100 64 Q 82 58 60 68 Z" fill="#0F172A" stroke="#00E5FF" strokeWidth="1.8" />
        <line x1="60" y1="68" x2="60" y2="88" stroke="#00E5FF" strokeWidth="2" />
        {/* Book text lines */}
        <line x1="28" y1="71" x2="52" y2="71" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="28" y1="76" x2="48" y2="76" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="68" y1="71" x2="92" y2="71" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="68" y1="76" x2="88" y2="76" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" />
      </g>

      {/* Paws Resting on Desk */}
      <circle cx="34" cy="80" r="5.5" fill="#007D9C" stroke="#FFFFFF" strokeWidth="1.4" />
      <circle cx="86" cy="80" r="5.5" fill="#007D9C" stroke="#FFFFFF" strokeWidth="1.4" />
    </svg>
    <div className="mt-1 px-3 py-1 bg-obsidian-900/90 border border-cyan-400 text-cyan-300 rounded-full text-xs font-black tracking-wider shadow-lg">
      📖 KNOWLEDGE UNLOCKED!
    </div>
  </div>
);

/* ---------------- 5. LAPTOP CODING GOPHER (Typing Matrix & Glowing Screen) ---------------- */
const LaptopCodingGopher: React.FC<{ size: number }> = ({ size }) => (
  <div className="relative flex flex-col items-center justify-center">
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" className="filter drop-shadow-[0_0_25px_rgba(0,173,216,0.9)]">
      <defs>
        <linearGradient id="gopherCodeGrad" x1="60" y1="10" x2="60" y2="85" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#7FD5EA" />
          <stop offset="45%" stopColor="#00ADD8" />
          <stop offset="100%" stopColor="#007D9C" />
        </linearGradient>
      </defs>

      {/* Gopher Body */}
      <path
        d="M 60 14 C 80 14 88 26 88 50 C 88 74 82 88 60 88 C 38 88 32 74 32 50 C 32 26 40 14 60 14 Z"
        fill="url(#gopherCodeGrad)"
        stroke="#FFFFFF"
        strokeWidth="1.8"
      />

      {/* Ears */}
      <circle cx="34" cy="20" r="7.5" fill="#00ADD8" stroke="#FFFFFF" strokeWidth="1.4" />
      <circle cx="34" cy="20" r="3.5" fill="#BFE6FF" />
      <circle cx="86" cy="20" r="7.5" fill="#00ADD8" stroke="#FFFFFF" strokeWidth="1.4" />
      <circle cx="86" cy="20" r="3.5" fill="#BFE6FF" />

      {/* Focused Coding Eyes */}
      <circle cx="48" cy="38" r="9" fill="#FFFFFF" stroke="#0D0D0D" strokeWidth="1.5" />
      <circle cx="72" cy="38" r="9" fill="#FFFFFF" stroke="#0D0D0D" strokeWidth="1.5" />
      <circle cx="48" cy="40" r="4.5" fill="#00ADD8" />
      <circle cx="72" cy="40" r="4.5" fill="#00ADD8" />
      <circle cx="50" cy="38" r="1.5" fill="#FFFFFF" />
      <circle cx="74" cy="38" r="1.5" fill="#FFFFFF" />

      {/* Snout & Teeth */}
      <ellipse cx="60" cy="46" rx="4.5" ry="3" fill="#1E293B" />
      <rect x="56.5" y="49" width="3.4" height="4.5" rx="0.8" fill="#FFFFFF" stroke="#0D0D0D" strokeWidth="0.8" />
      <rect x="60.2" y="49" width="3.4" height="4.5" rx="0.8" fill="#FFFFFF" stroke="#0D0D0D" strokeWidth="0.8" />

      {/* Modern Developer Laptop */}
      <g>
        {/* Laptop Screen with Terminal Glow */}
        <rect x="30" y="52" width="60" height="38" rx="4" fill="#090D16" stroke="#00E5FF" strokeWidth="2" />
        {/* Code Syntax on Screen */}
        <line x1="36" y1="60" x2="62" y2="60" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" />
        <line x1="40" y1="66" x2="80" y2="66" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
        <line x1="40" y1="72" x2="56" y2="72" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
        <line x1="36" y1="78" x2="74" y2="78" stroke="#A855F7" strokeWidth="2" strokeLinecap="round" />

        {/* Laptop Keyboard Base */}
        <path d="M 18 90 L 102 90 L 96 102 L 24 102 Z" fill="#1E293B" stroke="#00E5FF" strokeWidth="1.8" />
      </g>

      {/* Rapid Typing Paws */}
      <circle cx="44" cy="88" r="6" fill="#007D9C" stroke="#FFFFFF" strokeWidth="1.5" className="animate-typing-paw-left" />
      <circle cx="76" cy="88" r="6" fill="#007D9C" stroke="#FFFFFF" strokeWidth="1.5" className="animate-typing-paw-right" />
    </svg>
    <div className="mt-1 px-3 py-1 bg-obsidian-900/90 border border-cyan-400 text-cyan-300 rounded-full text-xs font-black tracking-wider shadow-lg">
      💻 CODE SHIPPED TO PRODUCTION!
    </div>
  </div>
);

/* ---------------- 6. ZEN MEDITATE GOPHER (Lotus Pose & Inner Calm) ---------------- */
const ZenMeditateGopher: React.FC<{ size: number }> = ({ size }) => (
  <div className="relative flex flex-col items-center justify-center">
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" className="filter drop-shadow-[0_0_30px_rgba(0,229,255,0.95)] animate-meditate-float">
      <defs>
        <radialGradient id="zenAuraGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.8" />
          <stop offset="60%" stopColor="#00ADD8" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="gopherZenGrad" x1="60" y1="15" x2="60" y2="90" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#7FD5EA" />
          <stop offset="45%" stopColor="#00ADD8" />
          <stop offset="100%" stopColor="#007D9C" />
        </linearGradient>
      </defs>

      {/* Floating Zen Ripples & Aura */}
      <circle cx="60" cy="60" r="52" fill="url(#zenAuraGrad)" />
      <circle cx="60" cy="60" r="48" stroke="#00E5FF" strokeWidth="1.5" strokeDasharray="4 6" className="animate-spin" style={{ animationDuration: '10s' }} />

      {/* Gopher Body Floating in Lotus Pose */}
      <path
        d="M 60 18 C 82 18 90 30 90 54 C 90 76 84 90 60 90 C 36 90 30 76 30 54 C 30 30 38 18 60 18 Z"
        fill="url(#gopherZenGrad)"
        stroke="#FFFFFF"
        strokeWidth="2"
      />
      <ellipse cx="60" cy="66" rx="22" ry="18" fill="#C8EBFD" opacity="0.95" />

      {/* Ears */}
      <circle cx="34" cy="24" r="7.5" fill="#00ADD8" stroke="#FFFFFF" strokeWidth="1.4" />
      <circle cx="34" cy="24" r="3.5" fill="#BFE6FF" />
      <circle cx="86" cy="24" r="7.5" fill="#00ADD8" stroke="#FFFFFF" strokeWidth="1.4" />
      <circle cx="86" cy="24" r="3.5" fill="#BFE6FF" />

      {/* Serene Closed Eyes (Zen Meditation Smile) */}
      <path d="M 40 42 Q 48 35 56 42" stroke="#0D0D0D" strokeWidth="2.8" strokeLinecap="round" fill="none" />
      <path d="M 64 42 Q 72 35 80 42" stroke="#0D0D0D" strokeWidth="2.8" strokeLinecap="round" fill="none" />

      {/* Snout & Gentle Smile */}
      <ellipse cx="60" cy="48" rx="4.8" ry="3.2" fill="#1E293B" />
      <rect x="56" y="51.5" width="3.8" height="4.5" rx="0.8" fill="#FFFFFF" stroke="#0D0D0D" strokeWidth="0.8" />
      <rect x="60.2" y="51.5" width="3.8" height="4.5" rx="0.8" fill="#FFFFFF" stroke="#0D0D0D" strokeWidth="0.8" />

      {/* Lotus Crossed Legs at Base */}
      <ellipse cx="40" cy="86" rx="14" ry="7" fill="#007D9C" stroke="#FFFFFF" strokeWidth="1.5" />
      <ellipse cx="80" cy="86" rx="14" ry="7" fill="#007D9C" stroke="#FFFFFF" strokeWidth="1.5" />

      {/* Mudra Meditation Paws Resting on Knees */}
      <circle cx="32" cy="74" r="6" fill="#00ADD8" stroke="#FFFFFF" strokeWidth="1.5" />
      <circle cx="88" cy="74" r="6" fill="#00ADD8" stroke="#FFFFFF" strokeWidth="1.5" />
      <circle cx="32" cy="74" r="2" fill="#00E5FF" />
      <circle cx="88" cy="74" r="2" fill="#00E5FF" />
    </svg>
    <div className="mt-1 px-3 py-1 bg-obsidian-900/90 border border-cyan-400 text-cyan-300 rounded-full text-xs font-black tracking-wider shadow-lg">
      🧘 DEEP MINDFULNESS ACHIEVED!
    </div>
  </div>
);

/* ---------------- 7. WATER CHUG GOPHER (Hydration Bottle & Bubbles) ---------------- */
const WaterChugGopher: React.FC<{ size: number }> = ({ size }) => (
  <div className="relative flex flex-col items-center justify-center">
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" className="filter drop-shadow-[0_0_20px_rgba(0,173,216,0.85)] animate-mascot-happy">
      <defs>
        <linearGradient id="gopherWaterGrad" x1="60" y1="15" x2="60" y2="95" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#7FD5EA" />
          <stop offset="45%" stopColor="#00ADD8" />
          <stop offset="100%" stopColor="#007D9C" />
        </linearGradient>
      </defs>

      {/* Hydro Gopher Body */}
      <path
        d="M 60 20 C 82 20 90 32 90 56 C 90 78 84 96 60 96 C 36 96 30 78 30 56 C 30 32 38 20 60 20 Z"
        fill="url(#gopherWaterGrad)"
        stroke="#FFFFFF"
        strokeWidth="2"
      />
      <ellipse cx="60" cy="68" rx="22" ry="20" fill="#C8EBFD" opacity="0.95" />

      {/* Ears */}
      <circle cx="34" cy="24" r="7.5" fill="#00ADD8" stroke="#FFFFFF" strokeWidth="1.4" />
      <circle cx="34" cy="24" r="3.5" fill="#BFE6FF" />
      <circle cx="86" cy="24" r="7.5" fill="#00ADD8" stroke="#FFFFFF" strokeWidth="1.4" />
      <circle cx="86" cy="24" r="3.5" fill="#BFE6FF" />

      {/* Happy Gulping Eyes */}
      <path d="M 40 40 Q 48 33 56 40" stroke="#0D0D0D" strokeWidth="2.8" strokeLinecap="round" fill="none" />
      <path d="M 64 40 Q 72 33 80 40" stroke="#0D0D0D" strokeWidth="2.8" strokeLinecap="round" fill="none" />

      {/* Snout & Buck Teeth */}
      <ellipse cx="60" cy="46" rx="4.8" ry="3.2" fill="#1E293B" />
      <rect x="56" y="49.5" width="3.8" height="5" rx="0.8" fill="#FFFFFF" stroke="#0D0D0D" strokeWidth="0.8" />
      <rect x="60.2" y="49.5" width="3.8" height="5" rx="0.8" fill="#FFFFFF" stroke="#0D0D0D" strokeWidth="0.8" />

      {/* Large Crystal Clear Water Jug Chugged in Both Paws */}
      <g className="animate-chug-tilt">
        <rect x="44" y="52" width="32" height="42" rx="6" fill="rgba(56, 189, 248, 0.4)" stroke="#00E5FF" strokeWidth="2" />
        <ellipse cx="60" cy="52" rx="16" ry="4" fill="#0284C7" stroke="#00E5FF" strokeWidth="1.5" />
        <rect x="54" y="44" width="12" height="9" rx="2" fill="#0284C7" stroke="#00E5FF" strokeWidth="1.5" />
        {/* Water Level & Sparkles */}
        <rect x="47" y="62" width="26" height="28" rx="4" fill="#0284C7" opacity="0.75" />
        <circle cx="53" cy="74" r="2.5" fill="#FFFFFF" opacity="0.9" />
        <circle cx="65" cy="80" r="2" fill="#FFFFFF" opacity="0.9" />
      </g>

      {/* Paws Clasping Bottle */}
      <circle cx="42" cy="70" r="5.5" fill="#007D9C" stroke="#FFFFFF" strokeWidth="1.5" />
      <circle cx="78" cy="70" r="5.5" fill="#007D9C" stroke="#FFFFFF" strokeWidth="1.5" />
    </svg>
    <div className="mt-1 px-3 py-1 bg-obsidian-900/90 border border-cyan-400 text-cyan-300 rounded-full text-xs font-black tracking-wider shadow-lg">
      💧 100% HYDRATED!
    </div>
  </div>
);

/* ---------------- 8. CELEBRATE JUMP GOPHER (Victory Jump & Confetti) ---------------- */
const CelebrateJumpGopher: React.FC<{ size: number }> = ({ size }) => (
  <div className="relative flex flex-col items-center justify-center">
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" className="filter drop-shadow-[0_0_30px_rgba(0,229,255,1)] animate-mascot-celebrate">
      <defs>
        <linearGradient id="gopherJumpGrad" x1="60" y1="10" x2="60" y2="85" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#7FD5EA" />
          <stop offset="45%" stopColor="#00ADD8" />
          <stop offset="100%" stopColor="#007D9C" />
        </linearGradient>
      </defs>

      {/* Upward Reaching Victorious Arms */}
      <path d="M 40 45 L 20 15" stroke="#00ADD8" strokeWidth="8" strokeLinecap="round" />
      <path d="M 40 45 L 20 15" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <circle cx="20" cy="15" r="6" fill="#007D9C" stroke="#FFFFFF" strokeWidth="1.5" />

      <path d="M 80 45 L 100 15" stroke="#00ADD8" strokeWidth="8" strokeLinecap="round" />
      <path d="M 80 45 L 100 15" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <circle cx="100" cy="15" r="6" fill="#007D9C" stroke="#FFFFFF" strokeWidth="1.5" />

      {/* Gopher Body in Mid-Air Jump */}
      <path
        d="M 60 16 C 82 16 90 28 90 52 C 90 74 84 88 60 88 C 36 88 30 74 30 52 C 30 28 38 16 60 16 Z"
        fill="url(#gopherJumpGrad)"
        stroke="#FFFFFF"
        strokeWidth="2"
      />
      <ellipse cx="60" cy="62" rx="22" ry="18" fill="#C8EBFD" opacity="0.95" />

      {/* Ears */}
      <circle cx="34" cy="20" r="7.5" fill="#00ADD8" stroke="#FFFFFF" strokeWidth="1.4" />
      <circle cx="34" cy="20" r="3.5" fill="#BFE6FF" />
      <circle cx="86" cy="20" r="7.5" fill="#00ADD8" stroke="#FFFFFF" strokeWidth="1.4" />
      <circle cx="86" cy="20" r="3.5" fill="#BFE6FF" />

      {/* Cheerful Victorious Eyes */}
      <path d="M 40 38 Q 48 30 56 38" stroke="#0D0D0D" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M 64 38 Q 72 30 80 38" stroke="#0D0D0D" strokeWidth="3" strokeLinecap="round" fill="none" />

      {/* Snout & Big Grinning Teeth */}
      <ellipse cx="60" cy="45" rx="5" ry="3.5" fill="#1E293B" />
      <rect x="55.5" y="48.5" width="4.2" height="6" rx="1" fill="#FFFFFF" stroke="#0D0D0D" strokeWidth="0.9" />
      <rect x="60.3" y="48.5" width="4.2" height="6" rx="1" fill="#FFFFFF" stroke="#0D0D0D" strokeWidth="0.9" />

      {/* Jump Tucked Feet */}
      <circle cx="44" cy="90" r="7" fill="#007D9C" stroke="#FFFFFF" strokeWidth="1.5" />
      <circle cx="76" cy="90" r="7" fill="#007D9C" stroke="#FFFFFF" strokeWidth="1.5" />
    </svg>
    <div className="mt-1 px-3 py-1 bg-obsidian-900/90 border border-cyan-400 text-cyan-300 rounded-full text-xs font-black tracking-wider shadow-lg">
      🎉 LEVEL UP CELEBRATION!
    </div>
  </div>
);

/* ---------------- 9. COFFEE SIP GOPHER (Default Steaming Java Mug) ---------------- */
const CoffeeSipGopher: React.FC<{ size: number }> = ({ size }) => (
  <div className="relative flex flex-col items-center justify-center">
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className="filter drop-shadow-[0_0_25px_rgba(0,173,216,0.9)] animate-mascot-happy">
      <defs>
        <radialGradient id="gopherSipGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00ADD8" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#007D9C" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#004D40" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="gopherBodyGradSip" x1="50" y1="10" x2="50" y2="82" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#7FD5EA" />
          <stop offset="40%" stopColor="#00ADD8" />
          <stop offset="100%" stopColor="#007D9C" />
        </linearGradient>
      </defs>

      <circle cx="50" cy="48" r="46" fill="url(#gopherSipGlow)" />

      {/* Ears */}
      <circle cx="25" cy="18" r="8.5" fill="#00ADD8" stroke="#FFFFFF" strokeWidth="1.5" />
      <circle cx="25" cy="18" r="4.5" fill="#BFE6FF" />
      <circle cx="75" cy="18" r="8.5" fill="#00ADD8" stroke="#FFFFFF" strokeWidth="1.5" />
      <circle cx="75" cy="18" r="4.5" fill="#BFE6FF" />

      {/* Gopher Body */}
      <path
        d="M 50 12 C 72 12 82 22 82 44 C 82 66 78 84 50 84 C 22 84 18 66 18 44 C 18 22 28 12 50 12 Z"
        fill="url(#gopherBodyGradSip)"
        stroke="#FFFFFF"
        strokeWidth="1.8"
      />
      <ellipse cx="50" cy="58" rx="20" ry="18" fill="#C8EBFD" opacity="0.95" />

      {/* Big Bulging Gopher Eyes */}
      <circle cx="36" cy="32" r="10.5" fill="#FFFFFF" stroke="#0D0D0D" strokeWidth="1.8" />
      <circle cx="64" cy="32" r="10.5" fill="#FFFFFF" stroke="#0D0D0D" strokeWidth="1.8" />
      <path d="M 30 32 Q 36 25 42 32" stroke="#0D0D0D" strokeWidth="2.8" strokeLinecap="round" />
      <path d="M 58 32 Q 64 25 70 32" stroke="#0D0D0D" strokeWidth="2.8" strokeLinecap="round" />

      {/* Snout & Teeth */}
      <ellipse cx="50" cy="41" rx="5" ry="3.5" fill="#1E293B" />
      <circle cx="51.5" cy="40" r="1.2" fill="#FFFFFF" opacity="0.8" />
      <rect x="45.5" y="44.5" width="4.2" height="6" rx="1" fill="#FFFFFF" stroke="#0D0D0D" strokeWidth="0.9" />
      <rect x="50.3" y="44.5" width="4.2" height="6" rx="1" fill="#FFFFFF" stroke="#0D0D0D" strokeWidth="0.9" />

      {/* Cheeks */}
      <circle cx="24" cy="40" r="3.8" fill="#FF8A80" opacity="0.5" />
      <circle cx="76" cy="40" r="3.8" fill="#FF8A80" opacity="0.5" />

      {/* PROMINENT JAVA COFFEE MUG */}
      <path d="M 68 59 C 78 59 78 75 68 75" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" fill="none" />
      <path
        d="M 32 54 L 68 54 L 64 80 C 64 83 61 86 57 86 L 43 86 C 39 86 36 83 36 80 Z"
        fill="#FFFFFF"
        stroke="#1A1A1A"
        strokeWidth="1.8"
      />
      <ellipse cx="50" cy="54" rx="17" ry="3" fill="#3E2723" stroke="#1A1A1A" strokeWidth="1.2" />

      {/* HIGH RESOLUTION JAVA LOGO EMBED */}
      <image
        href={JAVA_LOGO_DATA_URI}
        x="38"
        y="58"
        width="24"
        height="24"
        preserveAspectRatio="xMidYMid meet"
      />

      {/* Steam Wisps */}
      <path d="M 44 50 Q 40 44 45 40" stroke="#E0F7FA" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M 50 49 Q 54 43 49 38" stroke="#80DEEA" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <path d="M 56 50 Q 60 44 55 39" stroke="#E0F7FA" strokeWidth="1.8" strokeLinecap="round" fill="none" />

      {/* Paws */}
      <circle cx="31" cy="65" r="5" fill="#00ADD8" stroke="#FFFFFF" strokeWidth="1.4" />
      <circle cx="69" cy="65" r="5" fill="#00ADD8" stroke="#FFFFFF" strokeWidth="1.4" />
    </svg>
    <div className="mt-1 px-3 py-1 bg-obsidian-900/90 border border-cyan-400 text-cyan-300 rounded-full text-xs font-black tracking-wider shadow-lg">
      ☕ FRESH JAVA SIP!
    </div>
  </div>
);
