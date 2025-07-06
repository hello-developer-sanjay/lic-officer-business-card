import React from 'react';
import { hydrateRoot } from 'react-dom/client'; // ✅ use hydrateRoot
import App from './App';

const rootElement = document.getElementById('root');
if (rootElement) {
  hydrateRoot(
    rootElement,
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
