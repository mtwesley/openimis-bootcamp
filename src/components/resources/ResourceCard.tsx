import React from 'react';
import type { Resource } from '../../types';
import { getIconColor } from '../../utils/iconColors';
import { useData } from '../../contexts/DataContext';

interface ResourceCardProps {
  resource: Resource;
  onClick?: () => void;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource, onClick }) => {
  const { platforms } = useData();

  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'video': return 'fab fa-youtube';
      case 'course': return 'fas fa-graduation-cap';
      case 'playlist': return 'fas fa-list';
      default: return 'fas fa-file-alt';
    }
  };

  const getPlatformIcon = (platform: string) => {
    // This can be expanded with more platform icons
    if (platform.toLowerCase().includes('youtube')) return 'fab fa-youtube';
    if (platform.toLowerCase().includes('microsoft')) return 'fab fa-microsoft';
    return 'fas fa-globe';
  }

  const getPlatformTitle = (platformId: string) => {
    const platform = platforms.find(p => p.id === platformId);
    return platform ? platform.title : platformId.charAt(0).toUpperCase() + platformId.slice(1);
  };

  return (
    <div className="bg-card-background rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 flex flex-col cursor-pointer border border-gray-200 hover:border-primary/50" onClick={onClick}>
      <div className="p-6 flex-grow">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">{resource.title}</h3>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span className="flex items-center">
                <i className={`${getFormatIcon(resource.format)} mr-1 ${getIconColor(getFormatIcon(resource.format), 'format')}`}></i>
                {getPlatformTitle(resource.platform)}
              </span>
              <span className="flex items-center">
                <i className={`fas fa-clock mr-1 ${getIconColor('fas fa-clock')}`}></i>
                {resource.duration}h
              </span>
            </div>
          </div>
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center ml-4">
            <i className={`${getPlatformIcon(resource.platform)} ${getIconColor(getPlatformIcon(resource.platform), 'platform')} text-lg`}></i>
          </div>
        </div>
        <p className="text-gray-700 text-sm leading-relaxed">{resource.description}</p>
      </div>
      <div className="p-6 bg-gradient-to-r from-primary/5 to-secondary/5 border-t border-gray-100">
        <button onClick={onClick} className="w-full bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-secondary transition-colors shadow-sm">
          View Resource
        </button>
      </div>
    </div>
  );
};

export default ResourceCard;
