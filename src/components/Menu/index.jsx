import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguageContext } from '../../contexts/LanguageContext';

const Menu = () => {
  const { language, setLanguage, t } = useLanguageContext();

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'uk', label: 'Українська' },
  ];

  return (
    <nav className="menu">
      <div className="menu-links">
        <NavLink
          to="/"
          className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}
        >
          {t('menu.timelineCalculator')}
        </NavLink>
        <NavLink
          to="/calculator"
          className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}
        >
          {t('menu.i485Prediction')}
        </NavLink>
      </div>
      <div className="language-switcher">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="language-select"
        >
          {languages.map(({ code, label }) => (
            <option key={code} value={code}>
              {label}
            </option>
          ))}
        </select>
      </div>
    </nav>
  );
};

export default Menu; 