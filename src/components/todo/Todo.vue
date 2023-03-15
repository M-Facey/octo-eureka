<script lang="ts" setup>
import TodoHeader from "@/components/section/TodoHeader.vue";
import TodoList from "@/components/todo/TodoList.vue";
import TodoFooter from "@/components/section/TodoFooter.vue";
import TodoNotificationList from "@/components/notification/TodoNotificationList.vue";
import useScreenSize from "@/composables/useScreenSize";

const { onDesktop, onMobile } = useScreenSize();
</script>

<template>
  <div
    class="absolute w-full max-w-[700px] flex flex-col bg-neutral-200 dark:bg-neutral-900"
    :class="{
      'top-[58%] left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] rounded-lg':
        onDesktop,
      'bottom-0 h-[70vh] rounded-t-lg': onMobile,
    }"
  >
    <todo-header />
    <todo-list />
    <todo-footer />

    <todo-notification-list />
  </div>
</template>
