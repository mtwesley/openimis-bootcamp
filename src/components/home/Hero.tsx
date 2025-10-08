import React from 'react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-center py-20">
      <h1 className="text-5xl font-bold mb-4">Welcome to the OpenIMIS Bootcamp</h1>
      <p className="text-xl mb-8">Your journey to mastering OpenIMIS starts here.</p>
      <div>
        <Link to="/paths" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
          Start a Learning Path
        </Link>
        <Link to="/resources" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
          Browse All Resources
        </Link>
      </div>
    </div>
  );
};

export default Hero;
