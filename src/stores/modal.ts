import { defineStore } from "pinia";
import type { ModalOption } from "@/types";

export const useModalStore = defineStore({
  id: "modal",
  state: () => ({
    modalOptions: [] as ModalOption[],
    modalType: "",
    filterOption: "all",
    sortOption: "oldest",
  }),
  getters: {
    currentModalOption(): string {
      if (this.modalType === "filter") return this.filterOption;
      return this.sortOption;
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
    // settings modal
    createSettingsModal() {
      this.resetModal();

      this.modalType = "settings";
      this.addModalOption("Clear Storage", "closeStorage", () => {
        localStorage.clear();
        location.reload();
      });
    },
    // general utilties
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
