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
      return Object.keys(this.tags);
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

      const tagExists = tags?.find((t) => t === tag);
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
        this.tags[tag] = this.tags[tag].filter((id) => id !== todoId);
      }

      const hasNoTodos = this.tags[tag].length === 0;
      if (tagExists && hasNoTodos) {
        delete this.tags[tag];
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
