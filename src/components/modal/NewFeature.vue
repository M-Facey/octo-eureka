<script lang="ts" setup>
import { ref } from "vue";
import IconClose from "../icons/IconClose.vue";
import IconCheck from "../icons/IconCheck.vue";
import TodoButton from "../input/TodoButton.vue";

import { useModalStore } from "@/stores/modal";
import { useAppStore } from "@/stores/app";
import { useTagStore } from "@/stores/tag";
import { useThemeStore } from "@/stores/theme";

export interface Props {
  version: string;
}
const props = defineProps<Props>();

const readModal = ref(false);
const toggleOption = () => {
  readModal.value = !readModal.value;
};

const appStore = useAppStore();
const modalStore = useModalStore();
const tagStore = useTagStore();
const themeStore = useThemeStore();

const onClose = (performOperation: boolean) => {
  if (performOperation) {
    appStore.$reset();
    modalStore.$reset();
    tagStore.$reset();
    themeStore.$reset();

    appStore.version = props.version;
    return;
  }
  modalStore.newFeature = false;
};
</script>

<template>
  <div
    class="w-screen h-screen absolute top-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-10"
  >
    <div class="w-full max-w-[500px] h-min bg-white p-3 mx-4 rounded">
      <div action="">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold">New Feature Alert</h2>
          <todo-button
            button-id="closeFeatureModal"
            button-label="Close Feature Modal"
            button-size="xs"
            data-cy="closeFeatureModal"
            @trigger-event="onClose(false)"
          >
            <icon-close class="w-5 h-5 my-1" />
          </todo-button>
        </div>
        <hr class="my-2" />
        <p>
          Hey there👋, so they are some new features
          <span class="text-red-500">(aka breaking changes)</span> in
          <span
            class="bg-gray-300 px-1.5 py-1 font-bold tracking-wider rounded"
            >{{ version }}</span
          >. To ensure those new feature work as expected, it's recommended to
          clear the store by clicking button 👇 below.
        </p>

        <p class="text-sm pt-1">
          <span class="font-bold">Please Note:</span> You may see the modal
          again if you don't add a todo after clicking the button below
        </p>

        <div class="flex items-center gap-2 pt-2">
          <label
            for="updateTermsCheckbox"
            class="relative w-5 h-5 flex items-center justify-center text-neutral-900 border border-neutral-500 rounded"
            data-cy="todoCheck"
          >
            <input
              id="updateTermsCheckbox"
              type="checkbox"
              class="absolute w-full h-full opacity-0 peer"
              :checked="readModal"
              @click="toggleOption"
            />
            <icon-check class="w-4 opacity-0 peer-checked:opacity-100" />
          </label>

          <label for="updateTermsCheckbox">I have read information above</label>
        </div>

        <div v-if="readModal">
          <hr class="my-3" />
          <todo-button
            button-id="clear and close"
            button-label="Clear store and close modal"
            button-size="md"
            data-cy="clear-and-close"
            show-label
            class="mx-auto"
            @trigger-event="onClose(true)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
