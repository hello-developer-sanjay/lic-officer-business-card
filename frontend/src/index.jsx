import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');

if (rootElement) {
  try {
    hydrateRoot(rootElement, <App />);
    console.log('[index.jsx] Hydration successful');
  } catch (error) {
    console.error('[index.jsx] Hydration failed:', error);
    // Fallback to client-side rendering
    import('react-dom/client').then(({ createRoot }) => {
      createRoot(rootElement).render(<App />);
    });
  }
} else {
  console.error('[index.jsx] Root element not found');
}
