import React, { useMemo } from 'react';
import { MascotStage, MascotMood } from '../../types/mascot';
import { NoviceSvg } from './stages/NoviceSvg';
import { EmberSvg } from './stages/EmberSvg';
import { KnightSvg } from './stages/KnightSvg';
import { SolarChampionSvg } from './stages/SolarChampionSvg';
import { AscendantSvg } from './stages/AscendantSvg';

interface MascotDisplayProps {
  stage: MascotStage;
  mood: MascotMood;
  size?: number;
  showDialogue?: boolean;
  dialogueText?: string;
  className?: string;
  onClick?: () => void;
}

export const MascotDisplay: React.FC<MascotDisplayProps> = ({
  stage,
  mood,
  size = 110,
  showDialogue = false,
  dialogueText,
  className = '',
  onClick
}) => {
  const StageComponent = useMemo(() => {
    switch (stage) {
      case 'novice': return NoviceSvg;
      case 'ember': return EmberSvg;
      case 'knight': return KnightSvg;
      case 'solar_champion': return SolarChampionSvg;
      case 'ascendant': return AscendantSvg;
      default: return NoviceSvg;
    }
  }, [stage]);

  const moodAnimation = useMemo(() => {
    switch (mood) {
      case 'happy': return 'scale-110 -translate-y-2';
      case 'celebrating': return 'animate-bounce scale-110';
      case 'sad': return 'translate-y-1 opacity-75 grayscale-[30%]';
      case 'determined': return 'scale-105';
      default: return 'animate-idle-float';
    }
  }, [mood]);

  return (
    <div
      className={`relative inline-flex flex-col items-center select-none cursor-pointer group ${className}`}
      onClick={onClick}
    >
      {/* Dynamic Aura Glow */}
      <div
        className="absolute inset-0 rounded-full blur-xl opacity-40 group-hover:opacity-70 transition-opacity pointer-events-none"
        style={{
          background: stage === 'ascendant'
            ? 'radial-gradient(circle, #FF7A00 0%, #E040FB 60%, transparent 80%)'
            : 'radial-gradient(circle, #FF5722 0%, #FF9800 50%, transparent 80%)'
        }}
      />

      {/* SVG Canvas */}
      <div
        className={`relative z-10 transition-all duration-300 ${moodAnimation}`}
        style={{ width: size, height: size }}
      >
        <StageComponent mood={mood} size={size} />
      </div>

      {/* Floating Dialogue Bubble */}
      {showDialogue && dialogueText && (
        <div className="absolute -top-10 z-20 px-3 py-1 bg-obsidian-800 border border-flame-500/50 rounded-lg shadow-lg shadow-black/80 text-xs font-medium text-white whitespace-nowrap">
          {dialogueText}
          <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-2 h-2 bg-obsidian-800 border-b border-r border-flame-500/50 rotate-45" />
        </div>
      )}
    </div>
  );
};
