import React from 'react';
import type { Resource } from '../../types';
import { getIconColor } from '../../utils/iconColors';

interface ResourceDetailModalProps {
  resource: Resource;
  onClose: () => void;
  platforms: { id: string; title: string }[];
  categories: { id: string; title: string; group_title: string }[];
  onToggleCompletion?: (resourceId: string) => void;
  isCompleted?: boolean;
}

const ResourceDetailModal: React.FC<ResourceDetailModalProps> = ({ resource, onClose, platforms, categories, onToggleCompletion, isCompleted }) => {
  const getPlatformTitle = (platformId: string) => {
    const platform = platforms.find(p => p.id === platformId);
    return platform ? platform.title : platformId.charAt(0).toUpperCase() + platformId.slice(1);
  };

  const getCategoryInfo = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? { title: category.title, groupTitle: category.group_title } : { title: 'Unknown', groupTitle: '' };
  };

  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'video': return 'fab fa-youtube';
      case 'youtube': return 'fab fa-youtube';
      case 'course': return 'fas fa-graduation-cap';
      case 'playlist': return 'fas fa-list';
      default: return 'fas fa-file-alt';
    }
  };

  const getGoToText = (format: string) => {
    const capitalized = format.charAt(0).toUpperCase() + format.slice(1);
    return `Go to ${capitalized}`;
  };

  const DifficultyIndicator: React.FC<{ level: number }> = ({ level }) => {
    const bars = [];
    let activeBars = 1;
    if (level === 2) {
      activeBars = 2;
    } else if (level >= 3) {
      activeBars = 3;
    }

    for (let i = 0; i < 3; i++) {
      bars.push(
        <div key={i} className={`h-2 w-5 rounded-full ${i < activeBars ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
      );
    }

    return <div className="flex items-center space-x-1">{bars}</div>;
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-bold flex items-center">
            <i className={`${getFormatIcon(resource.format)} ${getIconColor(getFormatIcon(resource.format), 'format')} mr-3`}></i>
            {resource.title}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
        </div>
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          <div className="mb-4">
            {(Array.isArray(resource.category) ? resource.category : [resource.category]).map(catId => {
              const categoryInfo = getCategoryInfo(catId);
              return (
                <span key={catId} className="inline-flex items-center bg-gray-200 text-gray-800 text-xs px-3 py-1 rounded-full mr-2 mb-2">
                  <span className="font-semibold">{categoryInfo.title}</span>
                  {categoryInfo.groupTitle && (
                    <span className="ml-1 text-gray-500">• {categoryInfo.groupTitle}</span>
                  )}
                </span>
              );
            })}
          </div>
          <p className="text-gray-600 mb-4">{resource.description}</p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-gray-100 p-3 rounded-lg flex justify-between items-center">
              <strong>Platform:</strong>
              <span>{getPlatformTitle(resource.platform)}</span>
            </div>
            <div className="bg-gray-100 p-3 rounded-lg flex justify-between items-center">
              <strong>Organization:</strong>
              <span>{resource.organization}</span>
            </div>
            <div className="bg-gray-100 p-3 rounded-lg flex justify-between items-center">
              <strong>Duration:</strong>
              <span>{resource.duration} hours</span>
            </div>
            <div className="bg-gray-100 p-3 rounded-lg flex justify-between items-center">
              <strong>Difficulty:</strong>
              <DifficultyIndicator level={resource.difficulty} />
            </div>
          </div>
        </div>
        <div className="p-6 flex justify-end gap-4 bg-gray-50 rounded-b-lg">
          <button onClick={onClose} className="bg-gray-200 font-bold py-2 px-6 rounded-full hover:bg-gray-300 transition-colors">Close</button>
          {onToggleCompletion && (
            <button 
              onClick={() => onToggleCompletion(resource.id)} 
              className={`font-bold py-2 px-6 rounded-full transition-all duration-200 transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50
                        ${isCompleted ? 'bg-green-500 text-white scale-100 hover:bg-green-600' : 'bg-gray-200 text-gray-700 scale-90 hover:scale-100 hover:bg-green-200'}`}>
              <i className={`fas fa-check mr-2 ${isCompleted ? '' : 'text-gray-500'}`}></i>
              {isCompleted ? 'Mark as Incomplete' : 'Mark as Complete'}
            </button>
          )}
          <a href={resource.url} target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white font-bold py-2 px-6 rounded-full hover:bg-blue-700 transition-colors">{getGoToText(resource.format)}</a>
        </div>
      </div>
    </div>
  );
};

export default ResourceDetailModal;
