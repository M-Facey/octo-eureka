<script lang="ts" setup>
import { ref } from "vue";
import { nanoid } from "nanoid";
import { useAppStore } from "@/store/app";

import TodoInput from "./TodoInput.vue";
import TodoButton from "./TodoButton.vue";
import TodoItem from "./TodoItem.vue";
import FilterModal from "./FilterModal.vue";

import IconAdd from "../icons/IconAdd.vue";
import IconFilter from "../icons/IconFilter.vue";
import IconGrid from "../icons/IconGrid.vue";

const newTodo = ref("");
const appStore = useAppStore();

const add = () => {
  appStore.addTodo({
    id: nanoid(),
    name: newTodo.value,
    isCompleted: false,
  });

  newTodo.value = "";
};
</script>

<template>
  <div
    class="absolute top-[58%] left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-full max-w-[700px] bg-neutral-900 rounded-lg"
  >
    <div class="flex gap-3 p-4">
      <todo-input
        type="text"
        placeholder="Enter new todo here..."
        v-model="newTodo"
        :is-optional="false"
        class="flex-grow"
      />
      <todo-button
        button-label="Add Todo"
        button-size="sm"
        class="ml-auto"
        @click="add"
      >
        <icon-add class="w-5" />
      </todo-button>
      <todo-button button-size="sm" @click="appStore.toogleShowFilterModal()">
        <div class="relative">
          <icon-filter class="w-5" />
          <filter-modal
            v-if="appStore.showFilterModal"
            class="absolute z-10"
            @click.stop
          />
        </div>
      </todo-button>
      <todo-button button-size="sm">
        <icon-grid class="w-5" />
      </todo-button>
    </div>

    <transition-group
      name="todo-list"
      tag="div"
      class="divide-y divide-neutral-800 flex flex-col"
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
