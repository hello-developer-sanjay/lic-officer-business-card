import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');

if (rootElement) {
  try {
    // Log root content and document details before hydration
    console.log('[index.jsx] Root content before hydration:', rootElement.innerHTML);
    console.log('[index.jsx] Document head:', document.head.innerHTML.slice(0, 200));
    // Check for SSR content
    const hasSSRContent = rootElement.innerHTML.includes('navbar') || rootElement.innerHTML.includes('container');
    console.log('[index.jsx] SSR content detected:', hasSSRContent);
    if (!hasSSRContent) {
      console.warn('[index.jsx] No SSR content found. Check Vercel rewrite for / and backend logs.');
    }
    hydrateRoot(rootElement, <App />);
    console.log('[index.jsx] Hydration successful');
  } catch (error) {
    console.error('[index.jsx] Hydration failed:', error);
    import('react-dom/client').then(({ createRoot }) => {
      createRoot(rootElement).render(<App />);
      console.log('[index.jsx] Fallback to client-side rendering');
    }).catch(err => console.error('[index.jsx] Fallback import error:', err));
  }
} else {
  console.error('[index.jsx] Root element not found');
}
