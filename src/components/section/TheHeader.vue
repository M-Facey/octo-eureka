<script lang="ts" setup>
import useScreenSize from "@/composables/useScreenSize";
const { onDesktop, onMobile, onMobileSm } = useScreenSize();
</script>

<template>
  <header
    class="absolute h-[35vh] w-full flex flex-col items-center justify-end bg-neutral-300 dark:bg-neutral-800"
    :class="{ 'pb-28': onDesktop, 'pb-[7vh]': onMobile }"
  >
    <div class="flex items-center gap-3">
      <div
        class="logo w-max bg-gradient-to-t from-neutral-400/80 dark:from-neutral-900/80 border-4 border-neutral-300 dark:border-neutral-700 p-2 rounded-xl"
        :class="{ 'p-2': onDesktop, 'p-1': onMobile }"
      >
        <img
          src="@/assets/logo.png"
          alt=""
          :class="{ 'w-8 h-8': onDesktop, 'w-6 h-6': onMobile }"
        />
      </div>
      <h1
        class="text-neutral-700 dark:text-neutral-500 font-gloock"
        :class="{
          'text-6xl': onDesktop,
          'text-4xl': onMobile,
        }"
      >
        Octo Eureka
      </h1>
    </div>
    <p
      class="text-center text-neutral-700 dark:text-neutral-200 font-os mt-3"
      :class="{
        'text-xl': onDesktop,
        'text-base': onMobile && !onMobileSm,
        'text-sm': onMobileSm,
      }"
    >
      A simple
      <span
        class="bg-neutral-600 dark:bg-neutral-300 text-neutral-100 dark:text-neutral-800 px-2 py-0.5 rounded-lg"
        >and efficient way</span
      >
      to do a <span class="font-extrabold text-red-500">REAL</span> todo.
    </p>
  </header>
</template>

<style scoped>
.logo {
  box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 40px 4px;
}
</style>
