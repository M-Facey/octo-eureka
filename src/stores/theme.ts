import { defineStore } from "pinia";

export const useThemeStore = defineStore({
  id: "theme",
  state: () => ({
    currentTheme: "dark",
  }),
  actions: {
    changeTheme(theme: string) {
      this.currentTheme = theme;
    },
  },
});
