import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LicCaseStudy from './pages/LicCaseStudy';
import LicServices from './pages/LicServices';
import LicJeevenAnand from './pages/LicJeevenAnand';

import HealthProtectionPlus from './pages/HealthProtectionPlus';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<LicCaseStudy />} />
      <Route path="/services" element={<LicServices />} />
            <Route path="/policies/jeevan-anand" element={<LicJeevenAnand />} />

            <Route path="/policies/health-protection-plus" element={<HealthProtectionPlus />} />

    </Routes>
  </Router>
);

export default App;
