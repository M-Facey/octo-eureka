<script lang="ts" setup>
export interface Prop {
  text: string;
}
defineProps<Prop>();
</script>

<template>
  <p
    class="tooltip absolute -top-3 -translate-y-full left-1/2 -translate-x-1/2 text-neutral-900 dark:text-neutral-100 bg-neutral-200 dark:bg-neutral-700 px-2 py-1 rounded"
  >
    {{ text }}
  </p>
</template>

<style scoped>
.tooltip::before {
  content: "";
  /* border: 6px solid transparent; */
  @apply absolute -bottom-[12px] left-1/2 -translate-x-1/2;
  @apply border-[6px] border-transparent border-t-neutral-200 dark:border-t-neutral-700;
}
</style>
