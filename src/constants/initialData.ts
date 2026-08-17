import { Habit, HabitLog } from '../types/habit';
import { getLocalDateString } from '../utils/date';

export const INITIAL_HABITS: Habit[] = [
  {
    id: 'h_water',
    title: 'Hydration Target',
    description: 'Drink 2.5L of pure water daily',
    category: 'health',
    type: 'numeric',
    targetValue: 8,
    unit: 'glasses',
    frequency: 'daily',
    color: '#38BDF8',
    icon: 'Droplet',
    archived: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    order: 0
  },
  {
    id: 'h_code',
    title: 'Deep Work / Code',
    description: 'Focus on core programming or learning',
    category: 'productivity',
    type: 'numeric',
    targetValue: 60,
    unit: 'mins',
    frequency: 'daily',
    color: '#FF7A00',
    icon: 'Code',
    archived: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    order: 1
  },
  {
    id: 'h_read',
    title: 'Read Non-Fiction',
    description: 'Read 20 pages of books or papers',
    category: 'learning',
    type: 'numeric',
    targetValue: 20,
    unit: 'pages',
    frequency: 'daily',
    color: '#A855F7',
    icon: 'BookOpen',
    archived: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    order: 2
  },
  {
    id: 'h_workout',
    title: 'Morning Workout',
    description: '30 mins resistance training or cardio',
    category: 'fitness',
    type: 'boolean',
    targetValue: 1,
    frequency: 'daily',
    color: '#22C55E',
    icon: 'Flame',
    archived: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    order: 3
  },
  {
    id: 'h_meditate',
    title: 'Mindful Meditation',
    description: '10 mins breathwork and mindfulness',
    category: 'mindset',
    type: 'boolean',
    targetValue: 1,
    frequency: 'daily',
    color: '#F59E0B',
    icon: 'Sun',
    archived: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    order: 4
  }
];

export function generateSeedLogs(habits: Habit[]): Record<string, HabitLog> {
  const logs: Record<string, HabitLog> = {};
  const curr = new Date();

  // Generate 60 days of historical activity
  for (let i = 60; i >= 0; i--) {
    const dStr = getLocalDateString(curr);
    for (const h of habits) {
      // Realistic simulation: ~75% completion probability
      const shouldComplete = Math.random() > (h.id === 'h_code' ? 0.15 : 0.3);
      if (shouldComplete) {
        logs[`${h.id}_${dStr}`] = {
          id: `${h.id}_${dStr}`,
          habitId: h.id,
          date: dStr,
          value: h.targetValue,
          targetValue: h.targetValue,
          completed: true,
          timestamp: new Date(curr).toISOString()
        };
      }
    }
    curr.setDate(curr.getDate() - 1);
  }

  return logs;
}
