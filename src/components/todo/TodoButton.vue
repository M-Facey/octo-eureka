<script lang="ts" setup>
import TodoTooltip from "./TodoTooltip.vue";

export interface Prop {
  buttonLabel: string;
  buttonSize: "lg" | "md" | "sm" | "xs";
  isIconButton?: boolean;
  isDisabled?: boolean;
  showLabel?: boolean;
  tooltip?: string;
}

withDefaults(defineProps<Prop>(), {
  isIconButton: false,
  isDisabled: false,
  showLabel: false,
  tooltip: "",
});

defineEmits<{ (e: "triggerEvent"): void }>();
</script>

<template>
  <button
    :aria-label="buttonLabel"
    class="group/btn relative border-2 border-transparent focus:border-neutral-600 dark:focus:border-neutral-500 rounded flex gap-1"
    :class="{
      'px-1.5 py-0.5': buttonSize === 'xs',
      'p-2': buttonSize === 'sm',
      'px-3 py-2': buttonSize === 'md',
      'px-8 py-4': buttonSize === 'lg',
      'text-neutral-500 dark:text-neutral-500 bg-neutral-400 dark:bg-neutral-700':
        isDisabled,
      'text-neutral-800 dark:text-neutral-300 bg-neutral-00 dark:bg-neutral-700 hover:bg-neutral-500 dark:hover:bg-neutral-900':
        isIconButton,
      'text-neutral-800 dark:text-neutral-300 bg-neutral-300 dark:bg-neutral-800 hover:bg-neutral-500 dark:hover:bg-neutral-700':
        !isIconButton && !isDisabled,
    }"
    :disabled="isDisabled"
    @click="$emit('triggerEvent')"
  >
    <slot />
    <p v-if="showLabel">
      {{ buttonLabel }}
    </p>

    <todo-tooltip
      v-if="tooltip"
      :text="tooltip"
      class="group-hover/btn:block group-focus/btn:hidden hidden"
    />
  </button>
</template>
