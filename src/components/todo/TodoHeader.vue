<script lang="ts" setup>
import { ref } from "vue";
import { nanoid } from "nanoid";

import TodoInput from "./TodoInput.vue";
import TodoButton from "./TodoButton.vue";
import FilterModal from "./FilterModal.vue";
import SortModal from "./SortModal.vue";

import IconAdd from "../icons/IconAdd.vue";
import IconFilter from "../icons/IconFilter.vue";
import IconGrid from "../icons/IconGrid.vue";
import IconSort from "../icons/IconSort.vue";
import IconSun from "../icons/IconSun.vue";
import IconMoon from "../icons/IconMoon.vue";
import IconSystem from "../icons/IconSystem.vue";

import { useAppStore } from "@/stores/app";
import { useThemeStore } from "@/stores/theme";

const appStore = useAppStore();
const themeStore = useThemeStore();

const newTodo = ref("");
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
  const { getNextTheme, changeToNextTheme } = themeStore;
  changeToNextTheme();

  if (getNextTheme === "light") {
    document.documentElement.classList.remove("dark");
  } else if (
    getNextTheme === "dark" ||
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    document.documentElement.classList.add("dark");
  }
};
</script>

<template>
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
      tooltip="Filter"
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
      tooltip="Sort"
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
      tooltip="Theme"
      @trigger-event="setTheme()"
    >
      <icon-sun v-show="themeStore.getTheme === 'light'" class="w-[1.20rem]" />
      <icon-moon v-show="themeStore.getTheme === 'dark'" class="w-5" />
      <icon-system v-show="themeStore.getTheme === 'system'" class="w-5" />
    </todo-button>
  </div>
</template>

<style scoped>
.todo-fade-enter-active,
.todo-fade-leave-active {
  transition: opacity 0.5s ease;
}

.todo-fade-enter-from,
.todo-fade-leave-to {
  opacity: 0;
}
</style>
