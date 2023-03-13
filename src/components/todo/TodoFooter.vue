<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";
import { onClickOutside } from "@vueuse/core";

import TodoButton from "./TodoButton.vue";
import SettingModal from "./SettingModal.vue";

import IconSettings from "../icons/IconSettings.vue";

import useScreenSize from "@/composables/useScreenSize";

import { useAppStore } from "@/stores/app";
import { useNotifyStore } from "@/stores/notify";

const appStore = useAppStore();
const notifyStore = useNotifyStore();

const { onMobile, onDesktop } = useScreenSize();

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
      <span
        class="text-neutral-900 dark:text-white"
        data-cy="totalOngoingTodos"
      >
        {{ appStore.getTotalOnGoingTodos }}</span
      >
      of <span data-cy="totalTodos"> {{ appStore.getTotalTodos }}</span> left
    </p>
    <div v-if="onDesktop" class="flex gap-2">
      <div class="relative">
        <todo-button
          button-id="open-settings-modal"
          button-label="Settings"
          button-size="sm"
          tooltip="Settings"
          data-cy="openSettingsModal"
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
        data-cy="clearCompletedTodos"
        @trigger-event="appStore.deleteCompletedTodo"
      />
    </div>
    <div
      class="w-max"
      :class="{
        'absolute -bottom-7 left-1/2 -translate-x-1/2': onDesktop,
        'text-white': onMobile,
      }"
    >
      <a
        target="_blank"
        href="https://icons8.com/icon/w0JUG294E8rU/todo-list"
        class="text-neutral-600 hover:text-neutral-900 font-bold"
        >Todo List</a
      >
      icon by
      <a
        target="_blank"
        href="https://icons8.com"
        class="text-neutral-600 hover:text-neutral-900 font-bold"
        >Icons8</a
      >
    </div>
  </div>
</template>
