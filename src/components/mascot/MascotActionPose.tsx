import React from 'react';
import { MascotStage, MascotMood, MascotActionType } from '../../types/mascot';
import { MascotDisplay } from './MascotDisplay';

interface MascotActionPoseProps {
  stage: MascotStage;
  mood: MascotMood;
  action?: MascotActionType;
  size?: number;
}

export const MascotActionPose: React.FC<MascotActionPoseProps> = ({
  stage,
  mood,
  action = 'coffee_sip',
  size = 220
}) => {
  return (
    <div style={{ width: size, height: size }} className="relative flex items-center justify-center">
      {/* Base mascot */}
      <MascotDisplay
        stage={stage}
        mood={mood}
        size={size}
        className="filter drop-shadow-[0_0_35px_rgba(0,173,216,0.85)]"
      />

      {/* Dynamic Action Overlays / Props rendered cleanly per category */}
      {action === 'push_up' && (
        <div className="absolute -bottom-2 flex flex-col items-center animate-bounce">
          <div className="px-3 py-1 bg-obsidian-900/90 border border-flame-400 text-flame-400 rounded-full text-xs font-black shadow-lg">
            💪 1 MORE REP!
          </div>
        </div>
      )}

      {action === 'bicep_flex' && (
        <div className="absolute -top-3 right-4 animate-pulse">
          <span className="text-3xl filter drop-shadow-[0_0_10px_#00ADD8]">⚡</span>
        </div>
      )}

      {action === 'dumbbell_press' && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-mascot-happy">
          <svg width={size * 0.9} height={size * 0.9} viewBox="0 0 100 100" fill="none">
            {/* Dumbbells in paws */}
            <rect x="10" y="58" width="8" height="16" rx="2" fill="#374151" stroke="#00ADD8" strokeWidth="1.5" />
            <rect x="82" y="58" width="8" height="16" rx="2" fill="#374151" stroke="#00ADD8" strokeWidth="1.5" />
            <line x1="14" y1="66" x2="28" y2="66" stroke="#9CA3AF" strokeWidth="3" />
            <line x1="72" y1="66" x2="86" y2="66" stroke="#9CA3AF" strokeWidth="3" />
          </svg>
        </div>
      )}

      {action === 'reading_book' && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none animate-pulse">
          <svg width="84" height="42" viewBox="0 0 84 42" fill="none">
            {/* Open Book */}
            <path d="M 42 12 Q 22 4 4 10 L 4 34 Q 22 28 42 36 Q 62 28 80 34 L 80 10 Q 62 4 42 12 Z" fill="#1E293B" stroke="#00ADD8" strokeWidth="2" />
            <line x1="42" y1="12" x2="42" y2="36" stroke="#00ADD8" strokeWidth="2" />
            <line x1="12" y1="18" x2="34" y2="18" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="12" y1="24" x2="30" y2="24" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="50" y1="18" x2="72" y2="18" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="54" y1="24" x2="72" y2="24" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      )}

      {action === 'laptop_coding' && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none">
          <svg width="88" height="48" viewBox="0 0 88 48" fill="none">
            {/* Laptop screen */}
            <rect x="18" y="4" width="52" height="32" rx="3" fill="#0F172A" stroke="#00ADD8" strokeWidth="2" />
            {/* Code lines on screen */}
            <line x1="24" y1="12" x2="46" y2="12" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" />
            <line x1="28" y1="18" x2="58" y2="18" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
            <line x1="28" y1="24" x2="42" y2="24" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
            {/* Laptop base */}
            <path d="M 8 36 L 80 36 L 74 44 L 14 44 Z" fill="#334155" stroke="#00ADD8" strokeWidth="1.5" />
          </svg>
        </div>
      )}

      {action === 'zen_meditate' && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          {/* Zen ripples */}
          <div className="w-56 h-56 rounded-full border border-cyan-400/40 animate-ping" />
          <div className="absolute -top-4 text-xs font-mono font-bold text-cyan-300 tracking-widest bg-obsidian-900/90 px-3 py-1 rounded-full border border-cyan-500/50">
            🧘 INNER FOCUS
          </div>
        </div>
      )}

      {action === 'water_chug' && (
        <div className="absolute -top-3 left-6 text-2xl animate-bounce">
          💧
        </div>
      )}
    </div>
  );
};
