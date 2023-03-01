import { defineStore } from "pinia";
import { useNotifyStore } from "./notify";
import type { Todo } from "@/types";
import { strToDate } from "@/utils";

export const useAppStore = defineStore({
  id: "app",
  state: () => ({
    todos: [] as Todo[],
    selectedTodo: undefined as Todo | undefined,
    deletedTodos: [] as Todo[],
    viewingStatus: "all",
    showModal: "",
    sortBy: "oldest",
    isEditing: false,
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
    getTotalSubtasks(): number {
      if (!this.selectedTodo) return 0;
      return this.selectedTodo.subtasks.length;
    },
    getTotalCompletedSubtask(): number {
      if (!this.selectedTodo) return 0;
      return this.selectedTodo.subtasks.filter((todo) => todo.isCompleted)
        .length;
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
      const notifyStore = useNotifyStore();
      const currentTodo = this.todos.find((todo) => todo.id === id);

      if (currentTodo) {
        this.deletedTodos.push(currentTodo);
        if (id === this.selectedTodo?.id) {
          this.isEditing = false;
          this.selectedTodo = undefined;
        }
        notifyStore.addNotification(
          "delete",
          `You've deleted ${this.deletedTodos.length} todos`
        );
      }
      this.todos = this.todos.filter((todo) => todo.id !== id);
    },
    deleteCompletedTodo() {
      this.todos = this.todos.filter((todo) => !todo.isCompleted);
    },
    undoDeletedTodos() {
      this.todos.push(...this.deletedTodos);
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
    setSelectedTodo(id: string) {
      this.selectedTodo = this.todos.find((todo) => todo.id === id);

      if (this.selectedTodo) {
        this.isEditing = true;
      }
    },
    addSubtask(todo: Todo) {
      if (!this.selectedTodo) return;
      const notifyStore = useNotifyStore();

      if (this.selectedTodo.subtasks.length >= 6) {
        notifyStore.addNotification("limit", "You reached the sub tasks limit");
        return;
      }

      this.selectedTodo.subtasks.push(todo);
    },
    toggleSubtaskIsCompleted(id: string) {
      if (!this.selectedTodo) return;
      const todoIndex = this.selectedTodo.subtasks.findIndex(
        (todo) => todo.id === id
      );

      this.selectedTodo.subtasks[todoIndex].isCompleted =
        !this.selectedTodo.subtasks[todoIndex].isCompleted;
    },
    deleteSubtask(id: string) {
      if (!this.selectedTodo) return;
      const notifyStore = useNotifyStore();
      const currentTodo = this.selectedTodo.subtasks.find(
        (todo) => todo.id === id
      );

      if (currentTodo) {
        notifyStore.addNotification("limit", `You've deleted a sub task`);
      }
      this.selectedTodo.subtasks = this.selectedTodo.subtasks.filter(
        (todo) => todo.id !== id
      );
    },
  },
});
