import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import { getIconColor } from '../../utils/iconColors';

const StatCards: React.FC = () => {
  const { data } = useData();

  const resourceCount = data?.resources.length || 0;
  const pathCount = data?.paths.length || 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
      <Link to="/resources" className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
        <i className={`fas fa-book text-4xl ${getIconColor('fas fa-book')} mb-4`}></i>
        <h3 className="text-2xl font-bold">{resourceCount}+</h3>
        <p className="text-gray-500 dark:text-gray-400">Resources</p>
      </Link>
      <Link to="/paths" className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
        <i className={`fas fa-road text-4xl ${getIconColor('fas fa-road')} mb-4`}></i>
        <h3 className="text-2xl font-bold">{pathCount}</h3>
        <p className="text-gray-500 dark:text-gray-400">Career Paths</p>
      </Link>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
        <i className={`fas fa-layer-group text-4xl ${getIconColor('fas fa-layer-group')} mb-4`}></i>
        <h3 className="text-2xl font-bold">3</h3>
        <p className="text-gray-500 dark:text-gray-400">Skill Levels</p>
      </div>
    </div>
  );
};

export default StatCards;