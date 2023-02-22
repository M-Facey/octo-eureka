<script lang="ts" setup>
export interface Prop {
  label?: string;
  type: "text";
  placeholder: string;
  modelValue: string;
  isOptional?: boolean;
}

withDefaults(defineProps<Prop>(), {
  label: "",
  isOptional: false,
});
defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "triggerEvent"): void;
}>();
</script>

<template>
  <div class="flex flex-col">
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
      @keypress.enter="$emit('triggerEvent')"
    />
  </div>
</template>
