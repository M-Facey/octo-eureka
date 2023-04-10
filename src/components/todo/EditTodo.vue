<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import { nanoid } from "nanoid";

import TodoInput from "@/components/input/TodoInput.vue";
import TodoButton from "@/components/input/TodoButton.vue";
import TodoItem from "@/components/todo/TodoItem.vue";

import IconAdd from "@/components/icons/IconAdd.vue";
import IconClose from "@/components/icons/IconClose.vue";
import IconAlert from "@/components/icons/IconAlert.vue";
import IconEdit from "@/components/icons/IconEdit.vue";
import IconSave from "@/components/icons/IconSave.vue";

import useScreenSize from "@/composables/useScreenSize";

import { useAppStore } from "@/stores/app";
import { useNotifyStore } from "@/stores/notify";
import { useTagStore } from "@/stores/tag";

const appStore = useAppStore();
const notifyStore = useNotifyStore();
const tagStore = useTagStore();

const { onMobile } = useScreenSize();

const isRenaming = ref(false);
const toggleIsRenaming = () => {
  if (isRenaming && appStore.selectedTodo?.name === "") {
    appStore.selectedTodo.name = "Untitled";
  }
  isRenaming.value = !isRenaming.value;
};

const tagInput = ref("");

const addTags = () => {
  if (!appStore.selectedTodo || tagStore.getTagsByTodo.length >= 6) {
    tagInput.value = "";
    return;
  }

  tagStore.addNewTag(tagInput.value, appStore.selectedTodo.id);
  tagInput.value = "";
};

const removeTag = (tag: string) => {
  if (!appStore.selectedTodo) return;

  tagStore.removeTag(tag, appStore.selectedTodo.id);
  tagInput.value = "";
};

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
    } else {
      appStore.selectedTodo.isCompleted = false;
    }
  }
);
</script>

<template>
  <div
    v-if="appStore.selectedTodo"
    class="custom_scroll h-full flex flex-col pr-2 overflow-y-auto"
    :class="{
      'w-1/3 ml-2 ': !onMobile,
      'absolute w-full pl-1 bg-neutral-200 dark:bg-neutral-900': onMobile,
    }"
  >
    <div class="flex items-center">
      <h2
        class="flex items-center text-xl text-neutral-600 dark:text-white/50 font-bold"
      >
        Todo:
        <span
          class="block w-[85px] text-neutral-900 dark:text-white ml-1 overflow-hidden text-ellipsis whitespace-nowrap"
        >
          {{ appStore.selectedTodo.name }}
        </span>
      </h2>
      <todo-button
        button-id="close-edit-view"
        button-label="Close"
        button-size="xs"
        :show-label="false"
        data-cy="closeEditTodo"
        class="ml-auto"
        @trigger-event="toggleIsRenaming()"
      >
        <icon-edit v-show="!isRenaming" class="w-4 h-4 mx-0.5 my-1.5" />
        <icon-save v-show="isRenaming" class="w-4 h-4 mx-0.5 my-1.5" />
      </todo-button>
      <todo-button
        button-id="close-edit-view"
        button-label="Close"
        button-size="xs"
        :show-label="false"
        data-cy="closeEditTodo"
        class="ml-1"
        @trigger-event="closeEditView()"
      >
        <icon-close class="w-5 h-5 my-1" />
      </todo-button>
    </div>

    <todo-input
      v-if="isRenaming"
      type="text"
      placeholder="Enter Tag"
      v-model="appStore.selectedTodo.name"
      class="flex-grow my-2"
      :class="{ 'ml-1': !onMobile }"
      input-data-cy="tagInput"
      clear-data-cy="clearTags"
      search-data-cy="addTags"
      :has-clear-button="false"
      @trigger-event-on-enter="addTags()"
    />

    <hr class="my-1 border-neutral-300 dark:border-neutral-700" />

    <div class="mb-1">
      <p
        class="flex items-center gap-1 text-neutral-600 dark:text-neutral-400 text-sm mb-1"
      >
        <icon-alert class="w-4 text-red-500" />
        <span>Click tag to delete it </span>
      </p>
      <div
        class="flex flex-wrap justify-center gap-1.5 mx-auto"
        :class="{ 'mb-2': tagStore.getTagsByTodo.length !== 0 }"
      >
        <button
          v-for="tag in tagStore.getTagsByTodo"
          class="w-[31%] bg-black/20 dark:bg-white/10 hover:bg-red-500 hover:dark:bg-red-500 transition-colors px-2 py-0.5 text-black dark:text-white text-sm text-ellipsis whitespace-nowrap overflow-hidden rounded-md"
          @click="removeTag(tag)"
        >
          {{ tag }}
        </button>
      </div>
      <div class="flex gap-2">
        <todo-input
          type="text"
          placeholder="Enter Tag"
          v-model="tagInput"
          class="flex-grow"
          :class="{ 'ml-1': !onMobile }"
          input-data-cy="tagInput"
          clear-data-cy="clearTags"
          search-data-cy="addTags"
          @trigger-event-on-enter="addTags()"
        />
        <todo-button
          button-id="add-subtask"
          button-label="Add Subtask"
          button-size="xs"
          :show-label="false"
          data-cy="addTags"
          @trigger-event="addTags()"
        >
          <icon-add class="w-5 my-1" />
        </todo-button>
      </div>
    </div>

    <div v-if="onMobile" class="flex gap-2 my-2">
      <button
        class="relative w-1/2 bg-neutral-300 dark:bg-neutral-800 text-neutral-900 dark:text-white uppercase tracking-widest px-4 py-2 rounded"
        :class="{ active: viewSection === 'description' }"
        data-cy="showDescription"
        @click="changeView('description')"
      >
        {{ onMobile ? "Desc" : "Description" }}
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
      :class="{ 'pl-1': !onMobile }"
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
      class="min-h-[180px] flex flex-col flex-grow overflow-hidden"
    >
      <div class="w-full flex gap-x-2 mt-1.5">
        <todo-input
          type="text"
          placeholder="Enter Subtask"
          v-model="subtaskInput"
          class="flex-grow"
          :class="{ 'ml-1': !onMobile }"
          input-data-cy="subtaskInput"
          clear-data-cy="clearSubtaskInput"
          search-data-cy="searchSubtask"
          @trigger-event-on-enter="addSubtask()"
        />
        <todo-button
          button-id="add-subtask"
          button-label="Add Subtask"
          button-size="xs"
          :show-label="false"
          data-cy="addSubtask"
          @trigger-event="addSubtask()"
        >
          <icon-add class="w-5 h-5 mt-1.5" />
        </todo-button>
      </div>

      <transition-group
        v-if="appStore.selectedTodo.subtasks.length"
        name="todo-list"
        tag="div"
        class="custom_scroll relative flex flex-col gap-y-3 mt-3 pr-2 overflow-y-auto"
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
