<script lang="ts" setup>
import { ref } from "vue";
import { useAppStore } from "@/store/app";

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
</script>

<template>
  <div
    class="absolute top-full -right-3 translate-y-5 bg-neutral-800 border border-neutral-700 p-3 rounded-lg"
  >
    <div v-for="status in statuses" class="flex items-center gap-x-2">
      <label
        :for="status.value"
        class="relative w-4 h-4 flex items-center justify-center text-white border border-neutral-500 rounded"
        @click.stop="appStore.changeStatus(status.value)"
      >
        <input
          :id="status.value"
          type="radio"
          class="absolute w-full h-full opacity-0 peer"
          :checked="status.value === appStore.viewingStatus"
        />
        <icon-check class="w-3 opacity-0 peer-checked:opacity-100" />
      </label>
      <p
        :class="{ 'text-neutral-500': status.value !== appStore.viewingStatus }"
      >
        {{ status.displayName }}
      </p>
    </div>
  </div>
</template>
