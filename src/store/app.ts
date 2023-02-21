import { defineStore } from "pinia";
import type { Todo } from "@/types";

export const useApp = defineStore({
  id: "app",
  state: () => ({
    todos: [] as Todo[],
    vuewingStatus: "all",
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
      this.todos.push(todo);
    },
    toggleIsCompleted(id: string) {
      const todoIndex = this.todos.findIndex((todo) => todo.id === id);
      this.todos[todoIndex].isCompleted = !this.todos[todoIndex].isCompleted;
    },
    deleteTodo(id: string) {
      this.todos = this.todos.filter((todo) => todo.id !== id);
    },
    deleteCompletedTodo() {
      this.todos = this.todos.filter((todo) => !todo.isCompleted);
    },
  },
});
