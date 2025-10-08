import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import PathCard from '../components/paths/PathCard';

const HomePage: React.FC = () => {
  const { loading, error, paths } = useData();

  if (loading) {
    return <div className="text-center p-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg py-20 px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white">Master OpenIMIS Development</h1>
          <p className="mt-4 text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">A curated collection of free resources to take you from beginner to professional contributor.</p>
          <div className="mt-8 flex justify-center gap-4">
            <Link to="/paths" className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300">Start a Learning Path</Link>
            <Link to="/resources" className="bg-blue-900/50 text-white font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300">Browse All Resources</Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-16">
        <Link to="/resources" className="bg-card-background p-6 rounded-lg shadow-lg cursor-pointer transform hover:-translate-y-1 transition-transform">
          <i className="fas fa-book text-4xl text-primary mb-4"></i>
          <h3 className="text-2xl font-bold">200+ Resources</h3>
          <p className="text-gray-600 dark:text-gray-400">Curated from top platforms.</p>
        </Link>
        <Link to="/paths" className="bg-card-background p-6 rounded-lg shadow-lg cursor-pointer transform hover:-translate-y-1 transition-transform">
          <i className="fas fa-road text-4xl text-primary mb-4"></i>
          <h3 className="text-2xl font-bold">12 Career Paths</h3>
          <p className="text-gray-600 dark:text-gray-400">From frontend to DevOps.</p>
        </Link>
        <div className="bg-card-background p-6 rounded-lg shadow-lg">
          <i className="fas fa-layer-group text-4xl text-primary mb-4"></i>
          <h3 className="text-2xl font-bold">3 Skill Levels</h3>
          <p className="text-gray-600 dark:text-gray-400">Beginner to Advanced.</p>
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-bold text-center mb-8">Popular Learning Paths</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paths.slice(0, 3).map(path => (
            <PathCard key={path.id} path={path} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
