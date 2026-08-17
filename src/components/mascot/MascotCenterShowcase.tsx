import React from 'react';
import { MascotStage, MascotMood } from '../../types/mascot';
import { MascotDisplay } from './MascotDisplay';

interface MascotCenterShowcaseProps {
  stage: MascotStage;
  mood: MascotMood;
  message?: string;
  subMessage?: string;
}

export const MascotCenterShowcase: React.FC<MascotCenterShowcaseProps> = ({
  stage,
  mood,
  message = 'TASK COMPLETE!',
  subMessage = 'Java Coffee Power +25 XP'
}) => {
  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
      {/* Dim backdrop with acrylic blur */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in" />

      {/* Hero Mascot in the Center */}
      <div className="relative z-10 flex flex-col items-center animate-center-hero">
        {/* Giant Radial Glow Aura */}
        <div className="absolute -inset-10 rounded-full bg-gradient-to-r from-flame-600/60 via-flame-400/50 to-amber-500/60 blur-3xl animate-pulse" />

        {/* Mascot */}
        <div className="relative transform hover:scale-105 transition-transform">
          <MascotDisplay
            stage={stage}
            mood={mood}
            size={220}
            className="filter drop-shadow-[0_0_35px_rgba(255,122,0,0.9)]"
          />
        </div>

        {/* Dynamic Celebration Text Banner */}
        <div className="mt-4 px-6 py-2.5 glass-panel rounded-2xl border border-flame-500/60 text-center shadow-[0_0_30px_rgba(255,87,34,0.6)]">
          <h2 className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-200 to-flame-400 tracking-wider">
            {message}
          </h2>
          <p className="text-xs font-bold text-flame-400 mt-0.5">
            {subMessage}
          </p>
        </div>
      </div>
    </div>
  );
};
