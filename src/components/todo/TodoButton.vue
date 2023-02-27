<script lang="ts" setup>
export interface Prop {
  buttonLabel: string;
  buttonSize: "lg" | "md" | "sm" | "xs";
  isIconButton?: boolean;
  isDisabled?: boolean;
  showLabel?: boolean;
}

withDefaults(defineProps<Prop>(), {
  isIconButton: false,
  isDisabled: false,
  showLabel: false,
});

defineEmits<{ (e: "triggerEvent"): void }>();
</script>

<template>
  <button
    :aria-label="buttonLabel"
    class="text-neutral-300 rounded flex gap-1"
    :class="{
      'px-1.5 py-0.5': buttonSize === 'xs',
      'p-2': buttonSize === 'sm',
      'px-3 py-2': buttonSize === 'md',
      'px-8 py-4': buttonSize === 'lg',
      'text-neutral-500 bg-neutral-700': isDisabled,
      'bg-neutral-700 hover:bg-neutral-900': isIconButton,
      'bg-neutral-800 hover:bg-neutral-700': !isIconButton && !isDisabled,
    }"
    :disabled="isDisabled"
    @click="$emit('triggerEvent')"
  >
    <slot />
    <p v-if="showLabel">
      {{ buttonLabel }}
    </p>
  </button>
</template>
