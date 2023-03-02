<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";
import { onClickOutside } from "@vueuse/core";

import TodoButton from "./TodoButton.vue";
import SettingModal from "./SettingModal.vue";

import IconSettings from "../icons/IconSettings.vue";

import { useAppStore } from "@/stores/app";
import { useNotifyStore } from "@/stores/notify";

const appStore = useAppStore();
const notifyStore = useNotifyStore();

const settingModal = ref<HTMLElement | null>();

watch(
  () => appStore.getTotalOnGoingTodos,
  (total) => {
    if (total === 0 && appStore.getTotalTodos !== 0) {
      notifyStore.addNotification("success", "You've completed all the todos");
    }
  }
);

onMounted(() => {
  onClickOutside(settingModal, (event) => {
    const element = event.target as HTMLDivElement;
    if (element.id === "open-settings-modal") return;

    appStore.setShowModal("");
  });
});
</script>

<template>
  <div class="flex items-center justify-between px-4 py-3">
    <p class="text-neutral-400 dark:text-neutral-600 font-medium">
      <span class="text-neutral-900 dark:text-white">
        {{ appStore.getTotalOnGoingTodos }}</span
      >
      of {{ appStore.getTotalTodos }} left
    </p>
    <div class="flex gap-2">
      <div class="relative">
        <todo-button
          button-id="open-settings-modal"
          button-label="Settings"
          button-size="sm"
          tooltip="Settings"
          @trigger-event="appStore.setShowModal('settings')"
        >
          <icon-settings class="w-5 pointer-events-none" />
        </todo-button>
        <transition name="todo-fade">
          <setting-modal
            v-if="appStore.showModal === 'settings'"
            ref="settingModal"
          />
        </transition>
      </div>
      <todo-button
        button-id="clear-completed-todos"
        button-label="Clear Completed"
        button-size="sm"
        :show-label="true"
        :is-disabled="
          !appStore.hasCompletedTodos || !appStore.getTodosByStatus.length
        "
        @trigger-event="appStore.deleteCompletedTodo"
      />
    </div>
  </div>
</template>
