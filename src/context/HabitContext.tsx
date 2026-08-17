import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { Habit, HabitLog, HabitWithStreak } from '../types/habit';
import { MascotMood, UserProgression } from '../types/mascot';
import { SyncConfig, SyncStatus } from '../types/sync';
import { calculateHabitStreak } from '../utils/streak';
import { calculateProgression } from '../utils/levelingMath';
import { getLocalDateString } from '../utils/date';
import { triggerLevelUpConfetti, triggerTaskConfetti } from '../utils/confetti';
import { generateSeedLogs, INITIAL_HABITS } from '../constants/initialData';

interface HabitContextValue {
  habits: HabitWithStreak[];
  logs: Record<string, HabitLog>;
  progression: UserProgression;
  mascotMood: MascotMood;
  syncStatus: SyncStatus;
  syncConfig: SyncConfig;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  toggleHabit: (habitId: string, date?: string) => void;
  updateNumericValue: (habitId: string, value: number, date?: string) => void;
  createHabit: (habit: Omit<Habit, 'id' | 'createdAt' | 'updatedAt' | 'order'>) => void;
  updateHabit: (habit: Habit) => void;
  deleteHabit: (habitId: string) => void;
  updateSyncConfig: (config: Partial<SyncConfig>) => void;
  triggerManualSync: () => Promise<void>;
  exportJson: () => string;
  importJson: (jsonStr: string) => boolean;
  resetAllData: () => void;
  loadDemoData: () => void;
}

const HabitContext = createContext<HabitContextValue | null>(null);

const STORAGE_KEYS = {
  HABITS: 'levelup_habits_v2',
  LOGS: 'levelup_logs_v2',
  CONFIG: 'levelup_config_v2',
  XP: 'levelup_xp_v2',
};

export const HabitProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [habits, setHabits] = useState<Habit[]>(() => {
    const raw = localStorage.getItem(STORAGE_KEYS.HABITS);
    return raw ? JSON.parse(raw) : INITIAL_HABITS;
  });

  const [logs, setLogs] = useState<Record<string, HabitLog>>(() => {
    const raw = localStorage.getItem(STORAGE_KEYS.LOGS);
    return raw ? JSON.parse(raw) : generateSeedLogs(INITIAL_HABITS);
  });

  const [totalXp, setTotalXp] = useState<number>(() => {
    const raw = localStorage.getItem(STORAGE_KEYS.XP);
    if (raw) return Number(raw);
    // Calculate initial XP based on seeded logs
    const completedCount = Object.values(generateSeedLogs(INITIAL_HABITS)).filter(l => l.completed).length;
    return completedCount * 25;
  });

  const [syncConfig, setSyncConfig] = useState<SyncConfig>(() => {
    const raw = localStorage.getItem(STORAGE_KEYS.CONFIG);
    return raw ? JSON.parse(raw) : { workerUrl: '', authToken: '', autoSync: false, lastSyncTime: null };
  });

  const [syncStatus, setSyncStatus] = useState<SyncStatus>('idle');
  const [mascotMood, setMascotMood] = useState<MascotMood>('neutral');
  const [selectedDate, setSelectedDate] = useState<string>(getLocalDateString());

  const progression = calculateProgression(totalXp);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.HABITS, JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(logs));
  }, [logs]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.XP, String(totalXp));
  }, [totalXp]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(syncConfig));
  }, [syncConfig]);

  const triggerMood = useCallback((mood: MascotMood, durationMs = 3500) => {
    setMascotMood(mood);
    setTimeout(() => setMascotMood('neutral'), durationMs);
  }, []);

  const toggleHabit = useCallback((habitId: string, dateStr = selectedDate) => {
    const key = `${habitId}_${dateStr}`;
    const existing = logs[key];
    const targetHabit = habits.find(h => h.id === habitId);
    if (!targetHabit) return;

    const willBeCompleted = !existing?.completed;
    const newLog: HabitLog = {
      id: key,
      habitId,
      date: dateStr,
      value: willBeCompleted ? targetHabit.targetValue : 0,
      targetValue: targetHabit.targetValue,
      completed: willBeCompleted,
      timestamp: new Date().toISOString()
    };

    setLogs(prev => ({ ...prev, [key]: newLog }));

    if (willBeCompleted) {
      const addedXp = 25;
      setTotalXp(prev => {
        const nextXp = prev + addedXp;
        const prevLevel = calculateProgression(prev).level;
        const nextLevel = calculateProgression(nextXp).level;
        if (nextLevel > prevLevel) {
          triggerMood('celebrating', 6000);
          triggerLevelUpConfetti();
        } else {
          triggerMood('happy', 3000);
          triggerTaskConfetti();
        }
        return nextXp;
      });
    }
  }, [habits, logs, selectedDate, triggerMood]);

  const updateNumericValue = useCallback((habitId: string, value: number, dateStr = selectedDate) => {
    const key = `${habitId}_${dateStr}`;
    const targetHabit = habits.find(h => h.id === habitId);
    if (!targetHabit) return;

    const clampedValue = Math.max(0, value);
    const wasCompleted = logs[key]?.completed ?? false;
    const isCompleted = clampedValue >= targetHabit.targetValue;

    const newLog: HabitLog = {
      id: key,
      habitId,
      date: dateStr,
      value: clampedValue,
      targetValue: targetHabit.targetValue,
      completed: isCompleted,
      timestamp: new Date().toISOString()
    };

    setLogs(prev => ({ ...prev, [key]: newLog }));

    if (!wasCompleted && isCompleted) {
      setTotalXp(prev => {
        const nextXp = prev + 25;
        const prevLevel = calculateProgression(prev).level;
        const nextLevel = calculateProgression(nextXp).level;
        if (nextLevel > prevLevel) {
          triggerMood('celebrating', 6000);
          triggerLevelUpConfetti();
        } else {
          triggerMood('happy', 3000);
          triggerTaskConfetti();
        }
        return nextXp;
      });
    }
  }, [habits, logs, selectedDate, triggerMood]);

  const triggerManualSync = async () => {
    if (!syncConfig.workerUrl || !syncConfig.authToken) return;
    setSyncStatus('syncing');

    try {
      const payload = {
        version: 2,
        exportedAt: new Date().toISOString(),
        habits,
        logs,
        totalXp,
        progression
      };

      const res = await fetch(`${syncConfig.workerUrl.replace(/\/$/, '')}/api/sync`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${syncConfig.authToken}`
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error(`Sync failed: ${res.statusText}`);

      setSyncStatus('success');
      setSyncConfig(prev => ({ ...prev, lastSyncTime: new Date().toISOString() }));
      setTimeout(() => setSyncStatus('idle'), 3000);
    } catch {
      setSyncStatus('error');
      setTimeout(() => setSyncStatus('idle'), 4000);
    }
  };

  const habitsWithStreaks: HabitWithStreak[] = habits.map(h => {
    const todayLog = logs[`${h.id}_${selectedDate}`];
    const streak = calculateHabitStreak(h.id, logs, h.customDays, selectedDate);
    return {
      ...h,
      streak,
      completedToday: Boolean(todayLog?.completed),
      todayValue: todayLog?.value || 0
    };
  });

  const resetAllData = () => {
    setHabits([]);
    setLogs({});
    setTotalXp(0);
    localStorage.clear();
  };

  const loadDemoData = () => {
    setHabits(INITIAL_HABITS);
    const demoLogs = generateSeedLogs(INITIAL_HABITS);
    setLogs(demoLogs);
    const completedCount = Object.values(demoLogs).filter(l => l.completed).length;
    setTotalXp(completedCount * 25);
  };

  return (
    <HabitContext.Provider
      value={{
        habits: habitsWithStreaks,
        logs,
        progression,
        mascotMood,
        syncStatus,
        syncConfig,
        selectedDate,
        setSelectedDate,
        toggleHabit,
        updateNumericValue,
        createHabit: (newHabit) => {
          const habit: Habit = {
            ...newHabit,
            id: `h_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            order: habits.length
          };
          setHabits(prev => [...prev, habit]);
        },
        updateHabit: (updated) => setHabits(prev => prev.map(h => h.id === updated.id ? updated : h)),
        deleteHabit: (id) => setHabits(prev => prev.filter(h => h.id !== id)),
        updateSyncConfig: (cfg) => setSyncConfig(prev => ({ ...prev, ...cfg })),
        triggerManualSync,
        exportJson: () => JSON.stringify({ version: 2, habits, logs, totalXp, exportedAt: new Date().toISOString() }, null, 2),
        importJson: (jsonStr: string) => {
          try {
            const data = JSON.parse(jsonStr);
            if (data.habits && data.logs) {
              setHabits(data.habits);
              setLogs(data.logs);
              if (typeof data.totalXp === 'number') setTotalXp(data.totalXp);
              return true;
            }
            return false;
          } catch {
            return false;
          }
        },
        resetAllData,
        loadDemoData
      }}
    >
      {children}
    </HabitContext.Provider>
  );
};

export const useHabits = () => {
  const context = useContext(HabitContext);
  if (!context) throw new Error('useHabits must be used within a HabitProvider');
  return context;
};
