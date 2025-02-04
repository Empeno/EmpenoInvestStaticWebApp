import { createContext, useState, useEffect, ReactNode } from 'react';

interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'cmyk',
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<string>(() => {
    return localStorage.getItem('theme') || 'cmyk';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'cmyk' ? 'night' : 'cmyk'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
