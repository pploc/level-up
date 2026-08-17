import React from 'react';
import { useHabits } from '../../context/HabitContext';
import { computeHeatmapMatrix } from '../../utils/analyticsMath';
import { HeatmapDayData } from '../../types/analytics';

export const HeatmapGrid: React.FC = () => {
  const { habits, logs, setSelectedDate } = useHabits();

  const getCellColor = (level: number = 0, color?: string) => {
    if (level === 0) return 'bg-[#141414] border-[#1F1F1F] hover:border-[#383838]';
    if (color) return 'border-transparent';
    switch (level) {
      case 1: return 'bg-[#4D1C0C] border-[#662610]';
      case 2: return 'bg-[#8A2E0E] border-[#A83812]';
      case 3: return 'bg-[#D84315] border-[#F4511E]';
      case 4: return 'bg-[#FF7A00] border-[#FF9100] shadow-[0_0_6px_rgba(255,122,0,0.6)]';
      default: return 'bg-[#141414] border-[#1F1F1F]';
    }
  };

  const render52WeekMatrix = (habitId?: string, customColor?: string) => {
    const data = computeHeatmapMatrix(habits, logs, 365, habitId);
    const weeks: { date: string; dayData?: HeatmapDayData; dayOfWeek: number }[][] = [];
    let currentWeek: { date: string; dayData?: HeatmapDayData; dayOfWeek: number }[] = [];

    const curr = new Date();
    curr.setDate(curr.getDate() - 364);
    curr.setDate(curr.getDate() - curr.getDay());
    const endDate = new Date();

    while (curr <= endDate || currentWeek.length > 0) {
      const year = curr.getFullYear();
      const month = String(curr.getMonth() + 1).padStart(2, '0');
      const day = String(curr.getDate()).padStart(2, '0');
      const dateStr = `${year}-${month}-${day}`;

      const dayData = data.get(dateStr);
      currentWeek.push({ date: dateStr, dayData, dayOfWeek: curr.getDay() });

      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
        if (curr > endDate) break;
      }
      curr.setDate(curr.getDate() + 1);
    }

    return (
      <div className="overflow-x-auto custom-scrollbar pb-2">
        <div className="min-w-[760px] flex gap-1">
          <div className="flex flex-col gap-1 pr-2 text-[9px] text-zinc-500 font-mono select-none">
            <span className="h-3 leading-3">Sun</span>
            <span className="h-3 leading-3">Mon</span>
            <span className="h-3 leading-3">Tue</span>
            <span className="h-3 leading-3">Wed</span>
            <span className="h-3 leading-3">Thu</span>
            <span className="h-3 leading-3">Fri</span>
            <span className="h-3 leading-3">Sat</span>
          </div>

          {weeks.map((week, wIdx) => (
            <div key={wIdx} className="flex flex-col gap-1">
              {week.map((day) => {
                const level = day.dayData?.level ?? 0;
                const isCustom = Boolean(customColor && level > 0);
                const bgStyle = isCustom
                  ? {
                      backgroundColor: `${customColor}${level === 4 ? '' : level === 3 ? 'CC' : level === 2 ? '80' : '40'}`,
                      borderColor: customColor
                    }
                  : undefined;

                return (
                  <button
                    key={day.date}
                    type="button"
                    onClick={() => setSelectedDate(day.date)}
                    style={bgStyle}
                    className={`w-3 h-3 rounded-[2px] border transition-all duration-150 ${getCellColor(level, customColor)}`}
                    title={`${day.date}: ${day.dayData?.count ?? 0} completed`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const activeHabits = habits.filter(h => !h.archived);

  return (
    <div className="space-y-6">
      {/* Overall Aggregated Heatmap */}
      <div className="p-5 bg-obsidian-900 border border-obsidian-700 rounded-xl space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-bold text-white text-base">Combined Activity Grid</h2>
            <p className="text-xs text-zinc-400">Total daily habit completions (52 weeks)</p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-zinc-400">
            <span className="text-[10px]">Less</span>
            {[0, 1, 2, 3, 4].map(l => (
              <span key={l} className={`w-3 h-3 rounded-[2px] border ${getCellColor(l)}`} />
            ))}
            <span className="text-[10px]">More</span>
          </div>
        </div>

        {render52WeekMatrix()}
      </div>

      {/* Individual Grid Per Activity / Habit */}
      <div className="space-y-4">
        <h3 className="font-bold text-white text-sm tracking-wide uppercase text-zinc-400">
          Individual Habit Grids
        </h3>

        <div className="grid grid-cols-1 gap-4">
          {activeHabits.map((habit) => (
            <div key={habit.id} className="p-4 bg-obsidian-900 border border-obsidian-700 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: habit.color }} />
                  <span className="font-bold text-white text-sm">{habit.title}</span>
                  <span
                    className="text-[10px] px-1.5 py-0.2 rounded font-mono uppercase"
                    style={{ backgroundColor: `${habit.color}20`, color: habit.color }}
                  >
                    {habit.category}
                  </span>
                </div>
                <div className="text-xs text-flame-400 font-bold">
                  🔥 {habit.streak.currentStreak}d streak (Max: {habit.streak.longestStreak}d)
                </div>
              </div>

              {render52WeekMatrix(habit.id, habit.color)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
