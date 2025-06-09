import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');

if (rootElement) {
  hydrateRoot(rootElement, <App />);
} else {
  console.error('[index.jsx] Root element not found');
}
