import React from 'react';
import { useHabits } from '../../context/HabitContext';
import { STAGE_CONFIGS } from '../../utils/levelingMath';
import { MascotDisplay } from './MascotDisplay';
import { MascotStage } from '../../types/mascot';
import { Sparkles, Shield, Trophy } from 'lucide-react';

export const MascotSanctum: React.FC = () => {
  const { progression, mascotMood } = useHabits();

  const stages: MascotStage[] = ['novice', 'ember', 'knight', 'solar_champion', 'ascendant'];

  return (
    <div className="space-y-6">
      {/* Current Mascot Stage Hero Card */}
      <div className="relative overflow-hidden p-6 glass-panel border border-flame-500/40 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2 px-3 py-1 bg-flame-600/20 text-flame-400 border border-flame-500/30 rounded-full text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tier {stages.indexOf(progression.stage) + 1} Mascot</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-wide">
            {progression.stageConfig.name}
          </h2>
          <div className="text-sm font-semibold text-flame-400 mb-2">
            {progression.stageConfig.title} &bull; Level {progression.level}
          </div>
          <p className="text-xs text-zinc-300 max-w-md">
            {progression.stageConfig.description}
          </p>

          <div className="flex items-center gap-4 mt-4 text-xs font-medium text-zinc-400">
            <div className="flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Total XP: {progression.totalXp}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-blue-400" />
              <span>Streak Freezes: {progression.availableFreezes}</span>
            </div>
          </div>
        </div>

        {/* Large Animated Mascot */}
        <div className="p-4 bg-black/50 rounded-2xl border border-white/10 backdrop-blur-md">
          <MascotDisplay
            stage={progression.stage}
            mood={mascotMood}
            size={160}
            showDialogue={true}
            dialogueText={`Level ${progression.level} • Ignis is energized!`}
          />
        </div>
      </div>

      {/* Evolution Tiers Roadmap */}
      <div className="p-5 glass-panel rounded-2xl">
        <h3 className="font-bold text-white text-base mb-4">Evolution Roadmap</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {stages.map((stageKey, idx) => {
            const config = STAGE_CONFIGS[stageKey];
            const isUnlocked = progression.level >= config.minLevel;
            const isCurrent = progression.stage === stageKey;

            return (
              <div
                key={stageKey}
                className={`p-4 rounded-xl border flex flex-col items-center text-center transition-all ${
                  isCurrent
                    ? 'bg-flame-600/20 border-flame-500 shadow-[0_0_15px_rgba(255,87,34,0.3)] backdrop-blur-md'
                    : isUnlocked
                    ? 'glass-subcard'
                    : 'bg-black/40 border-white/5 opacity-40 grayscale backdrop-blur-sm'
                }`}
              >
                <div className="text-[10px] font-mono font-bold text-zinc-500 mb-2 uppercase">
                  Stage {idx + 1}
                </div>

                <MascotDisplay stage={stageKey} mood="neutral" size={70} />

                <div className="font-bold text-white text-sm mt-3">{config.title}</div>
                <div className="text-[11px] text-flame-400 font-semibold mb-2">
                  Lv. {config.minLevel}+
                </div>
                <div className="text-[11px] text-zinc-400 line-clamp-2">
                  {config.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
