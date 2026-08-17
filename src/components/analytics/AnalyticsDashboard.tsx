import React from 'react';
import { TrendingUp, AlertTriangle, Flame, Award, Calendar } from 'lucide-react';
import { useHabits } from '../../context/HabitContext';
import { computeAnalyticsSummary } from '../../utils/analyticsMath';

export const AnalyticsDashboard: React.FC = () => {
  const { habits, logs } = useHabits();
  const summary = computeAnalyticsSummary(habits, logs);

  return (
    <div className="space-y-6">
      {/* Top Highlight Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 glass-card rounded-2xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400 mb-1">
            <Award className="w-4 h-4 text-flame-400" />
            <span>Thriving Habits</span>
          </div>
          <div className="text-2xl font-black text-white">
            {summary.thrivingHabits.length}
          </div>
          <div className="text-xs text-green-400 font-medium mt-1">
            &gt;80% 30-day consistency
          </div>
        </div>

        <div className="p-4 glass-card rounded-2xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400 mb-1">
            <Calendar className="w-4 h-4 text-blue-400" />
            <span>Best Active Day</span>
          </div>
          <div className="text-2xl font-black text-white">
            {summary.bestDayOfWeek.day}
          </div>
          <div className="text-xs text-zinc-400 font-medium mt-1">
            {summary.bestDayOfWeek.averageRate}% completion rate
          </div>
        </div>

        <div className="p-4 glass-card rounded-2xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400 mb-1">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>Needs Focus</span>
          </div>
          <div className="text-2xl font-black text-white">
            {summary.strugglingHabits.length}
          </div>
          <div className="text-xs text-amber-400 font-medium mt-1">
            &lt;60% completion or recent misses
          </div>
        </div>
      </div>

      {/* Doing Well vs Needs Improvement Split */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Doing Well */}
        <div className="p-5 glass-panel rounded-2xl">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <h3 className="font-bold text-white text-base">Doing Well (Top Momentum)</h3>
          </div>

          <div className="space-y-3">
            {summary.thrivingHabits.length > 0 ? (
              summary.thrivingHabits.map((item) => (
                <div
                  key={item.habitId}
                  className="p-3 glass-subcard rounded-xl flex items-center justify-between"
                >
                  <div>
                    <div className="font-bold text-white text-sm">{item.habitTitle}</div>
                    <div className="text-xs text-zinc-400">
                      30-Day Rate: {Math.round(item.completionRate30d * 100)}%
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 px-2 py-1 bg-flame-600/20 text-flame-400 rounded-lg text-xs font-bold border border-flame-500/30">
                    <Flame className="w-3.5 h-3.5 fill-flame-400" />
                    <span>{item.currentStreak}d streak</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-zinc-500 italic">No thriving habits yet. Keep your streaks up!</p>
            )}
          </div>
        </div>

        {/* Needs Improvement */}
        <div className="p-5 glass-panel rounded-2xl">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-white text-base">Needs Attention</h3>
          </div>

          <div className="space-y-3">
            {summary.strugglingHabits.length > 0 ? (
              summary.strugglingHabits.map((item) => (
                <div
                  key={item.habitId}
                  className="p-3 glass-subcard rounded-xl flex items-center justify-between"
                >
                  <div>
                    <div className="font-bold text-white text-sm">{item.habitTitle}</div>
                    <div className="text-xs text-amber-400/90">
                      Missed {item.missedDaysLast7d} days in the last week
                    </div>
                  </div>

                  <div className="text-xs font-mono font-bold text-zinc-400 bg-black/40 px-2 py-1 rounded border border-white/10">
                    {Math.round(item.completionRate30d * 100)}% rate
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-zinc-500 italic">All active habits are running smoothly!</p>
            )}
          </div>
        </div>
      </div>

      {/* Day of Week Consistency Distribution */}
      <div className="p-5 glass-panel rounded-2xl">
        <h3 className="font-bold text-white text-base mb-1">Day-of-Week Consistency</h3>
        <p className="text-xs text-zinc-400 mb-4">Average habit completion rate by weekday</p>

        <div className="grid grid-cols-7 gap-2">
          {summary.dayOfWeekRates.map((d) => (
            <div key={d.day} className="flex flex-col items-center gap-2">
              <div className="w-full bg-black/40 rounded-xl h-24 relative flex items-end p-1 border border-white/10">
                <div
                  className="w-full bg-gradient-to-t from-flame-600 to-flame-400 rounded-lg transition-all shadow-[0_0_8px_rgba(255,122,0,0.4)]"
                  style={{ height: `${d.rate}%` }}
                />
              </div>
              <span className="text-xs font-mono font-bold text-zinc-400">{d.day}</span>
              <span className="text-[11px] font-mono text-flame-400">{d.rate}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
