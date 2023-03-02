<script lang="ts" setup>
import TodoButton from "./TodoButton.vue";
import IconClose from "../icons/IconClose.vue";
import IconSearch from "../icons/IconSearch.vue";

export interface Prop {
  label?: string;
  type: "text";
  placeholder: string;
  modelValue: string;
  isOptional?: boolean;
  hasClearButton?: boolean;
  hasSearchButton?: boolean;
}

withDefaults(defineProps<Prop>(), {
  label: "",
  isOptional: false,
  hasClearButton: true,
  hasSearchButton: false,
});

defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "triggerEventOnEnter"): void;
  (e: "clearTodoInput"): void;
}>();
</script>

<template>
  <div class="relative flex flex-col">
    <label v-if="label"
      >{{ label }} <span v-if="isOptional">(Optional)</span></label
    >
    <input
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      class="w-full h-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-transparent hover:border-neutral-400 dark:hover:border-neutral-500 focus:border-neutral-400 dark:focus:border-neutral-500 focus:ring-4 focus:ring-neutral-400/50 dark:focus:ring-neutral-600/50 text-neutral-800 dark:text-neutral-300 px-3 py-2 outline-none rounded-md"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
      @keypress.enter="$emit('triggerEventOnEnter')"
    />

    <div
      class="absolute top-1/2 right-1.5 -translate-y-1/2 flex gap-2 mb-[3px]"
    >
      <transition name="fade">
        <todo-button
          button-id="search-todos"
          v-if="modelValue.length !== 0 && hasSearchButton"
          button-label="Search Todos"
          button-size="xs"
          :is-icon-button="true"
        >
          <icon-search class="w-4" />
        </todo-button>
      </transition>
      <transition name="fade">
        <todo-button
          button-id="clear-todo-input"
          v-if="modelValue.length !== 0 && hasClearButton"
          button-label="Clear Todo Input"
          button-size="xs"
          :is-icon-button="true"
          @trigger-event="$emit('update:modelValue', '')"
        >
          <icon-close class="w-4" />
        </todo-button>
      </transition>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
