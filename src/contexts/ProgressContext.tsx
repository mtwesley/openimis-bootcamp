import React, { createContext, useContext, useState, useEffect } from 'react';

interface ProgressContextType {
  completedResources: string[];
  toggleResourceCompletion: (resourceId: string) => void;
  importProgress: (data: string) => void;
  exportProgress: () => string;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [completedResources, setCompletedResources] = useState<string[]>(() => {
    const savedProgress = localStorage.getItem('openimis_progress');
    return savedProgress ? JSON.parse(savedProgress) : [];
  });

  useEffect(() => {
    localStorage.setItem('openimis_progress', JSON.stringify(completedResources));
  }, [completedResources]);

  const toggleResourceCompletion = (resourceId: string) => {
    setCompletedResources(prev =>
      prev.includes(resourceId)
        ? prev.filter(id => id !== resourceId)
        : [...prev, resourceId]
    );
  };

  const importProgress = (data: string) => {
    try {
      const parsedData = JSON.parse(data);
      if (Array.isArray(parsedData) && parsedData.every(item => typeof item === 'string')) {
        setCompletedResources(parsedData);
      }
    } catch (error) {
      console.error("Failed to import progress:", error);
    }
  };

  const exportProgress = () => {
    return JSON.stringify(completedResources, null, 2);
  };

  return (
    <ProgressContext.Provider value={{ completedResources, toggleResourceCompletion, importProgress, exportProgress }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
