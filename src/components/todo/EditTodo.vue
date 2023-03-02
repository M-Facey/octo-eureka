<script lang="ts" setup>
import { ref, watch } from "vue";
import { nanoid } from "nanoid";

import TodoInput from "./TodoInput.vue";
import TodoButton from "./TodoButton.vue";
import TodoItem from "./TodoItem.vue";

import IconAdd from "../icons/IconAdd.vue";
import IconClose from "../icons/IconClose.vue";

import { useAppStore } from "@/stores/app";
import { useNotifyStore } from "@/stores/notify";

const appStore = useAppStore();
const notifyStore = useNotifyStore();

const subtaskInput = ref("");

const addSubtask = () => {
  if (!subtaskInput.value) return;

  appStore.addSubtask({
    id: nanoid(),
    name: subtaskInput.value,
    description: "",
    subtasks: [],
    isCompleted: false,
    createdAt: new Date(),
  });
  subtaskInput.value = "";
};

const closeEditView = () => {
  appStore.isEditing = false;
  appStore.selectedTodo = undefined;
};

watch(
  () => appStore.getTotalOnGoingSubtask,
  (total) => {
    if (!appStore.selectedTodo) return;

    if (total === 0 && appStore.getTotalSubtasks > 0) {
      appStore.selectedTodo.isCompleted = true;
      notifyStore.addNotification(
        "success",
        `You've completed all subtasks for ${appStore.selectedTodo.name}`
      );
    }
  }
);
</script>

<template>
  <div v-if="appStore.selectedTodo" class="flex flex-col w-1/3 h-full mx-3">
    <div class="flex items-center justify-between">
      <h2 class="text-xl text-neutral-900 dark:text-white font-bold">
        Todo: {{ appStore.selectedTodo.name }}
      </h2>
      <todo-button
        button-id="close-edit-view"
        button-label="Close"
        button-size="sm"
        :show-label="false"
        @trigger-event="closeEditView()"
      >
        <icon-close class="w-5" />
      </todo-button>
    </div>

    <div class="flex-shrink-0">
      <label
        class="text-neutral-600 dark:text-neutral-400 text-sm tracking-wide"
        >Description</label
      >
      <textarea
        v-model="appStore.selectedTodo.description"
        placeholder="Enter description here"
        class="w-full h-32 mt-1.5 bg-neutral-300 dark:bg-neutral-800 border border-transparent hover:border-neutral-400 dark:hover:border-neutral-500 focus:border-neutral-400 dark:focus:border-neutral-500 focus:ring-4 focus:ring-neutral-400/50 dark:focus:ring-neutral-600/50 text-neutral-900 dark:text-neutral-300 px-3 py-2 resize-none outline-none rounded"
      ></textarea>
    </div>

    <div class="flex gap-x-2 mt-2">
      <todo-input
        type="text"
        placeholder="Enter Subtask"
        v-model="subtaskInput"
        @trigger-event-on-enter="addSubtask()"
      />
      <todo-button
        button-id="add-subtask"
        button-label="Add Subtask"
        button-size="sm"
        :show-label="false"
        @trigger-event="addSubtask()"
      >
        <icon-add class="w-6" />
      </todo-button>
    </div>

    <transition-group
      v-if="appStore.selectedTodo.subtasks.length"
      name="todo-list"
      tag="div"
      class="relative flex flex-grow flex-col gap-y-3 my-3 overflow-y-auto"
    >
      <todo-item
        v-for="{ id, name, isCompleted } in appStore.selectedTodo.subtasks"
        :key="id"
        :todo-id="id"
        :todo-name="name"
        :is-completed="isCompleted"
        class="mx-0"
        @delete-todo="appStore.deleteSubtask(id)"
        @toggle-completed="appStore.toggleSubtaskIsCompleted(id)"
      ></todo-item>
    </transition-group>
    <p v-else class="text-neutral-900 dark:text-white text-center mt-3">
      There are no subtasks available
    </p>
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
