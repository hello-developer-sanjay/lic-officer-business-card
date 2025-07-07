import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LicCaseStudy from './pages/LicCaseStudy';
import LicServices from './pages/LicServices';
import LicJeevenAnand from './pages/LicJeevenAnand';
import NewJeevanShanti from './pages/NewJeevanShanti';
import ChildMoneyBack from './pages/ChildMoneyBack';
import JeevanLabh from './pages/JeevanLabh';

import HealthProtectionPlus from './pages/HealthProtectionPlus';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<LicCaseStudy/>} />
      <Route path="/services" element={<LicServices/>} />
            <Route path="/policies/jeevan-anand" element={<LicJeevenAnand/>} />
            <Route path="/policies/jeevan-shanti" element={<NewJeevanShanti/>} />
            <Route path="/policies/health-protection-plus" element={<HealthProtectionPlus/>} />
            <Route path="/policies/child-money-back" element={<ChildMoneyBack/>} />
            <Route path="/policies/jeevan-labh" element={<JeevanLabh/>} />

      

    </Routes>
  </Router>
);

export default App;
