import React from 'react';
import { useProgress } from '../contexts/ProgressContext';
import { useData } from '../contexts/DataContext';
import { Link } from 'react-router-dom';

const ProgressDashboardPage: React.FC = () => {
  const { completedResources, importProgress, exportProgress } = useProgress();
  const { resources, paths } = useData();

  const completedResourcesData = resources.filter(r => completedResources.includes(r.id));
  const hoursLearned = completedResourcesData.reduce((total, r) => total + r.duration, 0);

  const activePaths = paths.map(path => {
    const pathResourceIds = new Set<string>();
    path.steps.forEach(step => {
      step.categories.forEach(catId => {
        resources.forEach(res => {
          if (Array.isArray(res.category) ? res.category.includes(catId) : res.category === catId) {
            pathResourceIds.add(res.id);
          }
        });
      });
    });

    const completedInPath = Array.from(pathResourceIds).filter(resId => completedResources.includes(resId));
    const progress = pathResourceIds.size > 0 ? (completedInPath.length / pathResourceIds.size) * 100 : 0;

    return {
      ...path,
      progress,
      isStarted: completedInPath.length > 0,
    };
  }).filter(p => p.isStarted);

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        importProgress(content);
      };
      reader.readAsText(file);
    }
  };

  const handleExport = () => {
    const data = exportProgress();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'openimis_progress.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const StatCard = ({ icon, value, label }: { icon: string, value: string | number, label: string }) => (
    <div className="bg-card-background p-6 rounded-xl shadow-lg flex items-center space-x-4">
      <div className="text-3xl text-primary">
        <i className={icon}></i>
      </div>
      <div>
        <div className="text-3xl font-bold">{value}</div>
        <div className="text-gray-500 dark:text-gray-400">{label}</div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-8">
        Your Dashboard
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <StatCard icon="fas fa-check-circle" value={completedResources.length} label="Resources Completed" />
        <StatCard icon="fas fa-hourglass-half" value={hoursLearned} label="Hours Learned" />
        <StatCard icon="fas fa-road" value={activePaths.length} label="Paths Started" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-bold mb-6">Active Learning Paths</h2>
          <div className="space-y-6">
            {activePaths.length > 0 ? activePaths.map(path => (
              <div key={path.id} className="bg-card-background p-6 rounded-xl shadow-lg">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3">
                  <h3 className="text-xl font-bold mb-2 sm:mb-0">{path.title}</h3>
                  <Link to={`/path/${path.id}`} className="font-semibold text-primary hover:text-secondary transition-colors">
                    Continue Path <i className="fas fa-arrow-right ml-1"></i>
                  </Link>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full" style={{ width: `${path.progress}%` }}></div>
                </div>
                <div className="text-right text-sm text-gray-500 dark:text-gray-400 mt-1">{Math.round(path.progress)}% Complete</div>
              </div>
            )) : (
              <p className="text-gray-500 dark:text-gray-400">You haven't started any learning paths yet. <Link to="/paths" className="text-primary hover:underline">Explore paths</Link> to get started!</p>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-6">Manage Progress</h2>
          <div className="bg-card-background p-6 rounded-xl shadow-lg space-y-4">
            <p className="text-gray-600 dark:text-gray-400 text-sm">Save your progress to a file or load it from a backup.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={handleExport} className="w-full bg-primary text-white font-bold py-2 px-4 rounded-full hover:bg-secondary transition-colors flex items-center justify-center">
                <i className="fas fa-file-export mr-2"></i> Export
              </button>
              <label htmlFor="import-progress" className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold py-2 px-4 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors cursor-pointer flex items-center justify-center">
                <i className="fas fa-file-import mr-2"></i> Import
                <input id="import-progress" type="file" accept=".json" onChange={handleImport} className="hidden" />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressDashboardPage;
