import React, { useState, useMemo } from 'react';
import { Plus, Calendar, ChevronLeft, ChevronRight, CheckCircle2, Flame, Award, Sparkles, Filter, CheckCheck } from 'lucide-react';
import { useHabits } from '../../context/HabitContext';
import { HabitCard } from './HabitCard';
import { HabitFormModal } from './HabitFormModal';
import { formatDisplayDate, getLocalDateString, parseDateString } from '../../utils/date';

export const HabitList: React.FC = () => {
  const { habits, selectedDate, setSelectedDate, toggleHabit } = useHabits();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const activeHabits = habits.filter(h => !h.archived);
  const filteredHabits = useMemo(() => {
    if (categoryFilter === 'all') return activeHabits;
    return activeHabits.filter(h => h.category === categoryFilter);
  }, [activeHabits, categoryFilter]);

  const completedCount = activeHabits.filter(h => h.completedToday).length;
  const totalCount = activeHabits.length;
  const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Streak & Milestone Highlights
  const maxStreak = Math.max(0, ...activeHabits.map(h => h.streak?.currentStreak || 0));

  const handlePrevDay = () => {
    const d = parseDateString(selectedDate);
    d.setDate(d.getDate() - 1);
    setSelectedDate(getLocalDateString(d));
  };

  const handleNextDay = () => {
    const d = parseDateString(selectedDate);
    d.setDate(d.getDate() + 1);
    setSelectedDate(getLocalDateString(d));
  };

  const handleCheckAll = () => {
    activeHabits.forEach(h => {
      if (!h.completedToday) {
        toggleHabit(h.id, selectedDate);
      }
    });
  };

  const categories: { id: string; label: string }[] = [
    { id: 'all', label: 'All Tasks' },
    { id: 'fitness', label: 'Fitness' },
    { id: 'learning', label: 'Learning' },
    { id: 'productivity', label: 'Productivity' },
    { id: 'mindset', label: 'Mindset' },
    { id: 'health', label: 'Health' },
    { id: 'other', label: 'Other' },
  ];

  return (
    <div className="space-y-5">
      {/* Top Status & Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Metric 1: Completion */}
        <div className="p-3.5 glass-card rounded-2xl border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-semibold">
            <span>Completed</span>
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-white">{completedCount}</span>
            <span className="text-xs text-zinc-400 font-bold">/ {totalCount}</span>
          </div>
          <div className="w-full bg-black/40 h-1.5 rounded-full overflow-hidden mt-2 border border-white/5">
            <div
              className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 rounded-full transition-all duration-300"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>

        {/* Metric 2: Today Success Rate */}
        <div className="p-3.5 glass-card rounded-2xl border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-semibold">
            <span>Success Rate</span>
            <Award className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-2">
            <span className="text-2xl font-black text-white">{percent}%</span>
          </div>
          <div className="text-[11px] text-cyan-300 font-semibold truncate mt-1">
            {percent === 100 ? '🎉 Perfect Day! +50 XP' : `${totalCount - completedCount} tasks left`}
          </div>
        </div>

        {/* Metric 3: Best Active Streak */}
        <div className="p-3.5 glass-card rounded-2xl border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-semibold">
            <span>Top Streak</span>
            <Flame className="w-4 h-4 text-orange-400 fill-orange-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl font-black text-white">{maxStreak}</span>
            <span className="text-xs text-orange-400 font-bold">days</span>
          </div>
          <div className="text-[11px] text-zinc-400 truncate mt-1">
            Unbroken momentum
          </div>
        </div>

        {/* Metric 4: Daily XP Potential */}
        <div className="p-3.5 glass-card rounded-2xl border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-semibold">
            <span>Today's XP</span>
            <Sparkles className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl font-black text-cyan-300">+{completedCount * 25}</span>
            <span className="text-xs text-zinc-400 font-bold">XP</span>
          </div>
          <div className="text-[11px] text-zinc-400 truncate mt-1">
            Max: +{(totalCount * 25) + 50} XP
          </div>
        </div>
      </div>

      {/* Date Bar & Action Controls */}
      <div className="p-4 glass-panel rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Date Selector */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={handlePrevDay}
            className="p-2 bg-black/40 border border-white/10 rounded-xl hover:text-cyan-400 text-zinc-400 hover:border-cyan-500/40 transition-colors"
            title="Previous Day"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 px-3 py-1.5 bg-black/40 rounded-xl border border-white/10">
            <Calendar className="w-4 h-4 text-cyan-400" />
            <span className="font-bold text-white text-sm">
              {formatDisplayDate(selectedDate)}
            </span>
            {selectedDate === getLocalDateString() && (
              <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-cyan-600/25 text-cyan-300 border border-cyan-500/40">
                TODAY
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleNextDay}
            className="p-2 bg-black/40 border border-white/10 rounded-xl hover:text-cyan-400 text-zinc-400 hover:border-cyan-500/40 transition-colors"
            title="Next Day"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Bulk Actions & Add Button */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          {completedCount < totalCount && totalCount > 0 && (
            <button
              type="button"
              onClick={handleCheckAll}
              className="flex items-center gap-1.5 px-3 py-2 bg-black/40 hover:bg-white/10 text-zinc-300 hover:text-white font-semibold text-xs rounded-xl border border-white/10 transition-all"
              title="Complete all remaining tasks today"
            >
              <CheckCheck className="w-4 h-4 text-cyan-400" />
              <span className="hidden sm:inline">Complete All</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setIsCreateOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white font-bold text-xs rounded-xl shadow-lg shadow-cyan-600/30 border border-cyan-400/30 transition-all"
          >
            <Plus className="w-4 h-4" />
            New Habit
          </button>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 custom-scrollbar">
        <span className="text-zinc-500 text-xs flex items-center gap-1 pr-1 font-semibold shrink-0">
          <Filter className="w-3.5 h-3.5" />
          Category:
        </span>
        {categories.map(cat => {
          const isSelected = categoryFilter === cat.id;
          const count = cat.id === 'all'
            ? activeHabits.length
            : activeHabits.filter(h => h.category === cat.id).length;

          if (count === 0 && cat.id !== 'all') return null;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setCategoryFilter(cat.id)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
                isSelected
                  ? 'bg-cyan-600 text-white border border-cyan-400 shadow-[0_0_8px_rgba(0,173,216,0.4)]'
                  : 'bg-black/30 text-zinc-400 hover:text-white border border-white/5 hover:border-white/20'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                isSelected ? 'bg-black/30 text-cyan-200' : 'bg-white/10 text-zinc-400'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Habit Cards Grid */}
      <div className="grid grid-cols-1 gap-3">
        {filteredHabits.length > 0 ? (
          filteredHabits.map(habit => <HabitCard key={habit.id} habit={habit} />)
        ) : (
          <div className="text-center py-12 glass-panel border-dashed border-white/10 rounded-2xl">
            <p className="text-zinc-400 text-sm font-medium mb-3">No habits in this category.</p>
            <button
              type="button"
              onClick={() => setIsCreateOpen(true)}
              className="px-4 py-2 bg-cyan-600 text-white font-bold text-xs rounded-xl shadow-lg shadow-cyan-600/30"
            >
              Create a new habit
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {isCreateOpen && <HabitFormModal onClose={() => setIsCreateOpen(false)} />}
    </div>
  );
};
