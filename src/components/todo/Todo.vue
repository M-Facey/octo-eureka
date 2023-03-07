<script lang="ts" setup>
import TodoHeader from "./TodoHeader.vue";
import TodoList from "./TodoList.vue";
import TodoFooter from "./TodoFooter.vue";
import TodoNotificationList from "./TodoNotificationList.vue";
</script>

<template>
  <div
    class="absolute top-[58%] left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-full max-w-[700px] flex flex-col bg-neutral-200 dark:bg-neutral-900 rounded-lg"
  >
    <todo-header />
    <todo-list />
    <todo-footer />

    <todo-notification-list />
  </div>
</template>
