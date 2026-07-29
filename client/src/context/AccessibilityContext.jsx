import React, { createContext, useContext, useState, useEffect } from 'react';

const AccessibilityContext = createContext();

export const AccessibilityProvider = ({ children }) => {
  const [fontSize, setFontSize] = useState('normal'); // 'normal', 'large', 'xlarge'
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    document.documentElement.classList.remove('text-size-large', 'text-size-xlarge');
    if (fontSize === 'large') {
      document.documentElement.style.fontSize = '18px';
    } else if (fontSize === 'xlarge') {
      document.documentElement.style.fontSize = '20px';
    } else {
      document.documentElement.style.fontSize = '16px';
    }
  }, [fontSize]);

  useEffect(() => {
    if (highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  }, [highContrast]);

  return (
    <AccessibilityContext.Provider value={{ fontSize, setFontSize, highContrast, setHighContrast }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => useContext(AccessibilityContext);
