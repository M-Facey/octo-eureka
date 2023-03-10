<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import { nanoid } from "nanoid";

import TodoInput from "./TodoInput.vue";
import TodoButton from "./TodoButton.vue";
import TodoItem from "./TodoItem.vue";

import IconAdd from "../icons/IconAdd.vue";
import IconClose from "../icons/IconClose.vue";

import useScreenSize from "@/composables/useScreenSize";

import { useAppStore } from "@/stores/app";
import { useNotifyStore } from "@/stores/notify";

const appStore = useAppStore();
const notifyStore = useNotifyStore();

const { onMobile } = useScreenSize();

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

const viewSection = ref("");
const changeView = (sectionName: string) => {
  viewSection.value = sectionName;
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
  <div
    v-if="appStore.selectedTodo"
    class="flex flex-col h-full"
    :class="{
      'w-1/3 mx-3': !onMobile,
      'absolute w-full bg-neutral-200 dark:bg-neutral-900': onMobile,
    }"
  >
    <div class="flex items-center justify-between">
      <h2 class="text-xl text-neutral-900 dark:text-white font-bold">
        Todo: {{ appStore.selectedTodo.name }}
      </h2>
      <todo-button
        button-id="close-edit-view"
        button-label="Close"
        button-size="sm"
        :show-label="false"
        data-cy="closeEditTodo"
        @trigger-event="closeEditView()"
      >
        <icon-close class="w-5" />
      </todo-button>
    </div>

    <div v-if="onMobile" class="flex gap-2 my-2">
      <button
        class="relative w-1/2 bg-neutral-300 dark:bg-neutral-800 text-neutral-900 dark:text-white uppercase tracking-widest px-4 py-2 rounded"
        :class="{ active: viewSection === 'description' }"
        data-cy="showDescription"
        @click="changeView('description')"
      >
        Description
      </button>
      <button
        class="relative w-1/2 bg-neutral-300 dark:bg-neutral-800 text-neutral-900 dark:text-white uppercase tracking-widest px-4 py-2 rounded"
        :class="{ active: viewSection === 'subtasks' }"
        data-cy="showSubtasks"
        @click="changeView('subtasks')"
      >
        Subtasks
      </button>
    </div>

    <div
      v-if="!onMobile || viewSection === 'description'"
      class="flex-shrink-0"
    >
      <label
        v-if="!onMobile"
        class="text-neutral-600 dark:text-neutral-400 text-sm tracking-wide"
        >Description</label
      >
      <textarea
        v-model="appStore.selectedTodo.description"
        placeholder="Enter description here"
        class="w-full h-32 mt-1.5 bg-neutral-300 dark:bg-neutral-800 border border-transparent hover:border-neutral-400 dark:hover:border-neutral-500 focus:border-neutral-400 dark:focus:border-neutral-500 focus:ring-4 focus:ring-neutral-400/50 dark:focus:ring-neutral-600/50 text-neutral-900 dark:text-neutral-300 px-3 py-2 resize-none outline-none rounded"
        data-cy="todoDescription"
      ></textarea>
    </div>

    <div
      v-if="!onMobile || viewSection === 'subtasks'"
      class="flex flex-col flex-grow overflow-hidden"
    >
      <div class="w-full flex gap-x-2 mt-2">
        <todo-input
          type="text"
          placeholder="Enter Subtask"
          v-model="subtaskInput"
          class="flex-grow ml-1"
          input-data-cy="subtaskInput"
          clear-data-cy="clearSubtaskInput"
          search-data-cy="searchSubtask"
          @trigger-event-on-enter="addSubtask()"
        />
        <todo-button
          button-id="add-subtask"
          button-label="Add Subtask"
          button-size="sm"
          :show-label="false"
          data-cy="addSubtask"
          @trigger-event="addSubtask()"
        >
          <icon-add class="w-6" />
        </todo-button>
      </div>

      <transition-group
        v-if="appStore.selectedTodo.subtasks.length"
        name="todo-list"
        tag="div"
        class="relative flex flex-col gap-y-3 my-3 overflow-y-auto"
      >
        <todo-item
          v-for="{ id, name, isCompleted } in appStore.selectedTodo.subtasks"
          :key="id"
          :todo-id="id"
          :todo-name="name"
          :is-completed="isCompleted"
          class="mx-0"
          data-cy="subtask"
          @delete-todo="appStore.deleteSubtask(id)"
          @toggle-completed="appStore.toggleSubtaskIsCompleted(id)"
        ></todo-item>
      </transition-group>
      <p v-else class="text-neutral-900 dark:text-white text-center mt-3">
        There are no subtasks available
      </p>
    </div>
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

.active::before {
  content: "";
  @apply absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-cyan-500 rounded-t;
}
</style>
