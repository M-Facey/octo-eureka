<script lang="ts" setup>
import TodoHeader from "./TodoHeader.vue";
import TodoList from "./TodoList.vue";
import TodoFooter from "./TodoFooter.vue";
import TodoNotificationList from "./TodoNotificationList.vue";
</script>

<template>
  <div
    class="absolute top-[58%] left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-full max-w-[700px] flex flex-col bg-neutral-900 rounded-lg"
  >
    <todo-header />
    <todo-list />
    <todo-footer />

    <div class="w-max absolute -bottom-7 left-1/2 -translate-x-1/2">
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

    <todo-notification-list />
  </div>
</template>
