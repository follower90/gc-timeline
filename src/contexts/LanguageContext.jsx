import React from 'react';

export const LanguageContext = React.createContext({
  language: 'en',
  setLanguage: () => {},
  t: (key) => key,
});

export const useLanguageContext = () => React.useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = React.useState(() => {
    return localStorage.getItem('language') || 'en';
  });
  const [translations, setTranslations] = React.useState({});
  React.useEffect(() => {
    localStorage.setItem('language', language);
    import(`../translations/${language}.json`)
      .then((module) => {
        setTranslations(module.default);
      })
      .catch((error) => {
        console.error(`Error loading translations for ${language}:`, error);
      });
  }, [language]);

  const t = (key) => {
    const keys = key.split('.');
    let value = translations;
    for (const k of keys) {
      value = value?.[k] || '-';
    }
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}; 