import React from 'react';
import { useData } from '../contexts/DataContext';
import { useDifficulty } from '../contexts/DifficultyContext';
import PathCard from '../components/paths/PathCard';
import DifficultyToggle from '../components/shared/DifficultyToggle';
import { getDifficultyLevels } from '../utils/difficulty';

const LearningPathsPage: React.FC = () => {
  const { paths, resources } = useData();
  const { difficulty } = useDifficulty();

  const difficultyLevels = getDifficultyLevels(difficulty);

  // This filtering logic seems complex and might not be what's intended.
  // For now, we'll keep it, but it might need review.
  // It filters paths based on whether *any* of their associated resources match the difficulty.
  const filteredPaths = paths.filter(path => {
    const pathResourceIds = new Set<string>();
    path.steps.forEach(step => {
      step.categories.forEach(catId => {
        resources.forEach(res => {
          if (Array.isArray(res.category) ? res.category.includes(catId) : res.category === catId) {
            pathResourceIds.add(res.id);
          }
        });
      });
    });
    const pathResources = resources.filter(res => pathResourceIds.has(res.id));
    return pathResources.some(res => difficultyLevels.includes(res.difficulty));
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            Learning Paths
          </h1>
          <p className="text-lg text-gray-600">
            Structured learning journeys from beginner to advanced
          </p>
        </div>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <DifficultyToggle />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPaths.map(path => (
          <PathCard key={path.id} path={path} />
        ))}
      </div>
    </div>
  );
};

export default LearningPathsPage;
