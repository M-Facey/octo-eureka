<script lang="ts" setup>
import TodoButton from "@/components/input/TodoButton.vue";
import IconClose from "@/components/icons/IconClose.vue";
import { useModalStore } from "@/stores/modal";

const modalStore = useModalStore();
</script>

<template>
  <div class="absolute bottom-0 inset-x-0 translate-y-full bg-neutral-700 p-2 z-10">
    <div class="flex items-center justify-between mb-2">
      <h3 class="text-neutral-400 font-black uppercase tracking-wider">
        {{ modalStore.modalType }} modal
      </h3>
      <todo-button
        button-id="closeMobileModal"
        button-label="Close Mobile Modal"
        button-size="xs"
        data-cy="closeMobileModal"
        @click="modalStore.resetModal"
      >
        <icon-close class="w-4" />
      </todo-button>
    </div>
    <div class="flex flex-col gap-y-2">
      <button
        v-for="option in modalStore.modalOptions"
        class="py-2 rounded"
        :class="{
          'bg-black text-white font-bold':
            option.value === modalStore.currentModalOption,
          'bg-neutral-800 text-neutral-500':
            option.value !== modalStore.currentModalOption,
        }"
        @click.prevent="option.event()"
      >
        {{ option.displayName }}
      </button>
    </div>
  </div>
</template>
