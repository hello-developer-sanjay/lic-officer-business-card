import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Reviews from './pages/Reviews';
import { useLocation } from 'react-router-dom';
import Footer from './components/Footer';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <Router>
      <div className="relative z-0">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/join" element={<div>Join Page (TBD)</div>} />
          <Route path="/services" element={<div>Services Page (TBD)</div>} />
          <Route path="/about" element={<div>About Page (TBD)</div>} />
        </Routes>
                <Footer />

      </div>
    </Router>
  );
}

export default App;
