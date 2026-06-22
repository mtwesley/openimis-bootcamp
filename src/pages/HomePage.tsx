import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import PathCard from '../components/paths/PathCard';
import CategoryCard from '../components/categories/CategoryCard';
import { getIconColor } from '../utils/iconColors';

const HomePage: React.FC = () => {
  const { loading, error, paths, categories, resources } = useData();

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
          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <Link to="/paths" className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300">Start a Learning Path</Link>
            <Link to="/categories" className="bg-blue-900/50 text-white font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300">Browse Categories</Link>
            <Link to="/resources" className="bg-blue-900/50 text-white font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300">Browse All Resources</Link>
          </div>
          <div className="mt-4 flex justify-center gap-3 flex-wrap">
            <Link to="/resources?format=video" className="bg-white/20 text-white font-semibold py-2 px-6 rounded-full border border-white/30 hover:bg-white/30 transition-colors duration-200"><i className="fab fa-youtube mr-2"></i>Browse Videos</Link>
            <Link to="/resources?format=course" className="bg-white/20 text-white font-semibold py-2 px-6 rounded-full border border-white/30 hover:bg-white/30 transition-colors duration-200"><i className="fas fa-graduation-cap mr-2"></i>Browse Courses</Link>
            <Link to="/resources?format=playlist" className="bg-white/20 text-white font-semibold py-2 px-6 rounded-full border border-white/30 hover:bg-white/30 transition-colors duration-200"><i className="fas fa-list mr-2"></i>Browse Playlists</Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center mb-16">
        <Link to="/resources" className="bg-card-background p-6 rounded-lg shadow-lg cursor-pointer transform hover:-translate-y-1 transition-transform">
          <i className={`fas fa-book text-4xl ${getIconColor('fas fa-book')} mb-4`}></i>
          <h3 className="text-2xl font-bold">{resources.length} Resources</h3>
          <p className="text-gray-600 dark:text-gray-400">Curated from top platforms</p>
        </Link>
        <Link to="/paths" className="bg-card-background p-6 rounded-lg shadow-lg cursor-pointer transform hover:-translate-y-1 transition-transform">
          <i className={`fas fa-road text-4xl ${getIconColor('fas fa-road')} mb-4`}></i>
          <h3 className="text-2xl font-bold">{paths.length} Paths</h3>
          <p className="text-gray-600 dark:text-gray-400">To advance your career</p>
        </Link>
        <Link to="/categories" className="bg-card-background p-6 rounded-lg shadow-lg cursor-pointer transform hover:-translate-y-1 transition-transform">
          <i className={`fas fa-tags text-4xl ${getIconColor('fas fa-tags')} mb-4`}></i>
          <h3 className="text-2xl font-bold">{categories.length} Categories</h3>
          <p className="text-gray-600 dark:text-gray-400">Organized by topic</p>
        </Link>
        <div className="bg-card-background p-6 rounded-lg shadow-lg md:col-span-2 lg:col-span-1 mx-auto w-full max-w-sm lg:max-w-none">
          <i className={`fas fa-layer-group text-4xl ${getIconColor('fas fa-layer-group')} mb-4`}></i>
          <h3 className="text-2xl font-bold">3 Skill Levels</h3>
          <p className="text-gray-600 dark:text-gray-400">Beginner to Advanced</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-16">
        {(() => {
          const formatMeta: { [key: string]: { label: string; icon: string; description: string } } = {
            video: { label: 'Videos', icon: 'fab fa-youtube', description: 'Watch and learn from experts' },
            course: { label: 'Courses', icon: 'fas fa-graduation-cap', description: 'Structured learning programs' },
            playlist: { label: 'Playlists', icon: 'fas fa-list', description: 'Curated video series' },
          };
          const counts: { [key: string]: number } = {};
          resources.forEach(r => { counts[r.format] = (counts[r.format] || 0) + 1; });
          return ['video', 'course', 'playlist'].map(fmt => {
            const meta = formatMeta[fmt];
            const count = counts[fmt] || 0;
            if (count === 0) return null;
            return (
              <Link key={fmt} to={`/resources?format=${fmt}`} className="bg-card-background p-6 rounded-lg shadow-lg cursor-pointer transform hover:-translate-y-1 transition-transform border border-gray-200 hover:border-primary/50">
                <i className={`${meta.icon} text-4xl ${getIconColor(meta.icon)} mb-4`}></i>
                <h3 className="text-2xl font-bold">{count} {meta.label}</h3>
                <p className="text-gray-600 dark:text-gray-400">{meta.description}</p>
              </Link>
            );
          });
        })()}
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Popular Learning Paths</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(() => {
            const preferredIds = ['fullstack_developer', 'uiux_designer', 'database_administrator'];
            const resolved = preferredIds.map(id => paths.find(p => p.id === id)).filter(Boolean);
            const popularPaths = resolved.length > 0 ? resolved : paths.slice(0, 3);
            return popularPaths.map(path => path ? <PathCard key={path.id} path={path} /> : null);
          })()}
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-bold text-center mb-8">Popular Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(() => {
            const preferredIds = ['python', 'django', 'git', 'javascript', 'react', 'docker'];
            const resolved = preferredIds.map(id => categories.find(c => c.id === id)).filter(Boolean);
            const popularCats = resolved.length > 0 ? resolved : categories.slice(0, 6);
            return popularCats.map(category => {
              if (!category) return null;
              const resourceCount = resources.filter(r =>
                Array.isArray(r.category) ? r.category.includes(category.id) : r.category === category.id
              ).length;
              return <CategoryCard key={category.id} category={category} resourceCount={resourceCount} />;
            });
          })()}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
