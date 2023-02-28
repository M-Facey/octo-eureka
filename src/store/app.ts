import { defineStore } from "pinia";
import { useNotifyStore } from "./notify";
import type { Todo } from "@/types";
import { strToDate } from "@/utils";

export const useAppStore = defineStore({
  id: "app",
  state: () => ({
    todos: [] as Todo[],
    viewingStatus: "all",
    showModal: "",
    sortBy: "oldest",
  }),
  getters: {
    getTodosByStatus(): Todo[] {
      if (this.viewingStatus === "completed") {
        return this.getTodoBySortOrder.filter((todo) => todo.isCompleted);
      } else if (this.viewingStatus === "ongoing") {
        return this.getTodoBySortOrder.filter((todo) => !todo.isCompleted);
      }

      return this.getTodoBySortOrder;
    },
    getTodoBySortOrder(): Todo[] {
      if (this.sortBy === "nameAsc") {
        return this.todos.sort((a, b) => a.name.localeCompare(b.name));
      }

      if (this.sortBy === "nameDesc") {
        return this.todos.sort((a, b) => b.name.localeCompare(a.name));
      }

      if (this.sortBy === "newest") {
        return this.todos.sort(
          (a, b) =>
            strToDate(b.createdAt).getTime() - strToDate(a.createdAt).getTime()
        );
      }

      // returns the oldest by default
      return this.todos.sort(
        (a, b) =>
          strToDate(a.createdAt).getTime() - strToDate(b.createdAt).getTime()
      );
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
      const notifyStore = useNotifyStore();

      if (this.getTotalTodos >= 50) {
        notifyStore.addNotification(
          "delete",
          "You reached the todo list limit"
        );
        return;
      }
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
    setShowModal(modalName: string) {
      if (this.showModal === modalName) {
        this.showModal = "";
        return;
      }
      this.showModal = modalName;
    },
    setSortBy(sortOrder: string) {
      if (this.sortBy === sortOrder) return;
      this.sortBy = sortOrder;
    },
  },
});
