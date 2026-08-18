import React, { useState } from 'react';
import { useHabits } from '../../context/HabitContext';
import { computeHeatmapMatrix } from '../../utils/analyticsMath';
import { HeatmapDayData } from '../../types/analytics';
import { Calendar, Filter, Flame } from 'lucide-react';

export const HeatmapGrid: React.FC = () => {
  const { habits, logs, setSelectedDate } = useHabits();
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const getCellColor = (level: number = 0, color?: string) => {
    if (level === 0) return 'bg-[#141414]/80 border-white/5 hover:border-cyan-400/40';
    if (color) return 'border-transparent';
    switch (level) {
      case 1: return 'bg-[#004D40] border-[#006064]';
      case 2: return 'bg-[#00838F] border-[#0097A7]';
      case 3: return 'bg-[#00ADD8] border-[#29B6F6] shadow-[0_0_6px_rgba(0,173,216,0.4)]';
      case 4: return 'bg-[#00E5FF] border-[#80DEEA] shadow-[0_0_10px_rgba(0,229,255,0.8)]';
      default: return 'bg-[#141414]/80 border-white/5';
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
                      borderColor: customColor,
                      boxShadow: level >= 3 ? `0 0 6px ${customColor}` : 'none'
                    }
                  : undefined;

                return (
                  <button
                    key={day.date}
                    type="button"
                    onClick={() => setSelectedDate(day.date)}
                    style={bgStyle}
                    className={`w-3 h-3 rounded-[2px] border transition-all duration-150 hover:scale-125 ${getCellColor(level, customColor)}`}
                    title={`${day.date}: ${day.dayData?.count ?? 0} habits completed`}
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
  const filteredHabits = activeFilter === 'all'
    ? activeHabits
    : activeHabits.filter(h => h.id === activeFilter);

  return (
    <div className="space-y-6">
      {/* Overall Aggregated Heatmap */}
      <div className="p-5 glass-panel rounded-2xl border border-cyan-500/30 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-cyan-600/20 border border-cyan-500/30 rounded-xl text-cyan-400">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-white text-base sm:text-lg">Full Year Contribution Matrix</h2>
              <p className="text-xs text-zinc-400">GitHub-style 52-week activity log across all habits</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-zinc-400 bg-black/40 px-3 py-1.5 rounded-xl border border-white/10 self-start sm:self-auto">
            <span className="text-[10px]">Less</span>
            {[0, 1, 2, 3, 4].map(l => (
              <span key={l} className={`w-3 h-3 rounded-[2px] border ${getCellColor(l)}`} />
            ))}
            <span className="text-[10px]">More</span>
          </div>
        </div>

        {render52WeekMatrix()}
      </div>

      {/* Filter Tabs for Individual Habits */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h3 className="font-bold text-white text-sm tracking-wider uppercase text-zinc-400 flex items-center gap-1.5">
            <Filter className="w-4 h-4 text-cyan-400" />
            Individual Habit Breakdown
          </h3>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 custom-scrollbar">
            <button
              type="button"
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeFilter === 'all'
                  ? 'bg-cyan-600 text-white border border-cyan-400'
                  : 'bg-black/30 text-zinc-400 hover:text-white border border-white/5'
              }`}
            >
              Show All ({activeHabits.length})
            </button>
            {activeHabits.map(h => (
              <button
                key={h.id}
                type="button"
                onClick={() => setActiveFilter(h.id)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  activeFilter === h.id
                    ? 'bg-cyan-600 text-white border border-cyan-400'
                    : 'bg-black/30 text-zinc-400 hover:text-white border border-white/5'
                }`}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: h.color }} />
                <span>{h.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Individual Grid Cards */}
        <div className="grid grid-cols-1 gap-4">
          {filteredHabits.map((habit) => (
            <div key={habit.id} className="p-4 sm:p-5 glass-card rounded-2xl space-y-3 hover:border-cyan-500/30 transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: habit.color }} />
                  <span className="font-bold text-white text-sm sm:text-base">{habit.title}</span>
                  <span
                    className="text-[10px] px-2 py-0.5 rounded font-mono font-bold uppercase border"
                    style={{
                      backgroundColor: `${habit.color}15`,
                      color: habit.color,
                      borderColor: `${habit.color}30`
                    }}
                  >
                    {habit.category}
                  </span>
                </div>
                <div className="text-xs text-orange-400 font-bold flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 fill-orange-400" />
                  <span>{habit.streak.currentStreak}d streak (Max: {habit.streak.longestStreak}d)</span>
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
