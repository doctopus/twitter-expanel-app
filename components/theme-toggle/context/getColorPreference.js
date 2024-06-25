// components/theme-toggle/getColorPreference.js
export const getColorPreference = () => {
  const storageKey = 'theme-preference';

  if (typeof window !== 'undefined' && localStorage.getItem(storageKey)) {
    return localStorage.getItem(storageKey);
  }

  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  return 'light'; // default value for server-side rendering
};
