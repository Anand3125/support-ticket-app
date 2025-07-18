import React, { createContext, useContext, useMemo, useState, ReactNode } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

interface ThemeContextType {
  mode: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const CustomThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<'light' | 'dark'>(
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  );

  const toggleTheme = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeToggle = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeToggle must be used within a CustomThemeProvider');
  }
  return context;
}; 