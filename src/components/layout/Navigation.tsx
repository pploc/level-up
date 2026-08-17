import React from 'react';
import { CheckCircle2, Grid3X3, BarChart3, Sparkles } from 'lucide-react';

export type TabType = 'habits' | 'heatmap' | 'analytics' | 'mascot';

interface NavigationProps {
  activeTab: TabType;
  onChangeTab: (tab: TabType) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onChangeTab }) => {
  const tabs = [
    { id: 'habits', label: 'Habits', fullLabel: 'Daily Habits', icon: CheckCircle2 },
    { id: 'heatmap', label: 'Heatmap', fullLabel: 'Heatmap Matrix', icon: Grid3X3 },
    { id: 'analytics', label: 'Stats', fullLabel: 'Analytics', icon: BarChart3 },
    { id: 'mascot', label: 'Mascot', fullLabel: 'Mascot Sanctum', icon: Sparkles },
  ] as const;

  return (
    <>
      {/* Top Navbar on Desktop / Tablet */}
      <nav className="max-w-6xl mx-auto px-4 mt-4 mb-6 hidden sm:block">
        <div className="flex items-center gap-1.5 p-1.5 glass-panel rounded-2xl overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onChangeTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-flame-600 text-white shadow-lg shadow-flame-600/30 border border-flame-400/30'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-zinc-500'}`} />
                {tab.fullLabel}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile Fixed Bottom Navigation Bar */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 glass-panel border-t border-white/10 px-2 py-1.5 flex justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChangeTab(tab.id)}
              className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl text-[10px] font-bold transition-all ${
                isActive ? 'text-flame-400' : 'text-zinc-500'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-flame-500' : 'text-zinc-500'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
};
