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
    "description": "A comprehensive learning platform with structured career paths and curated resources for building skills in modern web development.",
    "url": "https://openimis-bootcamp.netlify.app",
    "logo": "https://openimis-bootcamp.netlify.app/favicon.svg",
    "sameAs": [
      "https://github.com/mtwesley/openimis-bootcamp"
    ],
    "educationalCredentialAwarded": "Certificate of Completion",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Learning Paths",
      "itemListElement": [
        {
          "@type": "Course",
          "name": "Full-Stack Web Development",
          "description": "Complete path from beginner to advanced web developer",
          "provider": {
            "@type": "EducationalOrganization",
            "name": "OpenIMIS Bootcamp"
          }
        }
      ]
    }
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
