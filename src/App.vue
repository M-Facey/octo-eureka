<script setup lang="ts">
import { onMounted } from "vue";
import TheHeader from "./components/TheHeader.vue";
import Todo from "./components/todo/Todo.vue";

import { useThemeStore } from "./stores/theme";
const themeStore = useThemeStore();

onMounted(() => {
  if (themeStore.getTheme === "light") {
    document.documentElement.classList.remove("dark");
  } else if (
    themeStore.getTheme === "dark" ||
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    document.documentElement.classList.add("dark");
  }
});
</script>

<template>
  <main class="h-screen bg-neutral-400">
    <the-header />
    <todo />
  </main>
</template>
