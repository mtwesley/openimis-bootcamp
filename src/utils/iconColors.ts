/**
 * Utility functions for assigning colors to icons
 */

export const getIconColor = (iconClass: string, context?: string): string => {
  // Extract the main icon name from FontAwesome classes
  const iconName = iconClass.split(' ').pop()?.replace('fa-', '') || '';

  // Color mapping based on icon type
  const colorMap: Record<string, string> = {
    // Content types
    'youtube': 'icon-red',
    'graduation-cap': 'icon-purple',
    'list': 'icon-orange',
    'file-alt': 'icon-blue',
    'globe': 'icon-teal',
    'microsoft': 'icon-cyan',

    // Navigation and UI
    'road': 'icon-green',
    'chart-line': 'icon-indigo',
    'check-circle': 'icon-green',
    'hourglass-half': 'icon-yellow',
    'arrow-right': 'icon-blue',
    'chevron-left': 'icon-gray-600',

    // Time and progress
    'clock': 'icon-orange',
    'list-ol': 'icon-purple',
    'layer-group': 'icon-teal',
    'check': 'icon-green',

    // Actions
    'file-export': 'icon-blue',
    'file-import': 'icon-green',
    'book': 'icon-purple',
    'tags': 'icon-pink',
  };

  // Context-based overrides
  if (context === 'platform') {
    const platformColors: Record<string, string> = {
      'youtube': 'icon-red',
      'microsoft': 'icon-cyan',
      'default': 'icon-teal',
    };
    return platformColors[iconName] || platformColors.default;
  }

  if (context === 'format') {
    const formatColors: Record<string, string> = {
      'youtube': 'icon-red',         // Videos - Red
      'graduation-cap': 'icon-blue',  // Courses - Blue
      'list': 'icon-orange',
      'file-alt': 'icon-blue',
    };
    return formatColors[iconName] || 'icon-blue';
  }

  return colorMap[iconName] || 'icon-blue';
};

export const getDifficultyColor = (difficulty: string): string => {
  const colors: Record<string, string> = {
    'Beginner': 'icon-green',
    'Intermediate': 'icon-yellow',
    'Advanced': 'icon-red',
  };
  return colors[difficulty] || 'icon-blue';
};

export const getCategoryColor = (category: string): string => {
  // Simple hash function to assign consistent colors to categories
  const hash = category.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);

  const colors = [
    'icon-blue', 'icon-green', 'icon-purple', 'icon-orange',
    'icon-red', 'icon-teal', 'icon-pink', 'icon-indigo',
    'icon-yellow', 'icon-cyan'
  ];

  return colors[Math.abs(hash) % colors.length];
};