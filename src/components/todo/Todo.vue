<script lang="ts" setup>
import { ref } from "vue";
import { nanoid } from "nanoid";
import { useAppStore } from "@/store/app";

import TodoInput from "./TodoInput.vue";
import TodoButton from "./TodoButton.vue";
import TodoItem from "./TodoItem.vue";
import FilterModal from "./FilterModal.vue";
import EmptyTodo from "./EmptyTodo.vue";

import IconAdd from "../icons/IconAdd.vue";
import IconFilter from "../icons/IconFilter.vue";
import IconGrid from "../icons/IconGrid.vue";
import IconSort from "../icons/IconSort.vue";
import IconSun from "../icons/IconSun.vue";
import IconMoon from "../icons/IconMoon.vue";

const newTodo = ref("");
const appStore = useAppStore();

const addNewTodo = () => {
  if (!newTodo.value.trim()) return;

  appStore.addTodo({
    id: nanoid(),
    name: newTodo.value,
    isCompleted: false,
  });

  clearTodoInput();
};

const clearTodoInput = () => {
  newTodo.value = "";
};
</script>

<template>
  <div
    class="absolute top-[58%] left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-full max-w-[700px] flex flex-col bg-neutral-900 rounded-lg"
  >
    <div class="flex gap-3 p-4">
      <todo-input
        type="text"
        placeholder="Enter new todo here..."
        v-model="newTodo"
        :is-optional="false"
        class="flex-grow"
        @trigger-event-on-enter="addNewTodo"
        @clear-todo-input="clearTodoInput"
      />
      <todo-button
        button-label="Add Todo"
        button-size="sm"
        :is-disabled="!newTodo"
        class="ml-auto"
        @trigger-event="addNewTodo"
      >
        <icon-add class="w-5" />
      </todo-button>

      <todo-button
        button-size="sm"
        @trigger-event="appStore.toggleShowFilterModal"
      >
        <div class="relative">
          <icon-filter class="w-5" />
          <transition name="todo-fade">
            <filter-modal
              v-if="appStore.showFilterModal"
              class="absolute z-10"
              @click.stop
            />
          </transition>
        </div>
      </todo-button>
      <todo-button button-size="sm">
        <icon-grid class="w-5" />
      </todo-button>
      <todo-button button-size="sm">
        <icon-sort class="w-5 h-[1.20rem] text-neutral-200 mt-[3px]" />
      </todo-button>
      <todo-button button-size="sm">
        <icon-sun class="w-[1.20rem]" />
        <!-- <icon-moon class="w-5" /> -->
      </todo-button>
    </div>

    <div
      v-if="appStore.getTodosByStatus.length"
      class="relative flex flex-grow overflow-x-hidden overscroll-y-auto"
    >
      <transition-group
        name="todo-list"
        tag="div"
        class="divide-y divide-neutral-800 flex flex-grow flex-col overscroll-y-auto"
      >
        <todo-item
          v-for="todo in appStore.getTodosByStatus"
          :key="todo.id"
          :todo-id="todo.id"
          :todo-name="todo.name"
          :is-completed="todo.isCompleted"
          @toggle-completed="appStore.toggleIsCompleted(todo.id)"
          @delete-task="appStore.deleteTodo(todo.id)"
          class="py-3"
        />
      </transition-group>
    </div>
    <empty-todo v-else class="h-full" />

    <div class="flex items-center justify-between px-4 py-3">
      <p class="text-neutral-600 font-medium">
        <span class="text-white"> {{ appStore.getTotalOnGoingTodos }}</span>
        of {{ appStore.getTotalTodos }} left
      </p>
      <div></div>
      <todo-button
        button-label="Clear Completed"
        button-size="sm"
        :is-disabled="
          !appStore.hasCompletedTodos || !appStore.getTodosByStatus.length
        "
        @trigger-event="appStore.deleteCompletedTodo"
      />
    </div>

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
  </div>
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

.todo-fade-enter-active,
.todo-fade-leave-active {
  transition: opacity 0.5s ease;
}

.todo-fade-enter-from,
.todo-fade-leave-to {
  opacity: 0;
}
</style>
