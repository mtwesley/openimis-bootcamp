import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import type { Path } from '../../types';

const PopularPaths: React.FC = () => {
  const { data } = useData();

  // Displaying first 6 paths as "popular"
  const popularPaths = data?.paths.slice(0, 6) || [];

  return (
    <div className="my-8">
      <h2 className="text-3xl font-bold mb-4">Popular Learning Paths</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {popularPaths.map((path: Path) => (
          <Link to={`/path/${path.id}`} key={path.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold mb-2">{path.title}</h3>
            <p className="text-gray-600 dark:text-gray-400">{path.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularPaths;
