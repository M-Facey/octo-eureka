<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { usePreferredColorScheme, onClickOutside } from "@vueuse/core";
import { nanoid } from "nanoid";

import TodoInput from "@/components/input/TodoInput.vue";
import TodoButton from "@/components/input/TodoButton.vue";
import FilterModal from "@/components/modal/FilterModal.vue";
import SortModal from "@/components/modal/SortModal.vue";
import TagModal from "@/components/modal/TagModal.vue";
import SettingModal from "@/components/modal/SettingModal.vue";
import MobileModal from "@/components/modal/MobileModal.vue";

import IconAdd from "@/components/icons/IconAdd.vue";
import IconFilter from "@/components/icons/IconFilter.vue";
import IconSort from "@/components/icons/IconSort.vue";
import IconSun from "@/components/icons/IconSun.vue";
import IconMoon from "@/components/icons/IconMoon.vue";
import IconSystem from "@/components/icons/IconSystem.vue";
import IconSettings from "@/components/icons/IconSettings.vue";
import IconHash from "@/components/icons/IconHash.vue";

import useScreenSize from "@/composables/useScreenSize";

import { useAppStore } from "@/stores/app";
import { useThemeStore } from "@/stores/theme";
import { useModalStore } from "@/stores/modal";

const appStore = useAppStore();
const themeStore = useThemeStore();
const modalStore = useModalStore();

const { onDesktop, onMobileMd, betweenMobileSmAndMd } = useScreenSize();

const newTodo = ref("");
const addNewTodo = () => {
  if (!newTodo.value.trim()) return;

  appStore.addTodo({
    id: nanoid(),
    name: newTodo.value,
    isCompleted: false,
    description: "",
    subtasks: [],
    createdAt: new Date(),
  });

  newTodo.value = "";
};

const filterModal = ref<HTMLElement | null>(null);
const sortModal = ref<HTMLElement | null>(null);
const tagModal = ref<HTMLElement | null>(null);
const settingsModal = ref<HTMLElement | null>(null);

const setTheme = () => {
  const preferredColorScheme = usePreferredColorScheme();
  const { getNextTheme, changeToNextTheme } = themeStore;
  changeToNextTheme();

  if (getNextTheme === "light" || preferredColorScheme.value === "light") {
    document.documentElement.classList.remove("dark");
  } else {
    document.documentElement.classList.add("dark");
  }
};

const setModal = (modalType: string) => {
  if (modalType === "filter") {
    modalStore.createFilterModal();
  } else if (modalType === "sort") {
    modalStore.createSortModal();
  } else if (modalType === "tag") {
    modalStore.createTagModal();
  } else if (modalType == "settings") {
    modalStore.createSettingsModal();
  }
};

onMounted(() => {
  onClickOutside(filterModal, (event) => {
    const element = event.target as HTMLButtonElement;
    if (element.id === "filter-todo") return;

    modalStore.resetModal();
  });

  onClickOutside(sortModal, (event) => {
    const element = event.target as HTMLButtonElement;
    if (element.id === "sort-todo") return;

    modalStore.resetModal();
  });

  onClickOutside(tagModal, (event) => {
    const element = event.target as HTMLButtonElement;
    if (element.id === "tag-todo") return;

    modalStore.resetModal();
  });

  onClickOutside(settingsModal, (event) => {
    const element = event.target as HTMLButtonElement;
    if (element.id === "settings") return;

    modalStore.resetModal();
  });
});
</script>

<template>
  <div
    class="relative flex gap-3 p-4"
    :class="{ 'flex-col': onMobileMd, 'flex-row': onDesktop }"
  >
    <div class="flex flex-grow gap-3">
      <todo-input
        type="text"
        placeholder="Enter new todo here..."
        v-model="newTodo"
        :is-optional="false"
        class="flex-grow"
        input-data-cy="todoInput"
        clear-data-cy="clearTodoInput"
        search-data-cy="searchTodoInput"
        @trigger-event-on-enter="addNewTodo"
      />
      <todo-button
        button-id="add-todo"
        button-label="Add Todo"
        button-size="sm"
        :show-label="onDesktop"
        :is-disabled="!newTodo"
        class="ml-auto"
        data-cy="addTodo"
        @trigger-event="addNewTodo"
      >
        <icon-add class="w-5" />
      </todo-button>
    </div>

    <div class="flex gap-3">
      <div class="relative" :class="{ 'w-1/3': onMobileMd }">
        <todo-button
          button-id="filter-todo"
          button-label="Filter"
          button-size="sm"
          tooltip="Filter"
          :show-label="betweenMobileSmAndMd"
          :class="{ 'w-full items-center justify-center text-sm': onMobileMd }"
          data-cy="openFilterModal"
          @trigger-event="setModal('filter')"
        >
          <icon-filter class="w-5 pointer-events-none" />
        </todo-button>
        <transition v-if="!onMobileMd" name="todo-fade">
          <filter-modal
            v-if="modalStore.modalType === 'filter'"
            ref="filterModal"
            class="absolute z-10"
          />
        </transition>
      </div>

      <div class="relative" :class="{ 'w-1/3': onMobileMd }">
        <todo-button
          button-id="tag-todo"
          button-label="Tag"
          button-size="sm"
          tooltip="Tag"
          :show-label="betweenMobileSmAndMd"
          :class="{ 'w-full items-center justify-center text-sm': onMobileMd }"
          data-cy="openTagModal"
          @trigger-event="setModal('tag')"
        >
          <icon-hash class="w-5 pointer-events-none" />
        </todo-button>
        <transition v-if="!onMobileMd" name="todo-fade">
          <tag-modal
            v-if="modalStore.modalType === 'tag'"
            ref="tagModal"
            class="absolute z-10"
          />
        </transition>
      </div>

      <div class="relative" :class="{ 'w-1/3': onMobileMd }">
        <todo-button
          button-id="sort-todo"
          button-label="Sort"
          button-size="sm"
          tooltip="Sort"
          :show-label="betweenMobileSmAndMd"
          :class="{ 'w-full items-center justify-center text-sm': onMobileMd }"
          data-cy="openSortModal"
          @trigger-event="setModal('sort')"
        >
          <icon-sort class="w-5 h-[1.20rem] mt-[3px] pointer-events-none" />
        </todo-button>
        <transition v-if="!onMobileMd" name="todo-fade">
          <sort-modal
            v-if="modalStore.modalType === 'sort'"
            ref="sortModal"
            class="absolute z-10"
            @click.stop
          />
        </transition>
      </div>

      <div v-if="!onDesktop" class="relative" :class="{ 'w-1/3': onMobileMd }">
        <todo-button
          v-if="!onDesktop"
          button-id="settings"
          button-label="Settings"
          button-size="sm"
          tooltip="Settings"
          :show-label="betweenMobileSmAndMd"
          data-cy="openMobileSettingsModal"
          :class="{ 'w-full items-center justify-center text-sm': onMobileMd }"
          @trigger-event="setModal('settings')"
        >
          <icon-settings class="w-5 pointer-events-none" />
        </todo-button>
        <transition v-if="!onMobileMd" name="todo-fade">
          <setting-modal
            v-if="modalStore.modalType === 'settings'"
            ref="settingsModal"
            class="absolute z-10"
            bottom
            @click.stop
          />
        </transition>
      </div>
    </div>

    <teleport to="#app" :disabled="onDesktop">
      <todo-button
        button-id="change-theme"
        button-label="Change Theme"
        button-size="sm"
        :tooltip="`Theme: ${themeStore.getTheme}`"
        :is-theme-button="true"
        data-cy="changeTheme"
        @trigger-event="setTheme()"
      >
        <icon-sun
          v-show="themeStore.getTheme === 'light'"
          class="w-[1.20rem]"
        />
        <icon-moon v-show="themeStore.getTheme === 'dark'" class="w-5" />
        <icon-system v-show="themeStore.getTheme === 'system'" class="w-5" />
      </todo-button>
    </teleport>

    <mobile-modal v-if="modalStore.modalType && onMobileMd" />
  </div>
</template>
