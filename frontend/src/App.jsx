import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LicCaseStudy from './pages/LicCaseStudy';
import LicServices from './pages/LicServices';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<LicCaseStudy />} />
      <Route path="/services" element={<LicServices />} />
    </Routes>
  </Router>
);

export default App;
