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
      class="w-full bg-neutral-800 border border-neutral-700 hover:border-neutral-500 focus:border-neutral-500 focus:ring-4 focus:ring-neutral-600/50 text-neutral-300 px-3 py-2 outline-none rounded"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
      @keypress.enter="$emit('triggerEventOnEnter')"
    />

    <div class="absolute top-1/2 right-2 -translate-y-1/2 flex gap-2">
      <transition name="fade">
        <todo-button
          v-if="modelValue.length !== 0 && hasSearchButton"
          button-size="xs"
          :is-icon-button="true"
        >
          <icon-search class="w-4" />
        </todo-button>
      </transition>
      <transition name="fade">
        <todo-button
          v-if="modelValue.length !== 0 && hasClearButton"
          button-size="xs"
          :is-icon-button="true"
          @trigger-event="$emit('clearTodoInput')"
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
