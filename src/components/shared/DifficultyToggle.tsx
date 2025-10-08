import React from 'react';
import { useDifficulty } from '../../contexts/DifficultyContext';
import type { Difficulty } from '../../contexts/DifficultyContext';

const DifficultyToggle: React.FC = () => {
  const { difficulty, setDifficulty } = useDifficulty();

  const difficulties: Difficulty[] = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  return (
    <div className="flex space-x-1 p-1 bg-gray-100 rounded-lg border border-gray-200">
      {difficulties.map(d => (
        <button
          key={d}
          onClick={() => setDifficulty(d)}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 hover:cursor-pointer ${
            difficulty === d 
              ? 'bg-primary text-white shadow-sm transform scale-105' 
              : 'text-gray-700 hover:text-primary hover:bg-primary/5'
          }`}>
          {d}
        </button>
      ))}
    </div>
  );
};

export default DifficultyToggle;
