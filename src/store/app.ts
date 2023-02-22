import { defineStore } from "pinia";
import type { Todo } from "@/types";

export const useAppStore = defineStore({
  id: "app",
  state: () => ({
    todos: [] as Todo[],
    viewingStatus: "all",
    showFilterModal: false,
  }),
  getters: {
    getTodosByStatus(): Todo[] {
      if (this.viewingStatus === "completed") {
        return this.todos.filter((todo) => todo.isCompleted);
      } else if (this.viewingStatus === "ongoing") {
        return this.todos.filter((todo) => !todo.isCompleted);
      }

      return this.todos;
    },
    getTotalOnGoingTodos(): number {
      return this.todos.filter((todo) => !todo.isCompleted).length;
    },
    getTotalTodos(): number {
      return this.todos.length;
    },
    hasCompletedTodos(): boolean {
      return this.todos.find((todo) => todo.isCompleted) !== undefined;
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
    changeStatus(status: string) {
      this.viewingStatus = status;
    },
    toogleShowFilterModal() {
      this.showFilterModal = !this.showFilterModal;
    },
  },
});
