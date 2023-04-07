<script lang="ts" setup>
import TodoButton from "@/components/input/TodoButton.vue";

import IconCheck from "@/components/icons/IconCheck.vue";
import IconEdit from "@/components/icons/IconEdit.vue";
import IconClose from "@/components/icons/IconClose.vue";

import useScreenSize from "@/composables/useScreenSize";

export interface Prop {
  todoId: string;
  todoName: string;
  isCompleted: boolean;
  canEdit?: boolean;
  dataCy: string;
  hasSubTask?: boolean;
}

withDefaults(defineProps<Prop>(), {
  canEdit: false,
  hasSubTask: false,
});

defineEmits<{
  (e: "toggleCompleted"): void;
  (e: "editTodo", id: string): void;
  (e: "deleteTodo", id: string): void;
}>();

const { onMobile } = useScreenSize();
</script>

<template>
  <div
    class="w-full group flex items-center border bg-neutral-300 dark:bg-transparent dark:border-neutral-800 hover:border-transparent hover:bg-neutral-400 dark:hover:bg-black p-3 rounded-lg"
    :data-cy="dataCy"
  >
    <label
      for="taskCheck"
      class="relative w-6 h-6 flex items-center justify-center text-neutral-900 dark:text-white border border-neutral-500 rounded"
      :class="{ 'pointer-events-none': hasSubTask }"
      data-cy="todoCheck"
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
        'text-neutral-900 dark:text-neutral-300': !isCompleted,
      }"
    >
      {{ todoName }}
    </p>

    <div
      class="flex gap-x-3 ml-auto transition-opacity"
      :class="{ 'opacity-0 group-hover:opacity-100': !onMobile }"
    >
      <todo-button
        v-if="canEdit"
        button-id="edit-todo"
        button-label="Edit Todo"
        button-size="sm"
        data-cy="editTodo"
        @trigger-event="$emit('editTodo', todoId)"
      >
        <icon-edit class="w-5" />
      </todo-button>
      <todo-button
        button-id="delete-todo"
        button-label="Delete Todo"
        button-size="sm"
        data-cy="deleteTodo"
        @trigger-event="$emit('deleteTodo', todoId)"
      >
        <icon-close class="w-5" />
      </todo-button>
    </div>
  </div>
</template>

<style scoped>
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
  @apply bg-neutral-900 dark:bg-neutral-300;
}
</style>
