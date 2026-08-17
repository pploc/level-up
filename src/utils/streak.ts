import { HabitLog, StreakData } from '../types/habit';
import { getLocalDateString, parseDateString } from './date';

export function calculateHabitStreak(
  habitId: string,
  logs: Record<string, HabitLog>,
  scheduledDays: number[] = [0, 1, 2, 3, 4, 5, 6],
  todayStr = getLocalDateString(),
  freezesUsed: string[] = []
): StreakData {
  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;
  let lastCompletedDate: string | null = null;

  const curr = parseDateString(todayStr);
  let isStreakActive = true;

  for (let i = 0; i < 365; i++) {
    const dateStr = getLocalDateString(curr);
    const dayOfWeek = curr.getDay();
    const isScheduled = scheduledDays.includes(dayOfWeek);

    if (isScheduled) {
      const log = logs[`${habitId}_${dateStr}`];
      const isCompleted = Boolean(log && log.completed);
      const isFrozen = freezesUsed.includes(dateStr);

      if (isCompleted) {
        tempStreak++;
        if (!lastCompletedDate) lastCompletedDate = dateStr;
        if (tempStreak > longestStreak) longestStreak = tempStreak;
        if (isStreakActive) currentStreak++;
      } else if (isFrozen) {
        if (isStreakActive) currentStreak++;
      } else {
        if (i > 0) {
          isStreakActive = false;
        }
        tempStreak = 0;
      }
    }

    curr.setDate(curr.getDate() - 1);
  }

  return {
    currentStreak,
    longestStreak: Math.max(longestStreak, currentStreak),
    lastCompletedDate,
    freezesAvailable: 0,
    freezesUsed,
    isFrozen: freezesUsed.includes(todayStr)
  };
}
