import React, { useState } from 'react';
import { Header } from './components/layout/Header';
import { Navigation, TabType } from './components/layout/Navigation';
import { HabitList } from './components/habits/HabitList';
import { HeatmapGrid } from './components/heatmap/HeatmapGrid';
import { AnalyticsDashboard } from './components/analytics/AnalyticsDashboard';
import { MascotSanctum } from './components/mascot/MascotSanctum';
import { SettingsModal } from './components/settings/SettingsModal';
import { AuthModal } from './components/auth/AuthModal';
import { MascotCenterShowcase } from './components/mascot/MascotCenterShowcase';
import { useHabits } from './context/HabitContext';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('habits');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const { showcaseEvent, progression } = useHabits();

  return (
    <div className="min-h-screen bg-game-grid text-white flex flex-col relative overflow-hidden">
      {/* Ambient Acrylic Cyan Glows */}
      <div className="fixed -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-cyan-600/25 via-cyan-500/10 to-transparent rounded-full blur-3xl pointer-events-none z-0" />
      <div className="fixed top-1/3 -left-32 w-80 h-80 bg-cyan-600/15 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="fixed bottom-10 -right-32 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none z-0" />

      {/* Center Screen Mascot Celebration Showcase */}
      {showcaseEvent && (
        <MascotCenterShowcase
          stage={progression.stage}
          mood={showcaseEvent.mood}
          action={showcaseEvent.action}
          message={showcaseEvent.message}
          subMessage={showcaseEvent.subMessage}
        />
      )}

      {/* Main Glass Layout Container */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header
          onOpenSettings={() => setIsSettingsOpen(true)}
          onOpenAuth={() => setIsAuthOpen(true)}
        />
        <Navigation activeTab={activeTab} onChangeTab={setActiveTab} />

        <main className="flex-1 max-w-6xl w-full mx-auto px-4 pb-20 sm:pb-16">
          {activeTab === 'habits' && <HabitList />}
          {activeTab === 'heatmap' && <HeatmapGrid />}
          {activeTab === 'analytics' && <AnalyticsDashboard />}
          {activeTab === 'mascot' && <MascotSanctum />}
        </main>
      </div>

      {isSettingsOpen && <SettingsModal onClose={() => setIsSettingsOpen(false)} />}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  );
};
