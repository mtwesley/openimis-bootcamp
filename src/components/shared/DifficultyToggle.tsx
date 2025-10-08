import React from 'react';
import { useDifficulty } from '../../contexts/DifficultyContext';
import type { Difficulty } from '../../contexts/DifficultyContext';

const DifficultyToggle: React.FC = () => {
  const { difficulty, setDifficulty } = useDifficulty();

  const difficulties: Difficulty[] = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  return (
    <div className="flex space-x-2 p-1 bg-gray-200 dark:bg-gray-700 rounded-lg">
      {difficulties.map(d => (
        <button
          key={d}
          onClick={() => setDifficulty(d)}
          className={`px-4 py-2 text-sm font-medium rounded-md hover:cursor-pointer ${difficulty === d ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}>
          {d}
        </button>
      ))}
    </div>
  );
};

export default DifficultyToggle;
