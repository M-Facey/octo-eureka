<script lang="ts" setup>
import TodoItem from "./TodoItem.vue";
import EmptyTodo from "./EmptyTodo.vue";

import { useAppStore } from "@/stores/app";

const appStore = useAppStore();
</script>

<template>
  <div
    v-if="appStore.getTodosByStatus.length"
    class="relative flex flex-grow overflow-x-hidden overscroll-y-auto"
  >
    <transition-group
      name="todo-list"
      tag="div"
      class="flex flex-grow flex-col gap-y-3 overscroll-y-auto"
    >
      <todo-item
        v-for="todo in appStore.getTodosByStatus"
        :key="todo.id"
        :todo-id="todo.id"
        :todo-name="todo.name"
        :is-completed="todo.isCompleted"
        @toggle-completed="appStore.toggleIsCompleted(todo.id)"
        @delete-task="appStore.deleteTodo(todo.id)"
      />
    </transition-group>
  </div>
  <empty-todo v-else class="h-full" />
</template>

<style scoped>
.todo-list-move,
.todo-list-enter-active,
.todo-list-leave-active {
  transition: all 0.5s ease;
}

.todo-list-enter-from,
.todo-list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.todo-list-leave-active {
  position: absolute;
}
</style>
