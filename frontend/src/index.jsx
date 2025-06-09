import React, { useEffect, useState } from 'react';
import { hydrateRoot } from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');

if (rootElement) {
  const RootWrapper = () => {
    const [ssrContent, setSsrContent] = useState(null);

    useEffect(() => {
      console.log('[index.jsx] Fetching SSR content at', new Date().toISOString());
      fetch('https://lic-backend-8jun.onrender.com/', {
        method: 'GET',
        headers: { 'Accept': 'text/html' },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
          }
          return response.text();
        })
        .then(html => {
          console.log('[index.jsx] SSR HTML fetched, length:', html.length);
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, 'text/html');
          const rootContent = doc.getElementById('root')?.innerHTML || '';
          setSsrContent(rootContent);
          console.log('[index.jsx] SSR content parsed:', rootContent.slice(0, 100));
        })
        .catch(error => {
          console.error('[index.jsx] SSR fetch failed:', error);
          setSsrContent(null);
        });
    }, []);

    // Log initial DOM state
    console.log('[index.jsx] Root content before hydration:', rootElement.innerHTML);
    console.log('[index.jsx] Document head:', document.head.innerHTML.slice(0, 200));

    try {
      // If SSR content is fetched, update DOM before hydration
      if (ssrContent) {
        rootElement.innerHTML = ssrContent;
        console.log('[index.jsx] SSR content injected into DOM');
      }
      console.log('[index.jsx] SSR content detected:', !!ssrContent);
      hydrateRoot(rootElement, <App />);
      console.log('[index.jsx] Hydration successful');
    } catch (error) {
      console.error('[index.jsx] Hydration failed:', error);
      import('react-dom/client').then(({ createRoot }) => {
        createRoot(rootElement).render(<App />);
        console.log('[index.jsx] Fallback to client-side rendering');
      }).catch(err => console.error('[index.jsx] Fallback import error:', err));
    }

    return null;
  };

  // Render wrapper to trigger fetch
  hydrateRoot(rootElement, <RootWrapper />);
} else {
  console.error('[index.jsx] Root element not found');
}
