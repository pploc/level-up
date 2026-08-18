export type MascotStage = 'novice' | 'ember' | 'knight' | 'solar_champion' | 'ascendant';
export type MascotMood = 'neutral' | 'happy' | 'celebrating' | 'sad' | 'determined';

export type MascotActionType =
  | 'coffee_sip'
  | 'push_up'
  | 'bicep_flex'
  | 'dumbbell_press'
  | 'reading_book'
  | 'laptop_coding'
  | 'zen_meditate'
  | 'water_chug'
  | 'celebrate_jump';

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
