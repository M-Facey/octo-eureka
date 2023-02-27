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
  <div
    class="card group flex items-center border border-neutral-800 hover:border-transparent hover:bg-black mx-3 p-3 rounded-lg"
  >
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

    <p
      class="font-bold tracking-wide ml-2 mr-auto"
      :class="{
        'completed text-neutral-500': isCompleted,
        'text-neutral-300': !isCompleted,
      }"
    >
      {{ todoName }}
    </p>

    <div
      class="flex gap-x-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
    >
      <todo-button
        button-label="Delete Todo"
        button-size="sm"
        @trigger-event="$emit('deleteTask', todoId)"
      >
        <icon-close class="w-5" />
      </todo-button>
    </div>
  </div>
</template>

<style scoped>
.card {
  width: calc(100% - 32px);
}

.completed {
  position: relative;
}

.completed::before {
  content: "";
  position: absolute;

  top: 50%;
  left: 0px;
  width: 100%;
  height: 2px;

  transform: translateY(-50%);
  @apply bg-neutral-300;
}
</style>
