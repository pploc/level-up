export interface HeatmapDayData {
  date: string;
  count: number;
  totalEligible: number;
  completionRate: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface HabitPerformance {
  habitId: string;
  habitTitle: string;
  habitColor: string;
  category: string;
  totalCompletions: number;
  completionRate30d: number;
  currentStreak: number;
  longestStreak: number;
  missedDaysLast7d: number;
  status: 'thriving' | 'steady' | 'struggling';
}

export interface AnalyticsSummary {
  thrivingHabits: HabitPerformance[];
  strugglingHabits: HabitPerformance[];
  bestDayOfWeek: { day: string; dayIndex: number; averageRate: number };
  worstDayOfWeek: { day: string; dayIndex: number; averageRate: number };
  dayOfWeekRates: { day: string; rate: number }[];
  weeklyTrend: { weekStart: string; completionRate: number }[];
  totalActiveHabits: number;
  completionRateAllTime: number;
}
