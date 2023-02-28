<script lang="ts" setup>
import { ref } from "vue";
import { useAppStore } from "@/stores/app";

import IconCheck from "../icons/IconCheck.vue";

const appStore = useAppStore();
const statuses = ref([
  {
    value: "all",
    displayName: "All",
  },
  {
    value: "ongoing",
    displayName: "Ongoing",
  },
  {
    value: "completed",
    displayName: "Completed",
  },
]);

const changeStatus = (status: string) => {
  if (appStore.viewingStatus === status) return;

  appStore.changeStatus(status);
  setTimeout(() => {
    appStore.setShowModal("filter");
  }, 250);
};
</script>

<template>
  <div
    class="absolute top-full -right-3 translate-y-5 flex flex-col gap-1 bg-neutral-800 border border-neutral-700/70 p-2 cursor-default rounded-lg"
  >
    <div v-for="status in statuses" class="flex items-center gap-x-2">
      <label
        :for="status.value"
        class="relative w-4 h-4 flex items-center justify-center text-white border border-neutral-500 hover:bg-neutral-900 cursor-pointer rounded group/filter"
        @click.stop="changeStatus(status.value)"
      >
        <input
          :id="status.value"
          type="radio"
          class="absolute w-full h-full opacity-0 peer"
          :checked="status.value === appStore.viewingStatus"
        />
        <icon-check
          class="w-3 opacity-0 peer-checked:opacity-100 group-hover/filter:opacity-40"
        />
      </label>
      <p
        class="cursor-pointer"
        :class="{
          'text-neutral-600 hover:text-neutral-400':
            status.value !== appStore.viewingStatus,
        }"
        @click="changeStatus(status.value)"
      >
        {{ status.displayName }}
      </p>
    </div>
  </div>
</template>
