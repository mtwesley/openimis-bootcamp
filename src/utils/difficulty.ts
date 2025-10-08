import type { Difficulty } from '../contexts/DifficultyContext';

export const getDifficultyLevels = (difficulty: Difficulty): number[] => {
  switch (difficulty) {
    case 'All':
      return [0, 1, 2, 3, 4];
    case 'Beginner':
      return [0, 1];
    case 'Intermediate':
      return [1, 2];
    case 'Advanced':
      return [3, 4];
    default:
      return [0, 1, 2, 3, 4];
  }
};
