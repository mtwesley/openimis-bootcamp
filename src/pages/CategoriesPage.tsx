import React from 'react';
import { useData } from '../contexts/DataContext';
import { useDifficulty } from '../contexts/DifficultyContext';
import CategoryCard from '../components/categories/CategoryCard';
import DifficultyToggle from '../components/shared/DifficultyToggle';
import { getDifficultyLevels } from '../utils/difficulty';

const CategoriesPage: React.FC = () => {
  const { categories, resources } = useData();
  const { difficulty } = useDifficulty();
  const difficultyLevels = getDifficultyLevels(difficulty);

  // Count resources per category (filtered by difficulty)
  const categoryResourceCounts = React.useMemo(() => {
    const counts: Record<string, number> = {};
    categories.forEach(cat => {
      counts[cat.id] = resources.filter(r => {
        const matchesCategory = Array.isArray(r.category) ? r.category.includes(cat.id) : r.category === cat.id;
        const matchesDifficulty = difficultyLevels.includes(r.difficulty);
        return matchesCategory && matchesDifficulty;
      }).length;
    });
    return counts;
  }, [categories, resources, difficultyLevels]);

  // Group categories by group_title
  const groupedCategories = React.useMemo(() => {
    const groups: Record<string, Array<typeof categories[0]>> = {};
    categories.forEach(cat => {
      if (!groups[cat.group_title]) {
        groups[cat.group_title] = [];
      }
      groups[cat.group_title].push(cat);
    });
    return groups;
  }, [categories]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          Browse Categories
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore resources organized by topic and skill area
        </p>
      </div>

      <div className="flex justify-center mb-12">
        <div className="bg-card-background rounded-xl shadow-lg p-6 border border-gray-200">
          <DifficultyToggle />
        </div>
      </div>

      {Object.entries(groupedCategories).sort(([a], [b]) => a.localeCompare(b)).map(([groupTitle, cats]) => (
        <div key={groupTitle} className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">{groupTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cats.map(category => (
              <CategoryCard
                key={category.id}
                category={category}
                resourceCount={categoryResourceCounts[category.id] || 0}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoriesPage;
