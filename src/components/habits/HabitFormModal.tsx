import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useHabits } from '../../context/HabitContext';
import { HabitCategory, HabitFrequency, HabitType } from '../../types/habit';

interface HabitFormModalProps {
  onClose: () => void;
}

const CATEGORIES: { id: HabitCategory; label: string; color: string }[] = [
  { id: 'health', label: 'Health', color: '#38BDF8' },
  { id: 'productivity', label: 'Productivity', color: '#FF7A00' },
  { id: 'learning', label: 'Learning', color: '#A855F7' },
  { id: 'fitness', label: 'Fitness', color: '#22C55E' },
  { id: 'mindset', label: 'Mindset', color: '#F59E0B' },
  { id: 'other', label: 'Other', color: '#EC4899' },
];

export const HabitFormModal: React.FC<HabitFormModalProps> = ({ onClose }) => {
  const { createHabit } = useHabits();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<HabitCategory>('productivity');
  const [type, setType] = useState<HabitType>('boolean');
  const [targetValue, setTargetValue] = useState(1);
  const [unit, setUnit] = useState('');
  const [frequency] = useState<HabitFrequency>('daily');

  const selectedCategory = CATEGORIES.find(c => c.id === category)!;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    createHabit({
      title: title.trim(),
      description: description.trim() || undefined,
      category,
      type,
      targetValue: type === 'numeric' ? Math.max(1, targetValue) : 1,
      unit: type === 'numeric' ? unit.trim() || 'units' : undefined,
      frequency,
      color: selectedCategory.color,
      icon: 'Flame',
      archived: false
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-obsidian-900 border border-obsidian-700 rounded-2xl p-6 shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-obsidian-700 mb-4">
          <h2 className="text-lg font-bold text-white">Create New Habit</h2>
          <button type="button" onClick={onClose} className="text-zinc-500 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Habit Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Read Non-Fiction"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-obsidian-800 border border-obsidian-700 rounded-xl text-white text-sm focus:border-flame-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Description (Optional)</label>
            <input
              type="text"
              placeholder="e.g. 20 pages before bed"
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full px-3 py-2 bg-obsidian-800 border border-obsidian-700 rounded-xl text-white text-sm focus:border-flame-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Category</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as HabitCategory)}
                className="w-full px-3 py-2 bg-obsidian-800 border border-obsidian-700 rounded-xl text-white text-sm focus:border-flame-500 outline-none"
              >
                {CATEGORIES.map(c => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Goal Type</label>
              <select
                value={type}
                onChange={e => setType(e.target.value as HabitType)}
                className="w-full px-3 py-2 bg-obsidian-800 border border-obsidian-700 rounded-xl text-white text-sm focus:border-flame-500 outline-none"
              >
                <option value="boolean">Yes/No (Boolean)</option>
                <option value="numeric">Count / Counter</option>
              </select>
            </div>
          </div>

          {type === 'numeric' && (
            <div className="grid grid-cols-2 gap-3 p-3 bg-obsidian-800 border border-obsidian-700 rounded-xl">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Target Value</label>
                <input
                  type="number"
                  min="1"
                  value={targetValue}
                  onChange={e => setTargetValue(Number(e.target.value))}
                  className="w-full px-3 py-1.5 bg-obsidian-900 border border-obsidian-700 rounded-lg text-white text-sm focus:border-flame-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Unit</label>
                <input
                  type="text"
                  placeholder="pages, mins, km"
                  value={unit}
                  onChange={e => setUnit(e.target.value)}
                  className="w-full px-3 py-1.5 bg-obsidian-900 border border-obsidian-700 rounded-lg text-white text-sm focus:border-flame-500 outline-none"
                />
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4 border-t border-obsidian-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-obsidian-800 hover:bg-obsidian-700 text-zinc-300 font-semibold text-xs rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-flame-600 hover:bg-flame-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-flame-600/30"
            >
              Create Habit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
