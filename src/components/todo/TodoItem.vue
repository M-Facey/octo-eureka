<script lang="ts" setup>
import TodoButton from "@/components/input/TodoButton.vue";

import IconCheck from "@/components/icons/IconCheck.vue";
import IconEdit from "@/components/icons/IconEdit.vue";
import IconClose from "@/components/icons/IconClose.vue";
import IconNote from "@/components/icons/IconNote.vue";
import IconTag from "@/components/icons/IconTag.vue";
import IconList from "@/components/icons/IconList.vue";

import useScreenSize from "@/composables/useScreenSize";

export interface Prop {
  todoId: string;
  todoName: string;
  isCompleted: boolean;
  canEdit?: boolean;
  dataCy: string;
  hasSubTask?: boolean;
  description?: string;
  noOfSubtask?: number;
  noOfTags?: number;
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
      class="relative w-6 h-6 flex-shrink-0 flex items-center justify-center text-neutral-900 dark:text-white border border-neutral-500 rounded"
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

    <div
      class="flex flex-col justify-center gap-x-4 gap-y-3 mx-2 overflow-hidden"
    >
      <p
        class="w-full font-bold break-all tracking-wide overflow-hidden"
        :class="{
          'completed text-neutral-500': isCompleted,
          'text-neutral-900 dark:text-neutral-100': !isCompleted,
        }"
      >
        {{ todoName }}
      </p>

      <div
        v-if="description || noOfSubtask || noOfTags"
        class="text-neutral-800 dark:text-neutral-400"
      >
        <div v-if="description" class="flex items-center gap-1 text-sm">
          <icon-note class="w-4 h-4" />
          <p class="w-full text-ellipsis whitespace-nowrap overflow-hidden">
            {{ description }}
          </p>
        </div>
        <div
          v-if="noOfSubtask || noOfTags"
          class="flex items-center gap-1 text-xs"
          :class="{ 'mt-1.5': description }"
        >
          <icon-tag v-if="noOfTags" class="w-3.5 h-3.5" />
          <p
            v-if="noOfTags"
            class="bg-black/10 dark:bg-white/10 px-1 py-0.5 font-bold rounded"
          >
            {{ noOfTags }} tag(s)
          </p>
          <icon-list
            v-if="noOfSubtask"
            class="w-3.5 h-3.5"
            :class="{ 'ml-2': noOfTags }"
          />
          <p
            v-if="noOfSubtask"
            class="bg-black/10 dark:bg-white/10 px-1 py-0.5 font-bold rounded"
          >
            {{ noOfSubtask }} subtask(s)
          </p>
        </div>
      </div>
    </div>

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
