import React, { createContext, useContext, useState, useEffect } from 'react';

export type Difficulty = 'All' | 'Beginner' | 'Intermediate' | 'Advanced';

interface DifficultyContextType {
  difficulty: Difficulty;
  setDifficulty: (difficulty: Difficulty) => void;
}

const DifficultyContext = createContext<DifficultyContextType | undefined>(undefined);

export const DifficultyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [difficulty, setDifficulty] = useState<Difficulty>(() => {
    return (localStorage.getItem('difficulty') as Difficulty) || 'All';
  });

  useEffect(() => {
    localStorage.setItem('difficulty', difficulty);
  }, [difficulty]);

  return (
    <DifficultyContext.Provider value={{ difficulty, setDifficulty }}>
      {children}
    </DifficultyContext.Provider>
  );
};

export const useDifficulty = () => {
  const context = useContext(DifficultyContext);
  if (!context) {
    throw new Error('useDifficulty must be used within a DifficultyProvider');
  }
  return context;
};
