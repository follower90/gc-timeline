import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Calculator from './components/Calculator';
import Menu from './components/Menu';
import Timeline from './components/Timeline';
import { LanguageProvider } from './contexts/LanguageContext';

const App = () => (
  <LanguageProvider>
    <Router>
      <div className="container">
        <Menu />
        <Routes>
          <Route path="/" element={<Timeline />} />
          <Route path="/calculator" element={<Calculator />} />
        </Routes>
      </div>
    </Router>
  </LanguageProvider>
);

export default App; 