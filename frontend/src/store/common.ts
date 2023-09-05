import { defineStore } from 'pinia';

export const useCommonSettings = defineStore('commonSettings', {
  state: () => ({
    darkMode: 'system',
  }),
  persist: {
    key: 'HRSystemSettings',
    storage: localStorage,
  },
  actions: {
    toggleDark() {
      if (
        this.darkMode === 'dark' ||
        (this.darkMode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
      ) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
  },
});
