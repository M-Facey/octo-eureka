<script lang="ts" setup>
import { ref } from "vue";

import TodoInput from "./TodoInput.vue";
import TodoButton from "./TodoButton.vue";

import IconAdd from "../icons/IconAdd.vue";
import IconFilter from "../icons/IconFilter.vue";
import IconGrid from "../icons/IconGrid.vue";

const newTodo = ref("");
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
      <todo-button button-label="Add Todo" button-size="sm" class="ml-auto">
        <icon-add class="w-5" />
      </todo-button>
      <todo-button button-size="md" :is-icon-button="true">
        <icon-filter class="w-5" />
      </todo-button>
      <todo-button button-size="md" :is-icon-button="true">
        <icon-grid class="w-5" />
      </todo-button>
    </div>
  </div>
</template>
