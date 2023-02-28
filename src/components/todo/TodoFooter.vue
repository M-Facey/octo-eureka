<script lang="ts" setup>
import { watch } from "vue";
import TodoButton from "./TodoButton.vue";

import { useAppStore } from "@/stores/app";
import { useNotifyStore } from "@/stores/notify";

const appStore = useAppStore();
const notifyStore = useNotifyStore();

watch(
  () => appStore.getTotalOnGoingTodos,
  (total) => {
    if (total === 0 && appStore.getTotalTodos !== 0) {
      notifyStore.addNotification("success", "You've completed all the todos");
    }
  }
);
</script>

<template>
  <div class="flex items-center justify-between px-4 py-3">
    <p class="text-neutral-600 font-medium">
      <span class="text-white"> {{ appStore.getTotalOnGoingTodos }}</span>
      of {{ appStore.getTotalTodos }} left
    </p>
    <div></div>
    <todo-button
      button-label="Clear Completed"
      button-size="sm"
      :show-label="true"
      :is-disabled="
        !appStore.hasCompletedTodos || !appStore.getTodosByStatus.length
      "
      @trigger-event="appStore.deleteCompletedTodo"
    />
  </div>
</template>
