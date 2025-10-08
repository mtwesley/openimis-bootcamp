import React from 'react';
import { Link } from 'react-router-dom';
import type { Path } from '../../types';

interface PathCardProps {
  path: Path;
}

const PathCard: React.FC<PathCardProps> = ({ path }) => {
  return (
    <Link to={`/path/${path.id}`} className="block bg-card-background rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 flex flex-col">
      <div className="p-6 flex-grow">
        <div className="flex items-center mb-2">
          <i className="fas fa-road text-primary text-2xl mr-3"></i>
          <h3 className="text-xl font-bold">{path.title}</h3>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 h-16">{path.description}</p>
      </div>
      <div className="p-6 bg-gray-50 dark:bg-gray-800/50">
        <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-300 mb-4">
          <span><i className="fas fa-clock mr-1"></i> {path.totalDuration} hours</span>
          <span><i className="fas fa-list-ol mr-1"></i> {path.steps.length} steps</span>
        </div>
        <div className="w-full bg-primary text-white font-bold py-2 px-4 rounded-full hover:bg-secondary transition-colors text-center">View Path</div>
      </div>
    </Link>
  );
};

export default PathCard;
