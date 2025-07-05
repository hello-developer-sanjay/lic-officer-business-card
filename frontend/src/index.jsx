import { Provider } from 'react-redux';
import App from './App';
import React, { lazy, Suspense } from 'react';
import { hydrateRoot } from 'react-dom/client';



const rootElement = document.getElementById('root');

console.log('[index.jsx] Root element found:', !!rootElement);
console.log('[index.jsx] Data-hydration attribute:', rootElement?.hasAttribute('data-hydration'));
console.log('[index.jsx] Root innerHTML length:', rootElement?.innerHTML.length);
console.log('[index.jsx] Root innerHTML snippet (first 500 chars):', rootElement?.innerHTML.slice(0, 500));

if (rootElement) {
  hydrateRoot(
    rootElement,
    <React.StrictMode>
        <App />
        <Suspense fallback={null}>
        </Suspense>
    </React.StrictMode>
  );
} else {
  console.error('[index.jsx] Root element not found');
}
