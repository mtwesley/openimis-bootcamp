import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { useDifficulty } from '../contexts/DifficultyContext';
import ResourceCard from '../components/resources/ResourceCard';
import ResourceDetailModal from '../components/shared/ResourceDetailModal';
import type { Resource } from '../types';
import { getDifficultyLevels } from '../utils/difficulty';
import { getIconColor } from '../utils/iconColors';

const CategoryDetailPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const { resources, categories, platforms } = useData();
  const { difficulty } = useDifficulty();
  const [modalResource, setModalResource] = React.useState<Resource | null>(null);

  const categoryInfo = categories.find(c => c.id === category);
  const difficultyLevels = getDifficultyLevels(difficulty);

  const filteredResources = resources.filter(r => {
    const matchesCategory = Array.isArray(r.category) 
      ? r.category.includes(category || '')
      : r.category === category;
    const matchesDifficulty = difficultyLevels.includes(r.difficulty);
    return matchesCategory && matchesDifficulty;
  });

  if (!categoryInfo) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Category Not Found</h1>
        <p className="text-gray-600">The category you're looking for doesn't exist.</p>
      </div>
    );
  }

  return (
    <>
      {modalResource && (
        <ResourceDetailModal
          resource={modalResource}
          onClose={() => setModalResource(null)}
          platforms={platforms}
          categories={categories}
        />
      )}
      <div className="container mx-auto px-4 py-8">
        <div className="relative mb-8">
          <Link to="/categories" className="text-primary hover:text-secondary transition-colors font-semibold">
            <i className={`fas fa-chevron-left mr-2 ${getIconColor('fas fa-chevron-left')}`}></i> Back to All Categories
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            {categoryInfo.title}
          </h1>
          <p className="text-lg text-gray-600">
            {categoryInfo.group_title} • {filteredResources.length} resources
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredResources.map(resource => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              onClick={() => setModalResource(resource)}
            />
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No resources found for this category at the current difficulty level.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default CategoryDetailPage;
