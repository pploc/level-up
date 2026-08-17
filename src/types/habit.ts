export type HabitFrequency = 'daily' | 'weekdays' | 'weekends' | 'custom';
export type HabitType = 'boolean' | 'numeric';
export type HabitCategory = 'health' | 'productivity' | 'mindset' | 'learning' | 'fitness' | 'other';

export interface Habit {
  id: string;
  title: string;
  description?: string;
  category: HabitCategory;
  type: HabitType;
  targetValue: number;
  unit?: string;
  frequency: HabitFrequency;
  customDays?: number[]; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  color: string;
  icon: string;
  archived: boolean;
  createdAt: string;
  updatedAt: string;
  order: number;
}

export interface HabitLog {
  id: string;
  habitId: string;
  date: string; // YYYY-MM-DD
  value: number;
  targetValue: number;
  completed: boolean;
  notes?: string;
  timestamp: string;
}

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastCompletedDate: string | null;
  freezesAvailable: number;
  freezesUsed: string[];
  isFrozen: boolean;
}

export interface HabitWithStreak extends Habit {
  streak: StreakData;
  completedToday: boolean;
  todayValue: number;
}
