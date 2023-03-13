<script lang="ts" setup>
import { ref } from "vue";
import { useAppStore } from "@/stores/app";

import IconCheck from "../icons/IconCheck.vue";

const appStore = useAppStore();
const sortOrders = ref([
  {
    value: "nameAsc",
    displayName: "Name (asc)",
  },
  {
    value: "nameDesc",
    displayName: "Name (desc)",
  },
  {
    value: "newest",
    displayName: "Newest",
  },
  {
    value: "oldest",
    displayName: "Oldest",
  },
]);

const changeSortOrder = (status: string) => {
  if (appStore.sortBy === status) return;

  appStore.setSortBy(status);
  setTimeout(() => {
    appStore.setShowModal("sortBy");
  }, 250);
};
</script>

<template>
  <div
    class="absolute top-full -right-3 translate-y-3 flex flex-col gap-1 bg-neutral-300 dark:bg-neutral-800 border border-neutral-700/70 p-2 cursor-default rounded-lg"
    data-cy="sortModal"
  >
    <div v-for="order in sortOrders" class="flex items-center gap-x-2">
      <label
        :for="order.value"
        class="relative w-4 h-4 flex items-center justify-center text-neutral-900 dark:text-white border border-neutral-500 hover:bg-neutral-400/30 dark:hover:bg-neutral-900 cursor-pointer rounded group/sort"
        :data-cy="order.value"
        @click.stop="changeSortOrder(order.value)"
      >
        <input
          :id="order.value"
          type="radio"
          class="absolute w-full h-full opacity-0 peer"
          :checked="order.value === appStore.sortBy"
        />
        <icon-check
          class="w-3 opacity-0 peer-checked:opacity-100 group-hover/sort:opacity-40"
        />
      </label>
      <p
        class="w-max cursor-pointer"
        :class="{
          'text-neutral-500 hover:text-neutral-400':
            order.value !== appStore.sortBy,
          'font-bold text-neutral-900 dark:text-neutral-300 ':
            order.value === appStore.sortBy,
        }"
        :data-cy="`${order.value}Label`"
        @click="changeSortOrder(order.value)"
      >
        {{ order.displayName }}
      </p>
    </div>
  </div>
</template>
