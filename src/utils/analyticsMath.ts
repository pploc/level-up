import { Habit, HabitLog } from '../types/habit';
import { AnalyticsSummary, HabitPerformance, HeatmapDayData } from '../types/analytics';
import { DAY_NAMES, getLocalDateString, parseDateString } from './date';
import { calculateHabitStreak } from './streak';

export function isHabitScheduledForDay(habit: Habit, dayOfWeek: number): boolean {
  if (habit.frequency === 'daily') return true;
  if (habit.frequency === 'weekdays') return dayOfWeek >= 1 && dayOfWeek <= 5;
  if (habit.frequency === 'weekends') return dayOfWeek === 0 || dayOfWeek === 6;
  if (habit.frequency === 'custom' && habit.customDays) return habit.customDays.includes(dayOfWeek);
  return true;
}

export function computeHeatmapMatrix(
  habits: Habit[],
  logs: Record<string, HabitLog>,
  daysCount = 365,
  filterHabitId?: string
): Map<string, HeatmapDayData> {
  const map = new Map<string, HeatmapDayData>();
  const targetHabits = filterHabitId ? habits.filter(h => h.id === filterHabitId) : habits.filter(h => !h.archived);

  const curr = new Date();
  for (let i = 0; i < daysCount; i++) {
    const dateStr = getLocalDateString(curr);
    const dayOfWeek = curr.getDay();

    let totalEligible = 0;
    let completedCount = 0;

    for (const h of targetHabits) {
      if (isHabitScheduledForDay(h, dayOfWeek)) {
        totalEligible++;
        const log = logs[`${h.id}_${dateStr}`];
        if (log?.completed) {
          completedCount++;
        }
      }
    }

    const rate = totalEligible > 0 ? completedCount / totalEligible : 0;
    let level: 0 | 1 | 2 | 3 | 4 = 0;
    if (rate > 0.75) level = 4;
    else if (rate > 0.5) level = 3;
    else if (rate > 0.25) level = 2;
    else if (rate > 0) level = 1;

    map.set(dateStr, {
      date: dateStr,
      count: completedCount,
      totalEligible,
      completionRate: rate,
      level
    });

    curr.setDate(curr.getDate() - 1);
  }

  return map;
}

export function computeAnalyticsSummary(habits: Habit[], logs: Record<string, HabitLog>): AnalyticsSummary {
  const activeHabits = habits.filter(h => !h.archived);
  const performances: HabitPerformance[] = [];

  const today = getLocalDateString();
  const daySums = [0, 0, 0, 0, 0, 0, 0];
  const dayCounts = [0, 0, 0, 0, 0, 0, 0];

  for (const habit of activeHabits) {
    const streak = calculateHabitStreak(habit.id, logs, habit.customDays, today);
    let completions30d = 0;
    let eligible30d = 0;
    let missed7d = 0;

    const curr = parseDateString(today);
    for (let i = 0; i < 30; i++) {
      const dStr = getLocalDateString(curr);
      const dow = curr.getDay();
      if (isHabitScheduledForDay(habit, dow)) {
        eligible30d++;
        dayCounts[dow]++;
        const log = logs[`${habit.id}_${dStr}`];
        if (log?.completed) {
          completions30d++;
          daySums[dow]++;
        } else if (i < 7) {
          missed7d++;
        }
      }
      curr.setDate(curr.getDate() - 1);
    }

    const rate30d = eligible30d > 0 ? completions30d / eligible30d : 0;
    let status: 'thriving' | 'steady' | 'struggling' = 'steady';
    if (rate30d >= 0.8 || streak.currentStreak >= 7) status = 'thriving';
    else if (rate30d < 0.6 || missed7d >= 2) status = 'struggling';

    performances.push({
      habitId: habit.id,
      habitTitle: habit.title,
      habitColor: habit.color,
      category: habit.category,
      totalCompletions: completions30d,
      completionRate30d: rate30d,
      currentStreak: streak.currentStreak,
      longestStreak: streak.longestStreak,
      missedDaysLast7d: missed7d,
      status
    });
  }

  const dayOfWeekRates = DAY_NAMES.map((name, idx) => ({
    day: name,
    rate: dayCounts[idx] > 0 ? Math.round((daySums[idx] / dayCounts[idx]) * 100) : 0
  }));

  let bestDay = { day: 'Mon', dayIndex: 1, averageRate: 0 };
  let worstDay = { day: 'Sun', dayIndex: 0, averageRate: 100 };

  dayOfWeekRates.forEach((d, idx) => {
    if (d.rate > bestDay.averageRate) bestDay = { day: d.day, dayIndex: idx, averageRate: d.rate };
    if (d.rate < worstDay.averageRate && dayCounts[idx] > 0) worstDay = { day: d.day, dayIndex: idx, averageRate: d.rate };
  });

  const thriving = performances.filter(p => p.status === 'thriving').sort((a, b) => b.completionRate30d - a.completionRate30d);
  const struggling = performances.filter(p => p.status === 'struggling').sort((a, b) => a.completionRate30d - b.completionRate30d);

  return {
    thrivingHabits: thriving,
    strugglingHabits: struggling,
    bestDayOfWeek: bestDay,
    worstDayOfWeek: worstDay,
    dayOfWeekRates,
    weeklyTrend: [],
    totalActiveHabits: activeHabits.length,
    completionRateAllTime: 0
  };
}
