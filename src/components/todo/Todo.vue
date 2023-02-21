<script lang="ts" setup>
import { ref } from "vue";
import { nanoid } from "nanoid";
import { useApp } from "@/store/app";

import TodoInput from "./TodoInput.vue";
import TodoButton from "./TodoButton.vue";
import TodoItem from "./TodoItem.vue";

import IconAdd from "../icons/IconAdd.vue";
import IconFilter from "../icons/IconFilter.vue";
import IconGrid from "../icons/IconGrid.vue";

const newTodo = ref("");
const appStore = useApp();

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
      <todo-button button-size="md" :is-icon-button="true">
        <icon-filter class="w-5" />
      </todo-button>
      <todo-button button-size="md" :is-icon-button="true">
        <icon-grid class="w-5" />
      </todo-button>
    </div>

    <div class="divide-y divide-neutral-800 flex flex-col">
      <todo-item
        v-for="todo in appStore.todos"
        :todo-id="todo.id"
        :todo-name="todo.name"
        :is-completed="todo.isCompleted"
        @toggle-completed="appStore.toggleIsCompleted(todo.id)"
        @delete-task="appStore.deleteTodo(todo.id)"
        class="py-3"
      />
    </div>
  </div>
</template>
