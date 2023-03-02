<script lang="ts" setup>
import TodoButton from "./TodoButton.vue";
import IconClose from "../icons/IconClose.vue";
import IconDelete from "../icons/IconDelete.vue";

import { useAppStore } from "@/stores/app";
const appStore = useAppStore();

// So there are situations where the deployment of some releases
// has a features that changes the structure of the store saved
// in local storage. So that local storage needs to be reset
// and the page reloaded.
const nukeIt = () => {
  localStorage.clear();
  location.reload();
};
</script>

<template>
  <div
    class="absolute -top-3 -translate-y-full -right-2 w-max p-3 backdrop-blur-sm bg-neutral-100 dark:bg-neutral-800/70 border border-neutral-500/50 dark:border-neutral-700/70 rounded-md"
  >
    <div
      class="flex items-center justify-between border-b border-neutral-300 dark:border-neutral-700 pb-2.5 mb-3"
    >
      <h3 class="text-neutral-700 dark:text-neutral-200 text-sm tracking-wide">
        Settings
      </h3>
      <todo-button
        button-id="close-settings-model"
        button-label="Close Settings Modal"
        button-size="xs"
        :is-icon-button="true"
        @trigger-event="appStore.setShowModal('')"
      >
        <icon-close class="w-4" />
      </todo-button>
    </div>
    <div>
      <todo-button
        button-id="clear-localstorage"
        button-label="Clear Storage"
        button-size="sm"
        :show-label="true"
        :is-icon-button="true"
        @trigger-event="nukeIt()"
      >
        <icon-delete class="w-4" />
      </todo-button>
    </div>
  </div>
</template>
