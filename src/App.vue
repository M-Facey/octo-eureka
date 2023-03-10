<script setup lang="ts">
import { onMounted, watch } from "vue";
import { usePreferredColorScheme } from "@vueuse/core";
import TheHeader from "./components/TheHeader.vue";
import Todo from "./components/todo/Todo.vue";

import { useThemeStore } from "./stores/theme";
const themeStore = useThemeStore();
const preferredColorScheme = usePreferredColorScheme();

onMounted(() => {
  if (
    themeStore.getTheme === "light" &&
    preferredColorScheme.value === "light"
  ) {
    document.documentElement.classList.remove("dark");
  } else {
    document.documentElement.classList.add("dark");
  }
});

watch(
  () => preferredColorScheme.value,
  (colorScheme) => {
    if (themeStore.getTheme !== "system") return;

    if (colorScheme === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }
);
</script>

<template>
  <main class="h-screen bg-neutral-400 overflow-hidden">
    <the-header />
    <todo />
  </main>
</template>
