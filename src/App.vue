<script setup lang="ts">
import { onMounted, watch } from "vue";
import { usePreferredColorScheme } from "@vueuse/core";

import { version } from "../package.json";

import TheHeader from "@/components/section/TheHeader.vue";
import Todo from "@/components/todo/Todo.vue";
import NewFeature from "@/components/modal/NewFeature.vue";

import { useAppStore } from "@/stores/app";
import { useThemeStore } from "@/stores/theme";
import { useModalStore } from "@/stores/modal";

const appStore = useAppStore();
const themeStore = useThemeStore();
const modalStore = useModalStore();

const preferredColorScheme = usePreferredColorScheme();

onMounted(() => {
  // set the theme of the application on page loads
  if (
    themeStore.getTheme === "light" ||
    preferredColorScheme.value === "light"
  ) {
    document.documentElement.classList.remove("dark");
  } else {
    document.documentElement.classList.add("dark");
  }

  // open feature modal when version change
  const currentVersion = localStorage.getItem("__temp_version");
  if (currentVersion) {
    appStore.version = currentVersion;

    localStorage.removeItem("__temp_version");
    return;
  }

  if (appStore.version) {
    const incomingMajorVersion = parseInt(version.split(".")[1]);
    const currentMajorVersion = parseInt(appStore.version.split(".")[1]);

    if (incomingMajorVersion > currentMajorVersion) {
      modalStore.newFeature = true;
    }
  } else {
    appStore.version = version;
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
  <main class="relative h-screen bg-neutral-400 overflow-hidden">
    <the-header />
    <todo :version="appStore.version" />
    <new-feature v-if="modalStore.newFeature" :version="version" />
  </main>
</template>
