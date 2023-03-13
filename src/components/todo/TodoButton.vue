<script lang="ts" setup>
import TodoTooltip from "./TodoTooltip.vue";
import useScreenSize from "@/composables/useScreenSize";

export interface Prop {
  buttonId: string;
  buttonLabel: string;
  buttonSize: "lg" | "md" | "sm" | "xs";
  isIconButton?: boolean;
  isDisabled?: boolean;
  showLabel?: boolean;
  tooltip?: string;
  isThemeButton?: boolean;
  dataCy: string;
}

const { onMobile, onDesktop } = useScreenSize();

withDefaults(defineProps<Prop>(), {
  isIconButton: false,
  isDisabled: false,
  showLabel: false,
  tooltip: "",
  isThemeButton: false,
});

defineEmits<{ (e: "triggerEvent"): void }>();
</script>

<template>
  <button
    :id="buttonId"
    :aria-label="buttonLabel"
    :data-cy="dataCy"
    class="group/btn border-2 border-transparent focus:border-neutral-600 dark:focus:border-neutral-500 rounded flex gap-1"
    :class="{
      'px-1': buttonSize === 'xs',
      'p-2': buttonSize === 'sm',
      'px-3 py-2': buttonSize === 'md',
      'px-8 py-4': buttonSize === 'lg',
      'text-neutral-500 dark:text-neutral-500 bg-neutral-400 dark:bg-neutral-700':
        isDisabled,
      'text-neutral-800 dark:text-neutral-300 bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-500/50 dark:hover:bg-neutral-900':
        isIconButton,
      'text-neutral-800 dark:text-neutral-300 bg-neutral-300 dark:bg-neutral-800 hover:bg-neutral-500/50 dark:hover:bg-neutral-700':
        !isIconButton && !isDisabled,
      'absolute top-4 right-4 z-10': onMobile && isThemeButton,
      relative: onDesktop && isThemeButton,
    }"
    :disabled="isDisabled"
    @click.stop="$emit('triggerEvent')"
  >
    <slot />
    <p v-if="showLabel" class="w-max">
      {{ buttonLabel }}
    </p>

    <todo-tooltip
      v-if="tooltip && onDesktop"
      :text="tooltip"
      class="group-hover/btn:block group-focus/btn:hidden hidden"
    />
  </button>
</template>
