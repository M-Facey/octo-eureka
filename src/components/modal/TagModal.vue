<script lang="ts" setup>
import IconCheck from "@/components/icons/IconCheck.vue";
import type { ModalOption } from "@/types";

import { useModalStore } from "@/stores/modal";
const modalStore = useModalStore();

const changeStatus = (option: ModalOption) => {
  option.event();

  setTimeout(() => {
    modalStore.resetModal();
  }, 250);
};
</script>

<template>
  <div
    class="absolute top-full -right-3 translate-y-3 w-max max-h-[100px] flex flex-col gap-1 bg-neutral-300 dark:bg-neutral-800 border border-neutral-700 dark:border-neutral-700/70 p-2 cursor-default overflow-y-auto overflow-x-hidden rounded-lg"
  >
    <div class="custom_scroll h-full pr-2 overflow-y-auto">
      <div
        v-for="option in modalStore.modalOptions"
        class="flex items-center gap-x-2"
      >
        <label
          :for="option.value"
          class="relative w-4 h-4 flex items-center justify-center text-neutral-900 dark:text-white border border-neutral-500 hover:bg-neutral-400/30 dark:hover:bg-neutral-900 cursor-pointer rounded group/filter"
          :data-cy="option.value"
          @click.stop="changeStatus(option)"
        >
          <input
            :id="option.value"
            type="radio"
            class="absolute w-full h-full opacity-0 peer"
            :checked="option.value === modalStore.currentModalOption"
          />
          <icon-check
            class="w-3 opacity-0 peer-checked:opacity-100 group-hover/filter:opacity-40"
          />
        </label>
        <p
          class="max-w-[100px] text-ellipsis whitespace-nowrap overflow-hidden cursor-pointer"
          :class="{
            'text-neutral-500 hover:text-neutral-400':
              option.value !== modalStore.currentModalOption,
            'font-bold text-neutral-900 dark:text-neutral-300 ':
              option.value === modalStore.currentModalOption,
          }"
          :data-cy="`${option.value}Label`"
          @click="changeStatus(option)"
        >
          {{ option.displayName }}
        </p>
      </div>
    </div>
  </div>
</template>