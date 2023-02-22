<script lang="ts" setup>
import TodoButton from "./TodoButton.vue";

import IconCheck from "../icons/IconCheck.vue";
import IconClose from "../icons/IconClose.vue";

export interface Prop {
  todoId: string;
  todoName: string;
  isCompleted: boolean;
}

defineProps<Prop>();
defineEmits<{
  (e: "toggleCompleted"): void;
  (e: "deleteTask", id: string): void;
}>();
</script>

<template>
  <div class="w-full flex items-center px-4">
    <label
      for="taskCheck"
      class="relative w-6 h-6 flex items-center justify-center text-white border border-neutral-500 rounded"
      @click="$emit('toggleCompleted')"
    >
      <input
        :id="todoId"
        type="checkbox"
        class="absolute w-full h-full opacity-0 peer"
        :checked="isCompleted"
      />
      <icon-check class="w-4 opacity-0 peer-checked:opacity-100" />
    </label>

    <p class="ml-2 mr-auto text-neutral-300">{{ todoName }}</p>

    <todo-button button-size="sm" @trigger-event="$emit('deleteTask', todoId)">
      <icon-close class="w-5" />
    </todo-button>
  </div>
</template>
