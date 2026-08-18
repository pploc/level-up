import { MascotStage, MascotStageConfig, UserProgression } from '../types/mascot';

export const STAGE_CONFIGS: Record<MascotStage, MascotStageConfig> = {
  novice: {
    stage: 'novice',
    name: 'Gopher Initiate',
    title: 'Coffee Novice',
    minLevel: 1,
    maxLevel: 4,
    description: 'A cheerful orange Go Gopher starting the day with fresh Java coffee.',
    glowColor: '#00ADD8',
    accentColor: '#29B6F6'
  },
  ember: {
    stage: 'ember',
    name: 'Gopher Caffeinated',
    title: 'Java Adept',
    minLevel: 5,
    maxLevel: 9,
    description: 'Growing energized with dual espresso shots and disciplined focus.',
    glowColor: '#00ADD8',
    accentColor: '#4DD0E1'
  },
  knight: {
    stage: 'knight',
    name: 'Gopher Paladin',
    title: 'Obsidian Knight',
    minLevel: 10,
    maxLevel: 19,
    description: 'Clad in sleek knight armor, powered by uninterrupted consistency.',
    glowColor: '#0097A7',
    accentColor: '#FFFFFF'
  },
  solar_champion: {
    stage: 'solar_champion',
    name: 'Gopher Solar Champion',
    title: 'Solar Gopher',
    minLevel: 20,
    maxLevel: 34,
    description: 'Surrounded by radiant azure halos and transcendent wings.',
    glowColor: '#00ADD8',
    accentColor: '#FFD700'
  },
  ascendant: {
    stage: 'ascendant',
    name: 'Gopher Ascendant',
    title: 'Cosmic Grandmaster',
    minLevel: 35,
    maxLevel: 999,
    description: 'Transcendent deity radiating limitless mastery and infinite coffee brew.',
    glowColor: '#00E5FF',
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
