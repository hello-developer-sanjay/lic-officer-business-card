import React from 'react';
import { hydrateRoot, createRoot } from 'react-dom/client';
import './styles/global.css';
import App from './App';

const rootElement = document.getElementById('root');

// If the root element already has SSR content (from homePageSSR.js), hydrate it
if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, <App />);
} else {
  // Otherwise, render normally (e.g., on client-side navigation)
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
