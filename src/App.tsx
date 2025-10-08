import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import LearningPathsPage from './pages/LearningPathsPage';
import PathDetailPage from './pages/PathDetailPage';
import ResourceBrowserPage from './pages/ResourceBrowserPage';
import ProgressDashboardPage from './pages/ProgressDashboardPage';

const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/paths" element={<LearningPathsPage />} />
        <Route path="/path/:path_id" element={<PathDetailPage />} />
        <Route path="/resources" element={<ResourceBrowserPage />} />
        <Route path="/progress" element={<ProgressDashboardPage />} />
      </Routes>
    </Layout>
  );
};

export default App;
