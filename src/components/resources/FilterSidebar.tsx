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
    <div className="bg-card-background p-6 rounded-xl shadow-lg sticky top-24">
      <h3 className="text-2xl font-bold mb-6">Filter & Sort</h3>
      <div className="space-y-6">
        {Object.entries(groupedCategories).sort(([a], [b]) => (groupDisplayNames[a] || a).localeCompare(groupDisplayNames[b] || b)).map(([group, cats]) => (
          <div key={group}>
            <h4 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300">{groupDisplayNames[group] || group}</h4>
            <div className="space-y-2">
              {cats.map(category => (
                <label key={category.id} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => onCategoryChange(category.id)}
                    className="form-checkbox h-5 w-5 text-primary rounded bg-gray-200 dark:bg-gray-700 border-transparent focus:ring-primary-dark"
                  />
                  <span className="text-gray-800 dark:text-gray-200">{category.title}</span>
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
