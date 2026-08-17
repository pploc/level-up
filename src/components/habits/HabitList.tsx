import React, { useState } from 'react';
import { Plus, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { useHabits } from '../../context/HabitContext';
import { HabitCard } from './HabitCard';
import { HabitFormModal } from './HabitFormModal';
import { formatDisplayDate, getLocalDateString, parseDateString } from '../../utils/date';

export const HabitList: React.FC = () => {
  const { habits, selectedDate, setSelectedDate } = useHabits();
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const activeHabits = habits.filter(h => !h.archived);
  const completedCount = activeHabits.filter(h => h.completedToday).length;
  const totalCount = activeHabits.length;
  const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

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

  return (
    <div className="space-y-6">
      {/* Date Bar & Completion Overview */}
      <div className="p-4 bg-obsidian-900 border border-obsidian-700 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Date Selector */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handlePrevDay}
            className="p-1.5 bg-obsidian-800 border border-obsidian-700 rounded-lg hover:text-flame-400 text-zinc-400 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-flame-500" />
            <span className="font-bold text-white text-sm">
              {formatDisplayDate(selectedDate)}
            </span>
            {selectedDate === getLocalDateString() && (
              <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-flame-600/20 text-flame-400 border border-flame-500/30">
                TODAY
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleNextDay}
            className="p-1.5 bg-obsidian-800 border border-obsidian-700 rounded-lg hover:text-flame-400 text-zinc-400 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Progress Metric & New Habit CTA */}
        <div className="flex items-center gap-4">
          <div className="text-xs text-right">
            <div className="font-bold text-white">
              {completedCount} of {totalCount} completed ({percent}%)
            </div>
            <div className="text-zinc-400">
              {percent === 100 ? '🎉 Perfect Day! +50 XP' : `${totalCount - completedCount} tasks remaining`}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsCreateOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-flame-600 hover:bg-flame-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-flame-600/30 transition-all"
          >
            <Plus className="w-4 h-4" />
            New Habit
          </button>
        </div>
      </div>

      {/* Habit Cards Grid */}
      <div className="grid grid-cols-1 gap-3">
        {activeHabits.length > 0 ? (
          activeHabits.map(habit => <HabitCard key={habit.id} habit={habit} />)
        ) : (
          <div className="text-center py-12 bg-obsidian-900 border border-dashed border-obsidian-700 rounded-xl">
            <p className="text-zinc-400 text-sm font-medium mb-3">No habits configured yet.</p>
            <button
              type="button"
              onClick={() => setIsCreateOpen(true)}
              className="px-4 py-2 bg-flame-600 text-white font-bold text-xs rounded-lg"
            >
              Create your first habit
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {isCreateOpen && <HabitFormModal onClose={() => setIsCreateOpen(false)} />}
    </div>
  );
};
