import React from 'react';
import { Globe } from 'lucide-react';
import { useSettingsStore } from '../../store/settings';
import type { Language } from '../../lib/i18n/translations';

export function LanguageSwitch() {
  const { language, setLanguage } = useSettingsStore();

  const languages: { value: Language; label: string }[] = [
    { value: 'en', label: 'English' },
    { value: 'pt', label: 'Português' },
  ];

  return (
    <div className="flex items-center gap-2">
      <Globe className="w-4 h-4" />
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as Language)}
        className="bg-white dark:bg-gray-800 border-none focus:outline-none focus:ring-0 text-sm"
      >
        {languages.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}