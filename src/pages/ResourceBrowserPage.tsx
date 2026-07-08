import React, { useState, useMemo } from 'react';
import Fuse from 'fuse.js';
import { useData } from '../contexts/DataContext';
import { useDifficulty } from '../contexts/DifficultyContext';
import { useProgress } from '../contexts/ProgressContext';
import FilterSidebar from '../components/resources/FilterSidebar';
import ResourceCard from '../components/resources/ResourceCard';
import DifficultyToggle from '../components/shared/DifficultyToggle';
import ResourceDetailModal from '../components/shared/ResourceDetailModal';
import { getDifficultyLevels } from '../utils/difficulty';
import type { Resource } from '../types';

const FORMAT_META: { [key: string]: { label: string; icon: string } } = {
  video: { label: 'Videos', icon: 'fab fa-youtube' },
  course: { label: 'Courses', icon: 'fas fa-graduation-cap' },
  playlist: { label: 'Playlists', icon: 'fas fa-list' },
};

const FUSE_OPTIONS: Fuse.IFuseOptions<Resource> = {
  keys: [
    { name: 'title', weight: 3 },
    { name: 'organization', weight: 2 },
    { name: 'category', weight: 2 },
    { name: 'description', weight: 1 },
  ],
  threshold: 0.4,
  includeScore: true,
  ignoreLocation: true,
};

const ResourceBrowserPage: React.FC = () => {
  const { resources, categories, platforms } = useData();
  const { difficulty } = useDifficulty();
  const { completedResources, toggleResourceCompletion } = useProgress();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [modalResource, setModalResource] = useState<Resource | null>(null);

  // Initialize from URL query params (?format=video&q=django)
  const [selectedFormats, setSelectedFormats] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    const params = new URLSearchParams(window.location.search);
    const fmt = params.get('format');
    return fmt ? [fmt] : [];
  });

  const [searchQuery, setSearchQuery] = useState<string>(() => {
    if (typeof window === 'undefined') return '';
    const params = new URLSearchParams(window.location.search);
    return params.get('q') || '';
  });

  // Build Fuse index when resources change
  const fuse = useMemo(() => new Fuse(resources, FUSE_OPTIONS), [resources]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleFormatChange = (formatId: string) => {
    setSelectedFormats(prev =>
      prev.includes(formatId)
        ? prev.filter(id => id !== formatId)
        : [...prev, formatId]
    );
  };

  // Build format options with counts from data
  const formatOptions = useMemo(() => {
    const counts: { [key: string]: number } = {};
    resources.forEach(r => { counts[r.format] = (counts[r.format] || 0) + 1; });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map(([id, count]) => ({
        id,
        label: FORMAT_META[id]?.label || id.charAt(0).toUpperCase() + id.slice(1),
        icon: FORMAT_META[id]?.icon || 'fas fa-file-alt',
        count,
      }));
  }, [resources]);

  const difficultyLevels = getDifficultyLevels(difficulty);

  const filteredResources = useMemo(() => {
    // Step 1: Apply fuzzy search if there's a query
    const searchBase = searchQuery.trim()
      ? fuse.search(searchQuery.trim()).map(result => result.item)
      : resources;

    // Step 2: Apply checkbox filters
    return searchBase.filter(resource => {
      const difficultyMatch = difficultyLevels.includes(resource.difficulty);
      const categoryMatch = selectedCategories.length === 0 || selectedCategories.some(cat => {
        const cats = Array.isArray(resource.category) ? resource.category : [resource.category];
        return cats.includes(cat);
      });
      const formatMatch = selectedFormats.length === 0 || selectedFormats.includes(resource.format);
      return difficultyMatch && categoryMatch && formatMatch;
    });
  }, [searchQuery, fuse, resources, difficultyLevels, selectedCategories, selectedFormats]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            Browse Resources
          </h1>
          <p className="text-lg text-gray-600">
            {searchQuery || selectedCategories.length > 0 || selectedFormats.length > 0
              ? `Showing ${filteredResources.length} of ${resources.length} resources`
              : `Discover ${resources.length} curated learning resources`}
          </p>
        </div>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <DifficultyToggle />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-1/4">
          <FilterSidebar
            categories={categories}
            selectedCategories={selectedCategories}
            onCategoryChange={handleCategoryChange}
            formats={formatOptions}
            selectedFormats={selectedFormats}
            onFormatChange={handleFormatChange}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
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
          onToggleCompletion={toggleResourceCompletion}
          isCompleted={completedResources.includes(modalResource.id)}
        />
      )}
    </div>
  );
};

export default ResourceBrowserPage;
