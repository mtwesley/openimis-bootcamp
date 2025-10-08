import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';
import { useDifficulty } from '../contexts/DifficultyContext';
import FilterSidebar from '../components/resources/FilterSidebar';
import ResourceCard from '../components/resources/ResourceCard';
import DifficultyToggle from '../components/shared/DifficultyToggle';
import ResourceDetailModal from '../components/shared/ResourceDetailModal';
import { getDifficultyLevels } from '../utils/difficulty';
import type { Resource } from '../types';

const ResourceBrowserPage: React.FC = () => {
  const { resources, categories, platforms } = useData();
  const { difficulty } = useDifficulty();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [modalResource, setModalResource] = useState<Resource | null>(null);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const difficultyLevels = getDifficultyLevels(difficulty);

  const filteredResources = resources.filter(resource => {
    const difficultyMatch = difficultyLevels.includes(resource.difficulty);
    const categoryMatch = selectedCategories.length === 0 || selectedCategories.some(cat => {
      const cats = Array.isArray(resource.category) ? resource.category : [resource.category];
      return cats.includes(cat);
    });
    return difficultyMatch && categoryMatch;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4 md:mb-0">
          Browse Resources
        </h1>
        <div className="flex items-center space-x-4">
          <DifficultyToggle />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-1/4">
          <FilterSidebar
            categories={categories}
            selectedCategories={selectedCategories}
            onCategoryChange={handleCategoryChange}
          />
        </aside>
        <main className="lg:w-3/4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredResources.map(resource => (
              <ResourceCard key={resource.id} resource={resource} onClick={() => setModalResource(resource)} />
            ))}
          </div>
        </main>
      </div>
      {modalResource && (
        <ResourceDetailModal
          resource={modalResource}
          onClose={() => setModalResource(null)}
          platforms={platforms}
          categories={categories}
        />
      )}
    </div>
  );
};

export default ResourceBrowserPage;
