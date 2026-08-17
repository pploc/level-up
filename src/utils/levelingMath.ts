import { MascotStage, MascotStageConfig, UserProgression } from '../types/mascot';

export const STAGE_CONFIGS: Record<MascotStage, MascotStageConfig> = {
  novice: {
    stage: 'novice',
    name: 'Ignis Emberling',
    title: 'Novice Spark',
    minLevel: 1,
    maxLevel: 4,
    description: 'A young fire wisp eager to grow through steady discipline.',
    glowColor: '#FF7A00',
    accentColor: '#FFA726'
  },
  ember: {
    stage: 'ember',
    name: 'Ignis Pyro',
    title: 'Flame Sprite',
    minLevel: 5,
    maxLevel: 9,
    description: 'Growing stronger with twin flame crests and sharper focus.',
    glowColor: '#FF5722',
    accentColor: '#FFD54F'
  },
  knight: {
    stage: 'knight',
    name: 'Ignis Valiant',
    title: 'Blaze Knight',
    minLevel: 10,
    maxLevel: 19,
    description: 'Clad in obsidian armor, tempered by unbroken consistency.',
    glowColor: '#FF5722',
    accentColor: '#FFFFFF'
  },
  solar_champion: {
    stage: 'solar_champion',
    name: 'Ignis Sol',
    title: 'Solar Champion',
    minLevel: 20,
    maxLevel: 34,
    description: 'Surrounded by solar halos and radiant blazing wings.',
    glowColor: '#FF9800',
    accentColor: '#FFD700'
  },
  ascendant: {
    stage: 'ascendant',
    name: 'Ignis Ascendant',
    title: 'Solar Deity',
    minLevel: 35,
    maxLevel: 999,
    description: 'Transcendent phoenix deity radiating limitless habit mastery.',
    glowColor: '#E040FB',
    accentColor: '#FFFFFF'
  }
};

export function getStageForLevel(level: number): MascotStage {
  if (level >= 35) return 'ascendant';
  if (level >= 20) return 'solar_champion';
  if (level >= 10) return 'knight';
  if (level >= 5) return 'ember';
  return 'novice';
}

export function getXpForLevel(level: number): number {
  return Math.floor(100 * Math.pow(level, 1.55));
}

export function calculateProgression(totalXp: number): UserProgression {
  let level = 1;
  let accumulatedXp = 0;

  while (true) {
    const requiredForNext = getXpForLevel(level);
    if (accumulatedXp + requiredForNext > totalXp) {
      const currentLevelXp = Math.max(0, totalXp - accumulatedXp);
      const stage = getStageForLevel(level);
      return {
        totalXp,
        level,
        currentLevelXp,
        nextLevelXp: requiredForNext,
        levelProgressPercent: Math.min(100, Math.round((currentLevelXp / requiredForNext) * 100)),
        stage,
        stageConfig: STAGE_CONFIGS[stage],
        availableFreezes: Math.min(2, Math.floor(level / 5)),
        totalHabitsCompleted: 0,
        perfectDaysCount: 0
      };
    }
    accumulatedXp += requiredForNext;
    level++;
  }
}
