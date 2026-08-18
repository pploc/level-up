import React from 'react';
import { TrendingUp, AlertTriangle, Flame, Award, Calendar, CheckCircle2, BarChart2 } from 'lucide-react';
import { useHabits } from '../../context/HabitContext';
import { computeAnalyticsSummary } from '../../utils/analyticsMath';

export const AnalyticsDashboard: React.FC = () => {
  const { habits, logs } = useHabits();
  const summary = computeAnalyticsSummary(habits, logs);

  const activeHabits = habits.filter(h => !h.archived);

  return (
    <div className="space-y-6">
      {/* Top Highlight Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4.5 glass-card rounded-2xl border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-semibold text-zinc-400 mb-1">
            <span className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-emerald-400" />
              Thriving Momentum
            </span>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
              &gt;80% RATE
            </span>
          </div>
          <div className="text-3xl font-black text-white mt-1">
            {summary.thrivingHabits.length}
            <span className="text-xs text-zinc-400 font-bold ml-1">/ {activeHabits.length} habits</span>
          </div>
          <div className="text-xs text-emerald-400 font-medium mt-2">
            Solid consistency over last 30 days
          </div>
        </div>

        <div className="p-4.5 glass-card rounded-2xl border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-semibold text-zinc-400 mb-1">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-cyan-400" />
              Peak Weekday
            </span>
            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
              BEST DAY
            </span>
          </div>
          <div className="text-3xl font-black text-white mt-1">
            {summary.bestDayOfWeek.day}
          </div>
          <div className="text-xs text-zinc-400 font-medium mt-2">
            <strong className="text-cyan-300">{summary.bestDayOfWeek.averageRate}%</strong> average completion
          </div>
        </div>

        <div className="p-4.5 glass-card rounded-2xl border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-semibold text-zinc-400 mb-1">
            <span className="flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              Needs Focus
            </span>
            <span className="text-[10px] font-mono text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
              ATTENTION
            </span>
          </div>
          <div className="text-3xl font-black text-white mt-1">
            {summary.strugglingHabits.length}
            <span className="text-xs text-zinc-400 font-bold ml-1">habits</span>
          </div>
          <div className="text-xs text-amber-400/90 font-medium mt-2">
            &lt;60% rate or missed recently
          </div>
        </div>
      </div>

      {/* Doing Well vs Needs Improvement Split */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Doing Well */}
        <div className="p-5 glass-panel rounded-2xl border border-cyan-500/20 space-y-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-emerald-500/20 rounded-xl text-emerald-400 border border-emerald-500/30">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Top Performing Habits</h3>
                <p className="text-xs text-zinc-400">High completion consistency & streaks</p>
              </div>
            </div>
          </div>

          <div className="space-y-2.5">
            {summary.thrivingHabits.length > 0 ? (
              summary.thrivingHabits.map((item) => (
                <div
                  key={item.habitId}
                  className="p-3.5 glass-subcard rounded-xl flex items-center justify-between hover:border-white/20 transition-colors"
                >
                  <div className="min-w-0 pr-2">
                    <div className="font-bold text-white text-sm truncate">{item.habitTitle}</div>
                    <div className="text-xs text-emerald-400 font-medium mt-0.5">
                      30-Day Rate: {Math.round(item.completionRate30d * 100)}%
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-orange-500/20 text-orange-300 rounded-xl text-xs font-bold border border-orange-500/30 shrink-0">
                    <Flame className="w-3.5 h-3.5 fill-orange-400 text-orange-400" />
                    <span>{item.currentStreak}d</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-zinc-500 text-xs italic">
                Build 7-day streaks to see your top performing habits here!
              </div>
            )}
          </div>
        </div>

        {/* Needs Improvement */}
        <div className="p-5 glass-panel rounded-2xl border border-white/10 space-y-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-amber-500/20 rounded-xl text-amber-400 border border-amber-500/30">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Needs Attention</h3>
                <p className="text-xs text-zinc-400">Tasks with recent friction or drop-offs</p>
              </div>
            </div>
          </div>

          <div className="space-y-2.5">
            {summary.strugglingHabits.length > 0 ? (
              summary.strugglingHabits.map((item) => (
                <div
                  key={item.habitId}
                  className="p-3.5 glass-subcard rounded-xl flex items-center justify-between hover:border-white/20 transition-colors"
                >
                  <div className="min-w-0 pr-2">
                    <div className="font-bold text-white text-sm truncate">{item.habitTitle}</div>
                    <div className="text-xs text-amber-400/90 font-medium mt-0.5">
                      Missed {item.missedDaysLast7d} of last 7 scheduled days
                    </div>
                  </div>

                  <div className="text-xs font-mono font-bold text-zinc-400 bg-black/50 px-2.5 py-1 rounded-xl border border-white/10 shrink-0">
                    {Math.round(item.completionRate30d * 100)}%
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-emerald-400 text-xs font-semibold flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                All active habits are running at peak consistency!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Day of Week Consistency Distribution */}
      <div className="p-5 glass-panel rounded-2xl border border-cyan-500/30 space-y-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-cyan-600/20 rounded-xl text-cyan-400 border border-cyan-500/30">
              <BarChart2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Weekly Completion Consistency</h3>
              <p className="text-xs text-zinc-400">Average habit success distribution by day of week</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 sm:gap-3 pt-2">
          {summary.dayOfWeekRates.map((d) => {
            const isBest = d.day === summary.bestDayOfWeek.day;
            return (
              <div key={d.day} className="flex flex-col items-center gap-2">
                <div className="w-full bg-black/50 rounded-2xl h-28 relative flex items-end p-1.5 border border-white/10 hover:border-cyan-400/40 transition-colors">
                  <div
                    className={`w-full rounded-xl transition-all duration-500 ${
                      isBest
                        ? 'bg-gradient-to-t from-cyan-600 via-cyan-400 to-cyan-300 shadow-[0_0_12px_rgba(0,173,216,0.6)]'
                        : 'bg-gradient-to-t from-cyan-900/80 to-cyan-600/60'
                    }`}
                    style={{ height: `${Math.max(8, d.rate)}%` }}
                  />
                </div>
                <span className={`text-xs font-mono font-bold ${isBest ? 'text-cyan-300' : 'text-zinc-400'}`}>
                  {d.day}
                </span>
                <span className="text-[11px] font-mono text-zinc-300 font-bold">{d.rate}%</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
