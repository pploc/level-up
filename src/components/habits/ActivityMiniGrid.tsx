import React, { useMemo, useState } from 'react';
import { HabitLog } from '../../types/habit';
import { getLocalDateString } from '../../utils/date';

interface ActivityMiniGridProps {
  habitId: string;
  habitColor: string;
  logs: Record<string, HabitLog>;
  weeksCount?: number;
  onSelectDate?: (date: string) => void;
}

export const ActivityMiniGrid: React.FC<ActivityMiniGridProps> = ({
  habitId,
  habitColor,
  logs,
  weeksCount = 16,
  onSelectDate
}) => {
  const [hovered, setHovered] = useState<{ date: string; completed: boolean; value: number } | null>(null);

  const daysMatrix = useMemo(() => {
    const totalDays = weeksCount * 7;
    const result: { date: string; completed: boolean; value: number; dayOfWeek: number }[][] = [];
    let currentWeek: { date: string; completed: boolean; value: number; dayOfWeek: number }[] = [];

    const curr = new Date();
    curr.setDate(curr.getDate() - (totalDays - 1));
    // Align to Sunday
    curr.setDate(curr.getDate() - curr.getDay());

    const endDate = new Date();

    while (curr <= endDate || currentWeek.length > 0) {
      const dStr = getLocalDateString(curr);
      const log = logs[`${habitId}_${dStr}`];
      const completed = Boolean(log?.completed);
      const value = log?.value || 0;

      currentWeek.push({ date: dStr, completed, value, dayOfWeek: curr.getDay() });

      if (currentWeek.length === 7) {
        result.push(currentWeek);
        currentWeek = [];
        if (curr > endDate) break;
      }
      curr.setDate(curr.getDate() + 1);
    }

    return result;
  }, [habitId, logs, weeksCount]);

  return (
    <div className="relative mt-3 pt-3 border-t border-obsidian-800">
      <div className="flex items-center justify-between mb-1.5 text-[11px] text-zinc-400">
        <span className="font-mono">Activity History ({weeksCount} weeks)</span>
        {hovered && (
          <span className="font-mono text-white text-[10px]">
            {hovered.date}: {hovered.completed ? '✓ Completed' : 'Missed'}
          </span>
        )}
      </div>

      <div className="flex gap-1 overflow-x-auto custom-scrollbar pb-1">
        {daysMatrix.map((week, wIdx) => (
          <div key={wIdx} className="flex flex-col gap-1">
            {week.map((day) => (
              <button
                key={day.date}
                type="button"
                onClick={() => onSelectDate?.(day.date)}
                onMouseEnter={() => setHovered({ date: day.date, completed: day.completed, value: day.value })}
                onMouseLeave={() => setHovered(null)}
                className="w-2.5 h-2.5 rounded-[2px] transition-all"
                style={{
                  backgroundColor: day.completed ? habitColor : '#141414',
                  border: day.completed ? `1px solid ${habitColor}` : '1px solid #1F1F1F',
                  boxShadow: day.completed ? `0 0 4px ${habitColor}60` : 'none'
                }}
                aria-label={`${day.date}: ${day.completed ? 'Done' : 'Incomplete'}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
