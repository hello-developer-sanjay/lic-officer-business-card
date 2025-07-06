import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// Check if running on the client and if the root element exists
if (typeof window !== 'undefined' && window.document) {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    // Use hydrateRoot if SSR content is present, otherwise render
    if (window.__INITIAL_HTML__) {
      root.hydrateRoot(
        <React.StrictMode>
          <App />
        </React.StrictMode>,
        rootElement
      );
    } else {
      root.render(
        <React.StrictMode>
          <App />
        </React.StrictMode>
      );
    }
  }
}

export default App;
