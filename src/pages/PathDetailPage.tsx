import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { useProgress } from '../contexts/ProgressContext';
import { useDifficulty } from '../contexts/DifficultyContext';
import DifficultyToggle from '../components/shared/DifficultyToggle';
import ResourceDetailModal from '../components/shared/ResourceDetailModal';
import type { Resource } from '../types';
import { getDifficultyLevels } from '../utils/difficulty';

const PathDetailPage: React.FC = () => {
  const { path_id } = useParams<{ path_id: string }>();
  const { paths, resources, categories, platforms } = useData();
  const { completedResources, toggleResourceCompletion } = useProgress();
  const { difficulty } = useDifficulty();
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [modalResource, setModalResource] = useState<Resource | null>(null);

  const path = paths.find(p => p.id === path_id);
  const difficultyLevels = getDifficultyLevels(difficulty);

  if (!path) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Path not found</h2>
        <Link to="/paths" className="text-primary hover:underline mt-4 inline-block">Return to Learning Paths</Link>
      </div>
    );
  }

  const visibleSteps = path.steps.filter(step => {
    return step.categories.some(catId => {
      return resources.some(res => (Array.isArray(res.category) ? res.category.includes(catId) : res.category === catId) && difficultyLevels.includes(res.difficulty));
    });
  }).sort((a, b) => a.rank - b.rank);

  const handleStepClick = (stepIndex: number) => {
    setActiveStepIndex(stepIndex);
  };

  const currentStep = visibleSteps[activeStepIndex];
  const stepResources: { [key: string]: Resource[] } = {};

  if (currentStep) {
    currentStep.categories.forEach(catId => {
      const categoryResources = resources.filter(res => (Array.isArray(res.category) ? res.category.includes(catId) : res.category === catId) && difficultyLevels.includes(res.difficulty));
      if (categoryResources.length > 0) {
        const category = categories.find(c => c.id === catId);
        stepResources[category?.title || catId] = categoryResources;
      }
    });
  }

  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'video': return 'fab fa-youtube';
      case 'course': return 'fas fa-graduation-cap';
      case 'playlist': return 'fas fa-list';
      default: return 'fas fa-file-alt';
    }
  };

  return (
    <>
      {modalResource && <ResourceDetailModal resource={modalResource} onClose={() => setModalResource(null)} platforms={platforms} categories={categories} />}
      <div className="container mx-auto px-4 py-8">
        <div className="relative mb-8">
          <Link to="/paths" className="text-primary hover:text-secondary transition-colors font-semibold">
            <i className="fas fa-chevron-left mr-2"></i> Back to All Paths
          </Link>
        </div>

        <header className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-3">{path.title}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">{path.description}</p>
        </header>

        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-4 p-4 bg-card-background rounded-xl shadow-md">
            <DifficultyToggle />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          <aside className="lg:w-1/3 lg:sticky top-24 self-start">
            <div className="bg-card-background p-6 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold mb-6">Path Steps</h2>
              <div className="relative">
                {visibleSteps.map((step, index) => {
                  const stepResources = resources.filter(res =>
                    step.categories.some(catId => Array.isArray(res.category) ? res.category.includes(catId) : res.category === catId) && difficultyLevels.includes(res.difficulty)
                  );
                  const isCompleted = stepResources.length > 0 && stepResources.every(res => completedResources.includes(res.id));
                  const isActive = index === activeStepIndex;

                  return (
                    <div key={step.rank} className="timeline-item relative pl-10 pb-8">
                      <div className={`step-circle absolute left-0 top-1 w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm transition-all
                                      ${isActive ? 'bg-primary text-white ring-4 ring-primary/30' : isCompleted ? 'bg-green-500 text-white' : 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200'}`}>
                        {isCompleted ? <i className="fas fa-check"></i> : index + 1}
                      </div>
                      <button onClick={() => handleStepClick(index)} className={`text-left text-lg transition-colors hover:cursor-pointer ${isActive ? 'font-bold text-primary' : 'text-gray-800 dark:text-gray-200 hover:text-primary'}`}>
                        {step.title}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </aside>

          <main className="lg:w-2/3">
            <div className="bg-card-background rounded-xl shadow-lg p-8 min-h-[400px]">
              {currentStep ? (
                <>
                  <h2 className="text-3xl font-bold mb-2">{currentStep.title}</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-8">Resources organized by category for this step.</p>

                  {Object.keys(stepResources).length > 0 ? Object.entries(stepResources).map(([categoryTitle, resourcesInCategory]) => (
                    <div key={categoryTitle} className="mb-8">
                      <h3 className="text-xl font-semibold border-b-2 border-gray-200 dark:border-gray-700 pb-2 mb-4">{categoryTitle}</h3>
                      <div className="space-y-3">
                        {resourcesInCategory.map(res => (
                          <div key={res.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors">
                            <div onClick={() => setModalResource(res)} className="flex items-center cursor-pointer flex-grow min-w-0 mr-4">
                              <i className={`fa-fw ${getFormatIcon(res.format)} text-primary text-xl w-8 text-center`}></i>
                              <span className="font-medium ml-4 truncate">{res.title}</span>
                            </div>
                            <button 
                              onClick={() => toggleResourceCompletion(res.id)} 
                              title={completedResources.includes(res.id) ? 'Mark as Incomplete' : 'Mark as Complete'}
                              className={`flex-shrink-0 w-10 h-10 rounded-full transition-all duration-200 transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-card-background
                                          ${completedResources.includes(res.id) ? 'bg-green-500 text-white scale-100 hover:bg-green-600' : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 scale-90 hover:scale-100 hover:bg-green-200 dark:hover:bg-green-900/50'}`}>
                              <i className="fas fa-check"></i>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )) : <p className="text-center py-10 text-gray-500">No resources match the current difficulty for this step.</p>}
                </>
              ) : (
                <div className="text-center py-20 text-gray-500">
                  <p>Select a step from the left to see its resources.</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default PathDetailPage;
