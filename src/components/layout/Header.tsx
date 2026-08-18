import React from 'react';
import { Flame, Shield, RefreshCw, Settings as SettingsIcon, LogIn, LogOut, User, Zap } from 'lucide-react';
import { useHabits } from '../../context/HabitContext';
import { MascotDisplay } from '../mascot/MascotDisplay';

interface HeaderProps {
  onOpenSettings: () => void;
  onOpenAuth: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSettings, onOpenAuth }) => {
  const { progression, mascotMood, syncStatus, triggerManualSync, user, logout } = useHabits();

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/10 shadow-md">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-4">
        {/* Mascot & Brand */}
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <MascotDisplay stage={progression.stage} mood={mascotMood} size={42} className="shrink-0" />
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-black tracking-wider text-white text-base sm:text-lg flex items-center gap-1">
                <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 fill-cyan-400" />
                LEVEL UP
              </span>
              <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full font-bold bg-cyan-600/25 text-cyan-300 border border-cyan-500/40">
                Lv. {progression.level}
              </span>
            </div>
            <div className="text-[11px] text-zinc-400 font-medium truncate flex items-center gap-1">
              <span>{progression.stageConfig.title}</span>
              <span className="text-zinc-600">&bull;</span>
              <span className="text-cyan-400/80 font-mono text-[10px]">{progression.totalXp} XP</span>
            </div>
          </div>
        </div>

        {/* XP Progress Bar (Desktop & Tablet) */}
        <div className="hidden sm:flex flex-col flex-1 max-w-xs mx-4">
          <div className="flex justify-between text-xs font-semibold mb-1 text-zinc-400">
            <span className="flex items-center gap-1">
              <Zap className="w-3 h-3 text-cyan-400" />
              XP Progress
            </span>
            <span className="text-cyan-300 font-mono">
              {progression.currentLevelXp} / {progression.nextLevelXp} ({progression.levelProgressPercent}%)
            </span>
          </div>
          <div className="w-full h-2.5 bg-black/50 rounded-full overflow-hidden border border-white/10 p-0.5">
            <div
              className="h-full bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-300 transition-all duration-500 rounded-full shadow-[0_0_10px_rgba(0,173,216,0.6)]"
              style={{ width: `${progression.levelProgressPercent}%` }}
            />
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* User Account / Login Button */}
          {user ? (
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-black/40 border border-white/10 text-xs text-zinc-300 backdrop-blur-md">
              <User className="w-3.5 h-3.5 text-cyan-400" />
              <span className="font-semibold text-white truncate max-w-[80px] sm:max-w-[120px]">{user.username}</span>
              <button
                type="button"
                onClick={logout}
                className="ml-1 text-zinc-500 hover:text-red-400"
                title="Log out"
              >
                <LogOut className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={onOpenAuth}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-cyan-600/20 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-600 hover:text-white text-xs font-bold transition-all shadow-md shadow-cyan-600/10"
              title="Sign In / Sync Account"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign In</span>
            </button>
          )}

          {/* Streak Freeze Badge */}
          <div
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-black/40 border border-white/10 text-xs font-semibold text-zinc-300 backdrop-blur-md"
            title="Available Streak Freezes"
          >
            <Shield className="w-3.5 h-3.5 text-cyan-400" />
            <span>{progression.availableFreezes}</span>
          </div>

          {/* Sync Button */}
          <button
            type="button"
            onClick={triggerManualSync}
            className={`p-2 rounded-xl bg-black/40 border border-white/10 text-zinc-400 hover:text-white hover:border-cyan-500/40 backdrop-blur-md transition-all ${
              syncStatus === 'syncing' ? 'animate-spin text-cyan-400' : syncStatus === 'success' ? 'text-emerald-400' : ''
            }`}
            title="Sync with Cloudflare R2"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          {/* Settings Button */}
          <button
            type="button"
            onClick={onOpenSettings}
            className="p-2 rounded-xl bg-black/40 border border-white/10 text-zinc-400 hover:text-white hover:border-cyan-500/40 backdrop-blur-md transition-colors"
            title="Settings"
          >
            <SettingsIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile XP Bar Underneath Header */}
      <div className="sm:hidden w-full h-1 bg-black/50 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-300 transition-all duration-300"
          style={{ width: `${progression.levelProgressPercent}%` }}
        />
      </div>
    </header>
  );
};
