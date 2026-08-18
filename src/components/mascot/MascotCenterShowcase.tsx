import React from 'react';
import { MascotStage, MascotMood, MascotActionType } from '../../types/mascot';
import { MascotActionPose } from './MascotActionPose';

interface MascotCenterShowcaseProps {
  stage: MascotStage;
  mood: MascotMood;
  action?: MascotActionType;
  message?: string;
  subMessage?: string;
}

export const MascotCenterShowcase: React.FC<MascotCenterShowcaseProps> = ({
  stage,
  mood,
  action = 'coffee_sip',
  message = 'TASK COMPLETE!',
  subMessage = 'Gopher Power +25 XP'
}) => {
  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
      {/* Dim backdrop with acrylic blur */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in" />

      {/* Hero Mascot in the Center */}
      <div className="relative z-10 flex flex-col items-center animate-center-hero">
        {/* Giant Azure Radial Glow Aura */}
        <div className="absolute -inset-10 rounded-full bg-gradient-to-r from-cyan-600/50 via-cyan-400/40 to-blue-500/50 blur-3xl animate-pulse" />

        {/* Mascot with Category Action Pose */}
        <div className="relative">
          <MascotActionPose
            stage={stage}
            mood={mood}
            action={action}
            size={220}
          />
        </div>

        {/* Dynamic Celebration Text Banner */}
        <div className="mt-4 px-6 py-2.5 glass-panel rounded-2xl border border-cyan-500/60 text-center shadow-[0_0_30px_rgba(0,173,216,0.6)]">
          <h2 className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyan-400 tracking-wider">
            {message}
          </h2>
          <p className="text-xs font-bold text-cyan-300 mt-0.5">
            {subMessage}
          </p>
        </div>
      </div>
    </div>
  );
};
