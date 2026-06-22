import React, { useState, useEffect } from 'react';
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

  const sortedGroups = Object.entries(groupedCategories).sort(([a], [b]) => (groupDisplayNames[a] || a).localeCompare(groupDisplayNames[b] || b));

  // Collapsed state per group. Desktop: all expanded. Mobile: all collapsed.
  const isMobile = () => typeof window !== 'undefined' && window.innerWidth < 768;
  const [collapsed, setCollapsed] = useState<{ [key: string]: boolean }>(() => {
    const initial: { [key: string]: boolean } = {};
    sortedGroups.forEach(([group]) => { initial[group] = isMobile(); });
    return initial;
  });

  // Update collapsed state on resize crossing the mobile/desktop threshold
  useEffect(() => {
    let wasMobile = isMobile();
    const handleResize = () => {
      const nowMobile = isMobile();
      if (nowMobile !== wasMobile) {
        wasMobile = nowMobile;
        setCollapsed(prev => {
          const next: { [key: string]: boolean } = {};
          Object.keys(prev).forEach(g => { next[g] = nowMobile; });
          return next;
        });
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleGroup = (group: string) => {
    setCollapsed(prev => ({ ...prev, [group]: !prev[group] }));
  };

  return (
    <div className="bg-card-background p-6 rounded-xl shadow-lg border border-gray-200">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Filter & Sort</h3>
        <p className="text-sm text-gray-600">Refine your search</p>
      </div>
      <div className="space-y-6">
        {sortedGroups.map(([group, cats]) => (
          <div key={group} className="border-b border-gray-100 pb-4 last:border-b-0">
            <button
              onClick={() => toggleGroup(group)}
              className="flex items-center justify-between w-full text-left cursor-pointer"
            >
              <h4 className="text-lg font-semibold text-primary">{groupDisplayNames[group] || group}</h4>
              <i className={`fas fa-chevron-down text-gray-400 text-sm transition-transform duration-200 ${collapsed[group] ? '-rotate-90' : ''}`}></i>
            </button>
            {!collapsed[group] && (
              <div className="space-y-3 mt-4">
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
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterSidebar;
