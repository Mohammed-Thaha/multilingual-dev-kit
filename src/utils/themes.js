// Centralized theme definitions for language-based cards
export const languageThemes = {
  en: { primary: '#3b82f6', secondary: '#1e40af', name: 'English' },
  fr: { primary: '#ef4444', secondary: '#b91c1c', name: 'French' },
  de: { primary: '#eab308', secondary: '#a16207', name: 'German' },
  hi: { primary: '#f97316', secondary: '#c2410c', name: 'Hindi' },
  ta: { primary: '#22c55e', secondary: '#15803d', name: 'Tamil' },
  ja: { primary: '#a855f7', secondary: '#7e22ce', name: 'Japanese' },
  'zh-CN': { primary: '#0ea5e9', secondary: '#0369a1', name: 'Chinese (Simplified)' },
  es: { primary: '#f59e0b', secondary: '#b45309', name: 'Spanish' }
};

export function getLanguageTheme(code) {
  return languageThemes[code] || languageThemes.en;
}
