import { defineStore } from "pinia";

export const useThemeStore = defineStore({
  id: "theme",
  state: () => ({
    themeIndex: 0,
    themes: ["dark", "light", "system"],
  }),
  getters: {
    getNextTheme(): string {
      const nextIndex = (this.themeIndex + 1) % 3;
      return this.themes[nextIndex];
    },
    getTheme(): string {
      return this.themes[this.themeIndex];
    },
  },
  actions: {
    changeToNextTheme() {
      this.themeIndex = (this.themeIndex + 1) % 3;
    },
  },
});
