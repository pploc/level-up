import React, { useState } from 'react';
import { Check, Flame, Plus, Minus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
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
  const progressPercent = isNumeric
    ? Math.min(100, Math.round((habit.todayValue / habit.targetValue) * 100))
    : habit.completedToday ? 100 : 0;

  return (
    <div className="relative group p-3 sm:p-4 bg-obsidian-900 border border-obsidian-700 hover:border-obsidian-600 rounded-xl transition-all">
      {/* Background Progress Glow Bar */}
      <div
        className="absolute left-0 bottom-0 top-0 w-1 bg-flame-500/80 rounded-l-xl transition-all"
        style={{
          height: `${progressPercent}%`,
          backgroundColor: habit.completedToday ? '#FF7A00' : habit.color
        }}
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Left Checkbox / Action */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={() => toggleHabit(habit.id, selectedDate)}
            className={`w-9 h-9 shrink-0 rounded-xl border flex items-center justify-center transition-all ${
              habit.completedToday
                ? 'bg-flame-600 border-flame-500 text-white shadow-[0_0_10px_rgba(255,87,34,0.6)]'
                : 'bg-obsidian-800 border-obsidian-600 text-transparent hover:border-flame-500/50'
            }`}
          >
            <Check className={`w-5 h-5 transition-transform ${habit.completedToday ? 'scale-100' : 'scale-75'}`} />
          </button>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h3 className={`font-bold text-sm truncate ${habit.completedToday ? 'text-zinc-400 line-through' : 'text-white'}`}>
                {habit.title}
              </h3>
              <span
                className="text-[10px] px-1.5 py-0.2 rounded font-mono font-bold uppercase shrink-0"
                style={{ backgroundColor: `${habit.color}20`, color: habit.color }}
              >
                {habit.category}
              </span>
            </div>
            {habit.description && (
              <p className="text-xs text-zinc-400 mt-0.5 truncate">{habit.description}</p>
            )}
          </div>
        </div>

        {/* Right Info & Numeric Controls */}
        <div className="flex items-center justify-between sm:justify-end gap-2 pl-12 sm:pl-0">
          {/* Numeric Stepper if Applicable */}
          {isNumeric && (
            <div className="flex items-center gap-1 bg-obsidian-800 border border-obsidian-700 px-2 py-1 rounded-lg text-xs">
              <button
                type="button"
                onClick={() => updateNumericValue(habit.id, habit.todayValue - 1, selectedDate)}
                className="p-1 hover:text-flame-400 text-zinc-400"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="font-mono font-bold text-white min-w-[3ch] text-center text-xs">
                {habit.todayValue}/{habit.targetValue} {habit.unit}
              </span>
              <button
                type="button"
                onClick={() => updateNumericValue(habit.id, habit.todayValue + 1, selectedDate)}
                className="p-1 hover:text-flame-400 text-zinc-400"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          )}

          {/* Streak Flame Counter */}
          <div
            className="flex items-center gap-1 px-2 py-1 rounded-lg bg-obsidian-800 border border-obsidian-700 text-xs font-bold text-flame-400 shrink-0"
            title={`Current streak: ${habit.streak.currentStreak} days`}
          >
            <Flame className="w-3.5 h-3.5 fill-flame-500 text-flame-500" />
            <span>{habit.streak.currentStreak}d</span>
          </div>

          {/* Toggle mini heatmap */}
          <button
            type="button"
            onClick={() => setShowGrid(!showGrid)}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-obsidian-800"
            title={showGrid ? "Hide grid" : "Show grid"}
          >
            {showGrid ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {/* Delete Action */}
          <button
            type="button"
            onClick={() => deleteHabit(habit.id)}
            className="p-1.5 text-zinc-500 hover:text-red-400 transition-opacity"
            title="Delete Habit"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* GitHub-style activity grid for this specific habit */}
      {showGrid && (
        <ActivityMiniGrid
          habitId={habit.id}
          habitColor={habit.color}
          logs={logs}
          weeksCount={16}
          onSelectDate={setSelectedDate}
        />
      )}
    </div>
  );
};
