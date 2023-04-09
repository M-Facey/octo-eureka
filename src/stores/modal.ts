import { defineStore } from "pinia";
import type { ModalOption } from "@/types";
import { useTagStore } from "./tag";

export const useModalStore = defineStore({
  id: "modal",
  state: () => ({
    modalOptions: [] as ModalOption[],
    modalType: "",
    filterOption: "all",
    sortOption: "oldest",
    tagOption: "noTag",
    newFeature: false,
  }),
  getters: {
    currentModalOption(): string {
      if (this.modalType === "filter") return this.filterOption;
      if (this.modalType === "sort") return this.sortOption;
      if (this.modalType === "tag") return this.tagOption;
      return "";
    },
  },
  actions: {
    // sort modal
    setSortOption(option: string) {
      if (this.sortOption === option) return;
      this.sortOption = option;

      this.resetModal();
    },
    createSortModal() {
      const { resetModal, setSortOption: setOption } = this;
      resetModal();

      this.modalType = "sort";
      this.addModalOption("Name (asc)", "nameAsc", () => setOption("nameAsc"));
      this.addModalOption("Name (desc)", "nameDesc", () =>
        setOption("nameDesc")
      );
      this.addModalOption("Newest", "newest", () => setOption("newest"));
      this.addModalOption("Oldest", "oldest", () => setOption("oldest"));
    },
    // filter modal
    setFilterOption(option: string) {
      if (this.filterOption === option) return;
      this.filterOption = option;

      this.resetModal();
    },
    createFilterModal() {
      const { resetModal, setFilterOption: setOption } = this;

      resetModal();

      this.modalType = "filter";
      this.addModalOption("All", "all", () => setOption("all"));
      this.addModalOption("Ongoing", "ongoing", () => setOption("ongoing"));
      this.addModalOption("Completed", "completed", () =>
        setOption("completed")
      );
    },
    // tag modal
    createTagModal() {
      const tagStore = useTagStore();
      const { resetModal, setTagOption: setOption } = this;

      resetModal();

      this.modalType = "tag";
      this.addModalOption("No tags", "noTag", () => setOption("noTag"));

      for (let t of tagStore.getAllTags) {
        this.addModalOption(t, t, () => setOption(t));
      }
    },
    setTagOption(option: string) {
      if (this.tagOption === option) return;
      this.tagOption = option;

      this.resetModal();
    },
    // settings modal
    createSettingsModal() {
      this.resetModal();

      this.modalType = "settings";
      this.addModalOption("Clear Storage", "closeStorage", () => {
        localStorage.clear();
        location.reload();
      });
    },
    // general utilities
    resetModal() {
      this.modalOptions = [];
      this.modalType = "";
    },
    addModalOption(name: string, val: string, evt: () => void) {
      this.modalOptions.push({
        displayName: name,
        value: val,
        event: evt,
      });
    },
  },
});
