export type MascotStage = 'novice' | 'ember' | 'knight' | 'solar_champion' | 'ascendant';
export type MascotMood = 'neutral' | 'happy' | 'celebrating' | 'sad' | 'determined';

export interface MascotStageConfig {
  stage: MascotStage;
  name: string;
  title: string;
  minLevel: number;
  maxLevel: number;
  description: string;
  glowColor: string;
  accentColor: string;
}

export interface UserProgression {
  totalXp: number;
  level: number;
  currentLevelXp: number;
  nextLevelXp: number;
  levelProgressPercent: number;
  stage: MascotStage;
  stageConfig: MascotStageConfig;
  availableFreezes: number;
  totalHabitsCompleted: number;
  perfectDaysCount: number;
}
