import React from 'react';
import { Link } from 'react-router-dom';
import type { Path } from '../../types';
import { getIconColor } from '../../utils/iconColors';

interface PathCardProps {
  path: Path;
}

const PathCard: React.FC<PathCardProps> = ({ path }) => {
  return (
    <Link to={`/path/${path.id}`} className="block bg-card-background rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 flex flex-col border border-gray-200 hover:border-primary/50">
      <div className="p-6 flex-grow">
        <div className="flex items-center mb-3">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
            <i className={`fas fa-road ${getIconColor('fas fa-road')} text-xl`}></i>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">{path.title}</h3>
            <div className="flex items-center mt-1">
              <span className="text-sm text-primary font-medium">{path.steps.length} steps</span>
              <span className="mx-2 text-gray-400">•</span>
              <span className="text-sm text-gray-600">{path.totalDuration} hours</span>
            </div>
          </div>
        </div>
        <p className="text-gray-700 text-sm leading-relaxed">{path.description}</p>
      </div>
      <div className="p-6 bg-gradient-to-r from-primary/5 to-secondary/5 border-t border-gray-100">
        <div className="w-full bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-secondary transition-colors text-center shadow-sm">
          Start Learning Path
        </div>
      </div>
    </Link>
  );
};

export default PathCard;
