import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import type { Todo } from "@/types";

export const useApp = defineStore({
  id: "app",
  state: () => ({
    todos: useStorage("todo", [] as Todo[]),
    vuewingStatus: "dasdsa",
  }),
  getters: {
    getTodosByStatus(): Todo[] {
      if (this.vuewingStatus === "completed") {
        return this.todos.filter((todo) => todo.isCompleted);
      } else if (this.vuewingStatus === "ongoing") {
        return this.todos.filter((todo) => !todo.isCompleted);
      }

      return this.todos;
    },
  },
  actions: {
    addTodo(todo: Todo) {
      // to be completed later
    },
    deleteTask(id: string) {
      // to be completed later
    },
  },
});
