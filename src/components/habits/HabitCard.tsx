import React, { useState } from 'react';
import { Check, Flame, Plus, Minus, Trash2, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { HabitWithStreak } from '../../types/habit';
import { useHabits } from '../../context/HabitContext';
import { ActivityMiniGrid } from './ActivityMiniGrid';

interface HabitCardProps {
  habit: HabitWithStreak;
}

export const HabitCard: React.FC<HabitCardProps> = ({ habit }) => {
  const { toggleHabit, updateNumericValue, deleteHabit, selectedDate, setSelectedDate, logs } = useHabits();
  const [showGrid, setShowGrid] = useState(true);

  const isNumeric = habit.type === 'numeric';

  return (
    <div className={`relative group p-3.5 sm:p-4.5 glass-card rounded-2xl transition-all duration-200 border ${
      habit.completedToday
        ? 'border-cyan-500/40 bg-cyan-950/15 shadow-[0_0_20px_rgba(0,173,216,0.15)]'
        : 'hover:border-cyan-500/30'
    }`}>
      {/* Left Accent Color Indicator */}
      <div
        className="absolute left-0 bottom-0 top-0 w-1.5 rounded-l-2xl transition-all"
        style={{
          backgroundColor: habit.completedToday ? '#00ADD8' : habit.color,
          boxShadow: habit.completedToday ? '0 0 10px #00ADD8' : 'none'
        }}
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pl-1">
        {/* Left Checkbox / Action */}
        <div className="flex items-center gap-3.5 min-w-0">
          <button
            type="button"
            onClick={() => toggleHabit(habit.id, selectedDate)}
            className={`w-10 h-10 shrink-0 rounded-xl border flex items-center justify-center transition-all ${
              habit.completedToday
                ? 'bg-gradient-to-br from-cyan-500 to-cyan-600 border-cyan-400 text-white shadow-[0_0_15px_rgba(0,173,216,0.7)] scale-105'
                : 'bg-black/40 border-white/15 text-transparent hover:border-cyan-400/60 hover:bg-black/60'
            }`}
            title={habit.completedToday ? "Mark Incomplete (-25 XP)" : "Mark Complete (+25 XP)"}
          >
            <Check className={`w-5 h-5 transition-transform ${habit.completedToday ? 'scale-100' : 'scale-75'}`} />
          </button>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className={`font-bold text-sm sm:text-base truncate transition-colors ${
                habit.completedToday ? 'text-zinc-400 line-through' : 'text-white'
              }`}>
                {habit.title}
              </h3>
              <span
                className="text-[10px] px-2 py-0.5 rounded-md font-mono font-bold uppercase shrink-0 border"
                style={{
                  backgroundColor: `${habit.color}15`,
                  color: habit.color,
                  borderColor: `${habit.color}35`
                }}
              >
                {habit.category}
              </span>
              {habit.completedToday && (
                <span className="text-[10px] text-cyan-300 font-mono font-bold flex items-center gap-0.5 shrink-0">
                  <Sparkles className="w-3 h-3" /> +25 XP
                </span>
              )}
            </div>
            {habit.description && (
              <p className="text-xs text-zinc-400 mt-0.5 truncate">{habit.description}</p>
            )}
          </div>
        </div>

        {/* Right Info & Numeric Controls */}
        <div className="flex items-center justify-between sm:justify-end gap-2 pl-13 sm:pl-0">
          {/* Numeric Stepper if Applicable */}
          {isNumeric && (
            <div className="flex items-center gap-1.5 bg-black/50 border border-white/10 px-2.5 py-1 rounded-xl text-xs backdrop-blur-md">
              <button
                type="button"
                onClick={() => updateNumericValue(habit.id, habit.todayValue - 1, selectedDate)}
                className="p-1 hover:text-cyan-400 text-zinc-400 transition-colors"
                title="Decrease"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="font-mono font-bold text-white min-w-[3.5ch] text-center text-xs">
                {habit.todayValue}/{habit.targetValue} {habit.unit}
              </span>
              <button
                type="button"
                onClick={() => updateNumericValue(habit.id, habit.todayValue + 1, selectedDate)}
                className="p-1 hover:text-cyan-400 text-zinc-400 transition-colors"
                title="Increase"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Streak Flame Counter */}
          <div
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-black/40 border border-white/10 text-xs font-bold text-orange-400 shrink-0 backdrop-blur-md shadow-sm"
            title={`Current streak: ${habit.streak.currentStreak} days`}
          >
            <Flame className="w-4 h-4 fill-orange-400 text-orange-400" />
            <span>{habit.streak.currentStreak}d</span>
          </div>

          {/* Toggle mini heatmap */}
          <button
            type="button"
            onClick={() => setShowGrid(!showGrid)}
            className="p-2 text-zinc-400 hover:text-white rounded-xl hover:bg-white/10 transition-colors"
            title={showGrid ? "Collapse history grid" : "Expand history grid"}
          >
            {showGrid ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {/* Delete Action */}
          <button
            type="button"
            onClick={() => deleteHabit(habit.id)}
            className="p-2 text-zinc-500 hover:text-red-400 transition-colors rounded-xl hover:bg-red-500/10"
            title="Delete Habit"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* GitHub-style activity grid for this specific habit */}
      {showGrid && (
        <ActivityMiniGrid
          habitId={habit.id}
          habitColor={habit.color}
          logs={logs}
          weeksCount={18}
          onSelectDate={setSelectedDate}
        />
      )}
    </div>
  );
};
