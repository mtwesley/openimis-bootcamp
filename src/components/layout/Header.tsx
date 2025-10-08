import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navLink = (to: string, text: string) => (
    <Link to={to} onClick={() => setIsMobileMenuOpen(false)} className="block md:inline-block text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-2 rounded-md font-medium">{text}</Link>
  );

  return (
    <header className="bg-card-background/80 dark:bg-card-background/80 backdrop-blur-sm sticky top-0 z-50 shadow-md">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex-shrink-0 text-xl md:text-2xl font-bold text-primary flex items-center">
            <i className="fas fa-rocket mr-2"></i><span>OpenIMIS Bootcamp</span>
          </Link>
          <div className="hidden md:flex items-center space-x-4">
            {navLink('/paths', 'Learning Paths')}
            {navLink('/resources', 'Browse Resources')}
            {navLink('/progress', 'My Progress')}
          </div>
          <div className="flex items-center">
            <div className="md:hidden ml-2">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 rounded-md text-gray-500 dark:text-gray-400">
                <i className="fas fa-bars text-xl"></i>
              </button>
            </div>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4">
            {navLink('/paths', 'Learning Paths')}
            {navLink('/resources', 'Browse Resources')}
            {navLink('/progress', 'My Progress')}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
