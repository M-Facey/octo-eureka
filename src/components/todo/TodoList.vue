<script lang="ts" setup>
import TodoItem from "@/components/todo/TodoItem.vue";
import EditTodo from "@/components/todo/EditTodo.vue";
import EmptyTodo from "@/components/todo/EmptyTodo.vue";

import { useAppStore } from "@/stores/app";

const appStore = useAppStore();
</script>

<template>
  <div
    v-if="appStore.getTodosByTag.length"
    class="relative flex flex-grow overflow-hidden mx-4"
  >
    <transition-group
      name="todo-list"
      tag="div"
      class="relative flex flex-grow flex-col gap-y-3 overflow-x-hidden overflow-y-auto"
    >
      <todo-item
        v-for="todo in appStore.getTodosByTag"
        :key="todo.id"
        :todo-id="todo.id"
        :todo-name="todo.name"
        :is-completed="todo.isCompleted"
        :can-edit="true"
        data-cy="todo"
        @toggle-completed="appStore.toggleIsCompleted(todo.id)"
        @edit-todo="appStore.setSelectedTodo(todo.id)"
        @delete-todo="appStore.deleteTodo(todo.id)"
      />
    </transition-group>
    <edit-todo v-if="appStore.isEditing" />
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
