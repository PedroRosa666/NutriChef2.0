import React, { useEffect } from 'react';
import { useSettingsStore } from '../store/settings';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useSettingsStore();

  useEffect(() => {
    const updateTheme = () => {
      const isDark = theme === 'dark';
      document.documentElement.classList.toggle('dark', isDark);
    };

    updateTheme();

  }, [theme]);

  return <>{children}</>;
}