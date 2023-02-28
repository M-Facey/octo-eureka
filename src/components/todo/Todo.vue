<script lang="ts" setup>
import { ref, watch } from "vue";
import { nanoid } from "nanoid";
import { useAppStore } from "@/stores/app";
import { useNotifyStore } from "@/stores/notify";
import { useThemeStore } from "@/stores/theme";

import TodoInput from "./TodoInput.vue";
import TodoButton from "./TodoButton.vue";
import TodoItem from "./TodoItem.vue";
import FilterModal from "./FilterModal.vue";
import SortModal from "./SortModal.vue";
import EmptyTodo from "./EmptyTodo.vue";
import TodoNotificationList from "./TodoNotificationList.vue";

import IconAdd from "../icons/IconAdd.vue";
import IconFilter from "../icons/IconFilter.vue";
import IconGrid from "../icons/IconGrid.vue";
import IconSort from "../icons/IconSort.vue";
import IconSun from "../icons/IconSun.vue";
import IconMoon from "../icons/IconMoon.vue";

const newTodo = ref("");

const appStore = useAppStore();
const notifyStore = useNotifyStore();
const themeStore = useThemeStore();

const addNewTodo = () => {
  if (!newTodo.value.trim()) return;

  appStore.addTodo({
    id: nanoid(),
    name: newTodo.value,
    isCompleted: false,
    createdAt: new Date(),
  });

  clearTodoInput();
};

const clearTodoInput = () => {
  newTodo.value = "";
};

const setTheme = () => {
  themeStore.currentTheme === "dark"
    ? themeStore.changeTheme("light")
    : themeStore.currentTheme === "light"
    ? themeStore.changeTheme("system")
    : themeStore.changeTheme("dark");

  if (themeStore.currentTheme === "dark") {
    document.documentElement.classList.add("dark");
  } else if (themeStore.currentTheme === "light") {
    document.documentElement.classList.remove("dark");
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.documentElement.classList.add("dark");
  }
};

watch(
  () => appStore.getTotalOnGoingTodos,
  (total) => {
    if (total === 0) {
      notifyStore.addNotification("success", "You've completed all the todos");
    }
  }
);
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
        :show-label="true"
        :is-disabled="!newTodo"
        class="ml-auto"
        @trigger-event="addNewTodo"
      >
        <icon-add class="w-5" />
      </todo-button>

      <todo-button
        button-label="Filter Todos"
        button-size="sm"
        @trigger-event="appStore.setShowModal('filter')"
      >
        <div class="relative">
          <icon-filter class="w-5" />
          <transition name="todo-fade">
            <filter-modal
              v-if="appStore.showModal === 'filter'"
              class="absolute z-10"
              @click.stop
            />
          </transition>
        </div>
      </todo-button>
      <todo-button button-label="Change Layout" button-size="sm">
        <icon-grid class="w-5" />
      </todo-button>
      <todo-button
        button-label="Sort Todos"
        button-size="sm"
        @trigger-event="appStore.setShowModal('sortBy')"
      >
        <div class="relative">
          <icon-sort class="w-5 h-[1.20rem] text-neutral-200 mt-[3px]" />
          <transition name="todo-fade">
            <sort-modal
              v-if="appStore.showModal === 'sortBy'"
              class="absolute z-10"
              @click.stop
            />
          </transition>
        </div>
      </todo-button>
      <todo-button
        button-label="Change Theme"
        button-size="sm"
        @trigger-event="setTheme()"
      >
        <icon-sun
          v-show="themeStore.currentTheme === 'dark'"
          class="w-[1.20rem]"
        />
        <icon-moon v-show="themeStore.currentTheme === 'light'" class="w-5" />
      </todo-button>
    </div>

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

    <div class="flex items-center justify-between px-4 py-3">
      <p class="text-neutral-600 font-medium">
        <span class="text-white"> {{ appStore.getTotalOnGoingTodos }}</span>
        of {{ appStore.getTotalTodos }} left
      </p>
      <div></div>
      <todo-button
        button-label="Clear Completed"
        button-size="sm"
        :show-label="true"
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

    <todo-notification-list />
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
