/**
 * Utility functions for assigning colors to icons
 */

export const getIconColor = (iconClass: string, context?: string): string => {
  // Extract the main icon name from FontAwesome classes
  const iconName = iconClass.split(' ').pop()?.replace('fa-', '') || '';

  // Color mapping based on icon type
  const colorMap: Record<string, string> = {
    // Content types
    'youtube': 'text-icon-red',
    'graduation-cap': 'text-icon-purple',
    'list': 'text-icon-orange',
    'file-alt': 'text-icon-blue',
    'globe': 'text-icon-teal',
    'microsoft': 'text-icon-cyan',

    // Navigation and UI
    'road': 'text-icon-green',
    'chart-line': 'text-icon-indigo',
    'check-circle': 'text-icon-green',
    'hourglass-half': 'text-icon-yellow',
    'arrow-right': 'text-icon-blue',
    'chevron-left': 'text-gray-600',

    // Time and progress
    'clock': 'text-icon-orange',
    'list-ol': 'text-icon-purple',
    'layer-group': 'text-icon-teal',
    'check': 'text-icon-green',

    // Actions
    'file-export': 'text-icon-blue',
    'file-import': 'text-icon-green',
    'book': 'text-icon-purple',
    'tags': 'text-icon-pink',
  };

  // Context-based overrides
  if (context === 'platform') {
    const platformColors: Record<string, string> = {
      'youtube': 'text-icon-red',
      'microsoft': 'text-icon-cyan',
      'default': 'text-icon-teal',
    };
    return platformColors[iconName] || platformColors.default;
  }

  if (context === 'format') {
    const formatColors: Record<string, string> = {
      'youtube': 'text-icon-red',         // Videos - Red
      'graduation-cap': 'text-icon-blue',  // Courses - Blue
      'list': 'text-icon-orange',
      'file-alt': 'text-icon-blue',
    };
    return formatColors[iconName] || 'text-icon-blue';
  }

  return colorMap[iconName] || 'text-icon-blue';
};

export const getDifficultyColor = (difficulty: string): string => {
  const colors: Record<string, string> = {
    'Beginner': 'text-icon-green',
    'Intermediate': 'text-icon-yellow',
    'Advanced': 'text-icon-red',
  };
  return colors[difficulty] || 'text-icon-blue';
};

export const getCategoryColor = (category: string): string => {
  // Simple hash function to assign consistent colors to categories
  const hash = category.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);

  const colors = [
    'text-icon-blue', 'text-icon-green', 'text-icon-purple', 'text-icon-orange',
    'text-icon-red', 'text-icon-teal', 'text-icon-pink', 'text-icon-indigo',
    'text-icon-yellow', 'text-icon-cyan'
  ];

  return colors[Math.abs(hash) % colors.length];
};