<script lang="ts" setup>
import TodoNotification from "./TodoNotification.vue";
import { useNotifyStore } from "@/store/notify";

const notifyStore = useNotifyStore();
</script>

<template>
  <div class="absolute bottom-4 w-full flex flex-col gap-y-2 items-center">
    <todo-notification
      v-for="{ id, type, detail } in notifyStore.notifications"
      :id="id"
      :type="type"
      :detail="detail"
    />
  </div>
</template>

<style scoped></style>
