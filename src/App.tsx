import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import LearningPathsPage from './pages/LearningPathsPage';
import PathDetailPage from './pages/PathDetailPage';
import ResourceBrowserPage from './pages/ResourceBrowserPage';
import ProgressDashboardPage from './pages/ProgressDashboardPage';
import CategoriesPage from './pages/CategoriesPage';
import CategoryDetailPage from './pages/CategoryDetailPage';

const App: React.FC = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "OpenIMIS Bootcamp",
    "description": "A curated collection of free learning resources and structured career paths for OpenIMIS development teams.",
    "url": "https://openimis-bootcamp.netlify.app",
    "logo": "https://openimis-bootcamp.netlify.app/favicon.svg",
    "sameAs": [
      "https://github.com/mtwesley/openimis-bootcamp"
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/paths" element={<LearningPathsPage />} />
          <Route path="/path/:path_id" element={<PathDetailPage />} />
          <Route path="/resources" element={<ResourceBrowserPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/category/:category" element={<CategoryDetailPage />} />
          <Route path="/progress" element={<ProgressDashboardPage />} />
        </Routes>
      </Layout>
    </>
  );
};

export default App;
