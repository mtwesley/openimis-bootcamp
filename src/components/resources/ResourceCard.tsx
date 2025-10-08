import React from 'react';
import type { Resource } from '../../types';

interface ResourceCardProps {
  resource: Resource;
  onClick?: () => void;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource, onClick }) => {
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

  const getPlatformTitle = (platform: string) => {
    // Simple mapping, can be expanded
    const platformNames: { [key: string]: string } = {
      youtube: 'YouTube',
      microsoft: 'Microsoft',
      gcfglobal: 'GCF Global',
      // Add more as needed
    };
    return platformNames[platform.toLowerCase()] || platform.charAt(0).toUpperCase() + platform.slice(1);
  };

  return (
    <div className="bg-card-background rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 flex flex-col cursor-pointer" onClick={onClick}>
      <div className="p-6 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold flex-grow pr-4">{resource.title}</h3>
          <span className="text-2xl text-gray-400 dark:text-gray-500">
            <i className={getPlatformIcon(resource.platform)}></i>
          </span>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{getPlatformTitle(resource.platform)}</p>
      </div>
      <div className="p-6 bg-gray-50 dark:bg-gray-800/50">
        <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-300 mb-4">
          <span><i className="fas fa-clock mr-1"></i> {resource.duration} hours</span>
          <span><i className={`${getFormatIcon(resource.format)} mr-1`}></i> {resource.format}</span>
        </div>
        <button onClick={onClick} className="w-full block text-center bg-primary text-white font-bold py-2 px-4 rounded-full hover:bg-secondary transition-colors">
          View Resource
        </button>
      </div>
    </div>
  );
};

export default ResourceCard;
