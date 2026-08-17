import React from 'react';
import { Flame, Shield, RefreshCw, Settings as SettingsIcon } from 'lucide-react';
import { useHabits } from '../../context/HabitContext';
import { MascotDisplay } from '../mascot/MascotDisplay';

interface HeaderProps {
  onOpenSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSettings }) => {
  const { progression, mascotMood, syncStatus, triggerManualSync } = useHabits();

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/10">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-4">
        {/* Mascot & Brand */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <MascotDisplay stage={progression.stage} mood={mascotMood} size={40} className="shrink-0" />
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-black tracking-wider text-white text-base sm:text-lg flex items-center gap-1">
                <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-flame-500 fill-flame-500" />
                LEVEL UP
              </span>
              <span className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full font-bold bg-flame-600/20 text-flame-400 border border-flame-500/30">
                Lv. {progression.level}
              </span>
            </div>
            <div className="text-[11px] text-zinc-400 font-medium truncate">
              {progression.stageConfig.title}
            </div>
          </div>
        </div>

        {/* XP Progress Bar (Desktop) */}
        <div className="hidden md:flex flex-col flex-1 max-w-xs mx-4">
          <div className="flex justify-between text-xs font-semibold mb-1 text-zinc-400">
            <span>XP Progress</span>
            <span className="text-flame-400">
              {progression.currentLevelXp} / {progression.nextLevelXp} XP ({progression.levelProgressPercent}%)
            </span>
          </div>
          <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden border border-white/10">
            <div
              className="h-full bg-gradient-to-r from-flame-600 to-flame-400 transition-all duration-500 rounded-full shadow-[0_0_8px_rgba(255,122,0,0.5)]"
              style={{ width: `${progression.levelProgressPercent}%` }}
            />
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Streak Freeze Badge */}
          <div
            className="flex items-center gap-1 px-2 py-1 rounded-lg bg-black/40 border border-white/10 text-xs font-medium text-zinc-300 backdrop-blur-md"
            title="Available Streak Freezes"
          >
            <Shield className="w-3.5 h-3.5 text-blue-400" />
            <span>{progression.availableFreezes}</span>
          </div>

          {/* Sync Button */}
          <button
            type="button"
            onClick={triggerManualSync}
            className={`p-1.5 sm:p-2 rounded-lg bg-black/40 border border-white/10 text-zinc-400 hover:text-white hover:border-flame-500/40 backdrop-blur-md transition-all ${
              syncStatus === 'syncing' ? 'animate-spin text-flame-400' : syncStatus === 'success' ? 'text-green-400' : ''
            }`}
            title="Sync with Cloudflare R2"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          {/* Settings Button */}
          <button
            type="button"
            onClick={onOpenSettings}
            className="p-1.5 sm:p-2 rounded-lg bg-black/40 border border-white/10 text-zinc-400 hover:text-white hover:border-flame-500/40 backdrop-blur-md transition-colors"
            title="Settings"
          >
            <SettingsIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile XP Bar Underneath Header */}
      <div className="md:hidden w-full h-1 bg-black/50 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-flame-600 to-flame-400 transition-all duration-300"
          style={{ width: `${progression.levelProgressPercent}%` }}
        />
      </div>
    </header>
  );
};
