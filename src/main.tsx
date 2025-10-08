import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { DataProvider } from './contexts/DataContext';
import { ProgressProvider } from './contexts/ProgressContext';
import { DifficultyProvider } from './contexts/DifficultyContext';
import './index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <DataProvider>
        <ProgressProvider>
          <DifficultyProvider>
            <App />
          </DifficultyProvider>
        </ProgressProvider>
      </DataProvider>
    </BrowserRouter>
  </React.StrictMode>
);
