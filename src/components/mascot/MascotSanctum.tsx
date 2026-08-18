import React, { useState } from 'react';
import { useHabits } from '../../context/HabitContext';
import { STAGE_CONFIGS } from '../../utils/levelingMath';
import { MascotDisplay } from './MascotDisplay';
import { MascotActionPose } from './MascotActionPose';
import { MascotStage, MascotActionType } from '../../types/mascot';
import { Sparkles, Shield, Trophy, Play, Eye, Flame, Dumbbell, BookOpen, Laptop, Heart, Droplets, PartyPopper, Coffee } from 'lucide-react';

interface ActionMeta {
  id: MascotActionType;
  name: string;
  category: string;
  icon: React.ElementType;
  badgeText: string;
  desc: string;
}

const ALL_ACTIONS: ActionMeta[] = [
  { id: 'coffee_sip', name: 'Java Coffee Sip', category: 'General / Rest', icon: Coffee, badgeText: '☕ JAVA BREW', desc: 'Sipping freshly brewed Java espresso from official mug' },
  { id: 'push_up', name: 'Horizontal Plank Push-up', category: 'Fitness', icon: Dumbbell, badgeText: '💪 100 REPS', desc: 'Plank dip workout on gym mat with muscle arms' },
  { id: 'bicep_flex', name: 'Bicep Peak Flex', category: 'Fitness', icon: Flame, badgeText: '⚡ MAX GAINS', desc: 'Buff dual-bicep flex with sweatband and lightning aura' },
  { id: 'dumbbell_press', name: 'Barbell Heavy Press', category: 'Fitness', icon: Dumbbell, badgeText: '🏋️ OVERHEAD LIFT', desc: 'Heavy barbell press lifted overhead with wide stance' },
  { id: 'reading_book', name: 'Study & Reading Tome', category: 'Learning', icon: BookOpen, badgeText: '📖 KNOWLEDGE', desc: 'Reading glasses and glowing book tome on study desk' },
  { id: 'laptop_coding', name: 'IDE Code Terminal', category: 'Productivity', icon: Laptop, badgeText: '💻 SHIPPED CODE', desc: 'Rapid paws typing on glowing IDE compiler terminal' },
  { id: 'zen_meditate', name: 'Zen Lotus Meditation', category: 'Mindset', icon: Heart, badgeText: '🧘 INNER PEACE', desc: 'Floating lotus pose with mudra paws and zen ripples' },
  { id: 'water_chug', name: 'Hydration Jug Chug', category: 'Health', icon: Droplets, badgeText: '💧 100% HYDRATED', desc: 'Dual-paw water bottle chug with refreshing bubbles' },
  { id: 'celebrate_jump', name: 'Victory Jump & Confetti', category: 'Level Up', icon: PartyPopper, badgeText: '🎉 LEVEL UP!', desc: 'Mid-air victory celebration with raised paws' },
];

export const MascotSanctum: React.FC = () => {
  const { progression, mascotMood, triggerShowcase } = useHabits();

  const stages: MascotStage[] = ['novice', 'ember', 'knight', 'solar_champion', 'ascendant'];

  // Animation Studio Playground State
  const [previewAction, setPreviewAction] = useState<MascotActionType>('push_up');
  const [previewStage, setPreviewStage] = useState<MascotStage>(progression.stage);

  const handleTestShowcase = (action: MascotActionType, title: string) => {
    triggerShowcase(
      title.toUpperCase(),
      `Interactive Preview • ${ALL_ACTIONS.find(a => a.id === action)?.desc || 'Gopher Action'}`,
      'celebrating',
      action,
      3000
    );
  };

  return (
    <div className="space-y-6">
      {/* Hero Sanctum Banner */}
      <div className="relative overflow-hidden p-6 glass-panel border border-cyan-500/40 rounded-2xl flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <div className="flex items-center gap-2 px-3 py-1 bg-cyan-600/20 text-cyan-400 border border-cyan-500/30 rounded-full text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tier {stages.indexOf(progression.stage) + 1} Companion</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-wide">
            {progression.stageConfig.name}
          </h2>
          <div className="text-sm font-semibold text-cyan-400 mb-2">
            {progression.stageConfig.title} &bull; Level {progression.level}
          </div>
          <p className="text-xs text-zinc-300 max-w-md">
            {progression.stageConfig.description}
          </p>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-4 text-xs font-medium text-zinc-400">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-black/40 rounded-xl border border-white/10">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Total XP: <strong className="text-white">{progression.totalXp}</strong></span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-black/40 rounded-xl border border-white/10">
              <Shield className="w-4 h-4 text-cyan-400" />
              <span>Freezes: <strong className="text-white">{progression.availableFreezes}</strong></span>
            </div>
          </div>
        </div>

        {/* Current Active Mascot Stage */}
        <div className="p-5 bg-black/50 rounded-2xl border border-cyan-500/20 backdrop-blur-md flex flex-col items-center">
          <MascotDisplay
            stage={progression.stage}
            mood={mascotMood}
            size={160}
            showDialogue={true}
            dialogueText={`Level ${progression.level} • Gopher is energized!`}
          />
        </div>
      </div>

      {/* Interactive Mascot Animation Studio & Tester */}
      <div className="p-5 glass-panel rounded-2xl border border-cyan-500/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
          <div>
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-cyan-400" />
              <h3 className="font-bold text-white text-lg">Mascot Animation Studio</h3>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              Live preview & test all category action poses across evolution stages
            </p>
          </div>

          <button
            type="button"
            onClick={() => handleTestShowcase(previewAction, ALL_ACTIONS.find(a => a.id === previewAction)?.name || 'Showcase')}
            className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white font-bold text-xs rounded-xl shadow-lg shadow-cyan-600/30 border border-cyan-400/30 transition-all self-start sm:self-auto"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            Test Center Zoom Overlay
          </button>
        </div>

        {/* Studio Layout: Left Controls + Right Live Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
          {/* Controls */}
          <div className="lg:col-span-7 space-y-4">
            {/* Action Selector Chips */}
            <div>
              <label className="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-wider block mb-2">
                1. Select Action Pose ({ALL_ACTIONS.length} actions)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {ALL_ACTIONS.map((act) => {
                  const Icon = act.icon;
                  const isSelected = previewAction === act.id;
                  return (
                    <button
                      key={act.id}
                      type="button"
                      onClick={() => setPreviewAction(act.id)}
                      className={`flex items-center gap-2 p-2.5 rounded-xl border text-left text-xs transition-all ${
                        isSelected
                          ? 'bg-cyan-600/25 border-cyan-400 text-white shadow-[0_0_12px_rgba(0,173,216,0.4)]'
                          : 'glass-subcard text-zinc-400 hover:text-white hover:border-white/20'
                      }`}
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-cyan-300' : 'text-zinc-500'}`} />
                      <div className="min-w-0">
                        <div className="font-bold truncate">{act.name}</div>
                        <div className="text-[9px] text-zinc-500 uppercase">{act.category}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Stage Selector */}
            <div>
              <label className="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-wider block mb-2">
                2. Preview Evolution Stage
              </label>
              <div className="flex flex-wrap gap-1.5">
                {stages.map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setPreviewStage(st)}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-semibold capitalize transition-all ${
                      previewStage === st
                        ? 'bg-cyan-600 text-white border-cyan-400'
                        : 'bg-black/40 text-zinc-400 border-white/10 hover:text-white'
                    }`}
                  >
                    {st.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Live Preview Canvas */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 glass-card rounded-2xl border border-cyan-500/30 relative min-h-[260px] bg-black/60">
            <div className="absolute top-3 left-3 text-[10px] font-mono text-cyan-400 font-bold bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
              LIVE PREVIEW
            </div>

            <MascotActionPose
              stage={previewStage}
              mood={mascotMood}
              action={previewAction}
              size={180}
            />

            <div className="mt-4 text-center">
              <div className="text-xs font-bold text-white">
                {ALL_ACTIONS.find(a => a.id === previewAction)?.name}
              </div>
              <div className="text-[11px] text-zinc-400 mt-0.5 max-w-xs">
                {ALL_ACTIONS.find(a => a.id === previewAction)?.desc}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of All Animation Cards for Quick Direct Testing */}
      <div className="space-y-3">
        <h3 className="font-bold text-white text-base">Animation Library</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {ALL_ACTIONS.map((act) => {
            const Icon = act.icon;
            return (
              <div
                key={act.id}
                className="p-4 glass-card rounded-2xl flex items-center justify-between gap-3 hover:border-cyan-500/40 transition-all group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-sm text-white truncate">{act.name}</h4>
                    <p className="text-[11px] text-zinc-400 truncate">{act.desc}</p>
                    <span className="text-[10px] text-cyan-400 font-mono font-bold mt-1 inline-block">
                      {act.badgeText}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleTestShowcase(act.id, act.name)}
                  className="p-2 bg-black/40 hover:bg-cyan-600 border border-white/10 hover:border-cyan-400 text-zinc-400 hover:text-white rounded-xl transition-all shrink-0"
                  title="Test animation"
                >
                  <Play className="w-4 h-4 fill-current" />
                </button>
              </div>
            );
          })}
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
                    ? 'bg-cyan-600/20 border-cyan-500 shadow-[0_0_15px_rgba(0,173,216,0.3)] backdrop-blur-md'
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
                <div className="text-[11px] text-cyan-400 font-semibold mb-2">
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
