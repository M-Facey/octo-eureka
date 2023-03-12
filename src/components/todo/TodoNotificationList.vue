<script lang="ts" setup>
import TodoNotification from "./TodoNotification.vue";
import useScreenSize from "@/composables/useScreenSize";
import { useNotifyStore } from "@/stores/notify";

const notifyStore = useNotifyStore();

const { onMobile } = useScreenSize();
</script>

<template>
  <teleport to="#app" :disabled="!onMobile">
    <div
      class="absolute w-full flex flex-col gap-y-2 items-center"
      :class="{ 'bottom-4': !onMobile, 'top-0 z-10': onMobile }"
    >
      <todo-notification
        v-for="{ id, type, detail, canUndo } in notifyStore.notifications"
        :id="id"
        :type="type"
        :detail="detail"
        :can-undo="canUndo"
      />
    </div>
  </teleport>
</template>

<style scoped></style>
