<script lang="ts" setup>
export interface Prop {
  buttonLabel?: string;
  buttonSize: "lg" | "md" | "sm";
  isIconButton?: boolean;
}

withDefaults(defineProps<Prop>(), {
  isIconButton: false,
  buttonLabel: "",
});
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
    }"
  >
    <slot />
    {{ buttonLabel }}
  </button>
</template>
