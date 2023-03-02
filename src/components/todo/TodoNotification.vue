<script lang="ts" setup>
import { computed } from "vue";
import { useAppStore } from "@/stores/app";
import { useNotifyStore } from "@/stores/notify";
import TodoButton from "./TodoButton.vue";

import IconClose from "../icons/IconClose.vue";
import IconUndo from "../icons/IconUndo.vue";

export interface Props {
  id: string;
  type: string;
  detail: string;
  canUndo?: boolean;
}

const prop = withDefaults(defineProps<Props>(), {
  canUndo: false,
});

const appStore = useAppStore();
const notifyStore = useNotifyStore();

const hasErrorType = computed(
  () => prop.type === "delete" || prop.type === "limit"
);

const currentNotification = computed(() =>
  notifyStore.notifications.find((notify) => notify.id === prop.id)
);

const undoDeleteAction = () => {
  appStore.undoDeletedTodos();
  notifyStore.closeNotification(currentNotification.value, true);
};
</script>

<template>
  <div
    class="notify flex items-center gap-x-2 p-2 text-white border backdrop-blur-sm rounded-lg"
    :class="{
      'bg-green-500/50 border-green-500': type === 'success',
      'bg-red-600/40 border-red-700': hasErrorType,
    }"
  >
    <p class="">{{ detail }}</p>

    <todo-button
      v-if="canUndo"
      button-id="undo-deleted-todos"
      button-label="Undo Delete Todos"
      button-size="sm"
      class="ml-4"
      @trigger-event="undoDeleteAction"
    >
      <icon-undo class="w-5 px-0.5" />
    </todo-button>

    <todo-button
      button-id="close-notification"
      button-label="Close Notification"
      button-size="sm"
      @trigger-event="notifyStore.closeNotification(currentNotification, true)"
    >
      <icon-close class="w-5" />
    </todo-button>
  </div>
</template>

<style scoped>
.notify {
  position: relative;
  top: 0;
  transform: translateY(20px);
  animation: fade-in ease-in 250ms forwards;
}

@keyframes fade-in {
  0% {
    transform: translateY(20px);
    opacity: 0;
  }

  100% {
    transform: translateY(0px);
    opacity: 1;
  }
}
</style>
