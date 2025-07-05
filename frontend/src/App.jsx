import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './homePage';
import Reviews from './pages/Reviews';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/join" element={<div>Join Page (TBD)</div>} />
        <Route path="/services" element={<div>Services Page (TBD)</div>} />
        <Route path="/about" element={<div>About Page (TBD)</div>} />
      </Routes>
    </Router>
  );
};

export default App;
