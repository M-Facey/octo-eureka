import { defineStore } from "pinia";
import { useAppStore } from "./app";
import type { Tags } from "@/types";

export const useTagStore = defineStore({
  id: "tag",
  state: () => ({
    tags: {} as Tags,
  }),
  getters: {
    getTagsByTodo(): string[] {
      let todoTags: string[] = [];
      const tags = Object.keys(this.tags);

      const { selectedTodo } = useAppStore();

      for (const tag of tags) {
        const todo = this.tags[tag].find((id) => selectedTodo?.id === id);
        if (todo) {
          todoTags.push(tag);
        }
      }
      return todoTags;
    },
    getAllTags(): string[] {
      let tags: string[] = [];
      for (const tag of Object.keys(this.tags)) {
        if (this.tags[tag].length !== 0) {
          tags.push(tag);
        }
      }
      return tags;
    },
  },
  actions: {
    addNewTag(tag: string, todoId: string) {
      if (!tag) return;
      const tags = Object.keys(this.tags);
      if (tags.length === 0) {
        this.tags[tag] = [todoId];
        return;
      }

      const tagExists = tags.find((t) => t === tag);
      if (!tagExists) {
        this.tags[tag] = [todoId];
        return;
      }

      const hasTag = this.tags[tag].find((id) => id === todoId);
      if (tagExists && !hasTag) {
        this.tags[tag].push(todoId);
      }
    },
    removeTag(tag: string, todoId: string) {
      if (!tag) return;

      const tags = Object.keys(this.tags);
      const tagExists = tags.find((t) => t === tag);
      if (tags.length !== 0 && tagExists) {
        let filteredTag = this.tags[tag].filter((id) => id !== todoId);
        if (filteredTag) {
          this.tags[tag] = filteredTag;
        }
      }

      const hasNoTodos = this.tags[tag].length === 0;
      if (tagExists && hasNoTodos) {
        this.tags[tag] = [];
      }
    },
    removeTagsForTodo(todoId: string) {
      const tags = Object.keys(this.tags);
      for (const tag of tags) {
        this.removeTag(tag, todoId);
      }
    },
  },
});
