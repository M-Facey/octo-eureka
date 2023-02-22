<script lang="ts" setup>
export interface Prop {
  buttonLabel?: string;
  buttonSize: "lg" | "md" | "sm";
  isIconButton?: boolean;
  isDisabled?: boolean;
}

withDefaults(defineProps<Prop>(), {
  buttonLabel: "",
  isIconButton: false,
  isDisabled: false,
});

defineEmits<{ (e: "triggerEvent"): void }>();
</script>

<template>
  <button
    class="text-neutral-300 rounded flex gap-1"
    :class="{
      'px-2 py-2': buttonSize === 'sm',
      'px-3 py-2': buttonSize === 'md',
      'px-8 py-4': buttonSize === 'lg',
      'bg-transparent hover:bg-neutral-800': isIconButton,
      'bg-neutral-800 hover:bg-neutral-700': !isIconButton,
      'font-medium text-neutral-600 bg-neutral-800': isDisabled,
      'text-neutral-300 bg-neutral-800': !isDisabled,
    }"
    :disabled="isDisabled"
    @click="$emit('triggerEvent')"
  >
    <slot />
    {{ buttonLabel }}
  </button>
</template>
