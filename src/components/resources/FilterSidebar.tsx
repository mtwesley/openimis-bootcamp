import React from 'react';
import type { Category } from '../../types';

interface FilterSidebarProps {
  categories: Category[];
  selectedCategories: string[];
  onCategoryChange: (categoryId: string) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ categories, selectedCategories, onCategoryChange }) => {
  const groupDisplayNames = React.useMemo(() => {
    return categories.reduce((acc, category) => {
      if (category.group && category.group_title && !acc[category.group]) {
        acc[category.group] = category.group_title;
      }
      return acc;
    }, {} as { [key: string]: string });
  }, [categories]);

  const groupedCategories: { [key: string]: Category[] } = {};
  categories.forEach(cat => {
    if (!groupedCategories[cat.group]) {
      groupedCategories[cat.group] = [];
    }
    groupedCategories[cat.group].push(cat);
  });

  return (
    <div className="bg-card-background p-6 rounded-xl shadow-lg sticky top-24 border border-gray-200">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Filter & Sort</h3>
        <p className="text-sm text-gray-600">Refine your search</p>
      </div>
      <div className="space-y-6">
        {Object.entries(groupedCategories).sort(([a], [b]) => (groupDisplayNames[a] || a).localeCompare(groupDisplayNames[b] || b)).map(([group, cats]) => (
          <div key={group} className="border-b border-gray-100 pb-4 last:border-b-0">
            <h4 className="text-lg font-semibold mb-4 text-primary">{groupDisplayNames[group] || group}</h4>
            <div className="space-y-3">
              {cats.map(category => (
                <label key={category.id} className="flex items-center space-x-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => onCategoryChange(category.id)}
                    className="form-checkbox h-5 w-5 text-primary rounded bg-gray-100 border-gray-300 focus:ring-primary focus:ring-offset-0 transition-colors"
                  />
                  <span className="text-gray-700 group-hover:text-primary transition-colors">{category.title}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterSidebar;
