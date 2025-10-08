import React from 'react';
import { Link } from 'react-router-dom';
import type { Category } from '../../types';

interface CategoryCardProps {
  category: Category;
  resourceCount: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, resourceCount }) => {
  return (
    <Link
      to={`/category/${category.id}`}
      className="block bg-card-background rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 flex flex-col border border-gray-200 hover:border-primary/50"
    >
      <div className="p-6 flex-grow">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-1">{category.title}</h3>
            <p className="text-sm text-gray-600">{category.group_title}</p>
          </div>
        </div>
        <div className="mt-4">
          <span className="text-sm text-primary font-semibold">
            {resourceCount} {resourceCount === 1 ? 'resource' : 'resources'}
          </span>
        </div>
      </div>
      <div className="p-4 bg-gradient-to-r from-primary/5 to-secondary/5 border-t border-gray-100">
        <div className="text-primary font-bold text-center">
          Browse Resources →
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
