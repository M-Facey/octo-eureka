import { defineStore } from "pinia";
import type { Todo } from "@/types";
import { strToDate } from "@/utils";

import { useNotifyStore } from "./notify";
import { useModalStore } from "./modal";
import { useTagStore } from "./tag";

export const useAppStore = defineStore({
  id: "app",
  state: () => ({
    todos: [] as Todo[],
    selectedTodo: undefined as Todo | undefined,
    deletedTodos: [] as Todo[],
    isEditing: false,
  }),
  getters: {
    getTodosByStatus(): Todo[] {
      const modalStore = useModalStore();

      if (modalStore.filterOption === "completed") {
        return this.getTodoBySortOrder.filter((todo) => todo.isCompleted);
      } else if (modalStore.filterOption === "ongoing") {
        return this.getTodoBySortOrder.filter((todo) => !todo.isCompleted);
      }

      return this.getTodoBySortOrder;
    },
    getTodoBySortOrder(): Todo[] {
      const modalStore = useModalStore();

      if (modalStore.sortOption === "nameAsc") {
        return this.todos.sort((a, b) => a.name.localeCompare(b.name));
      }

      if (modalStore.sortOption === "nameDesc") {
        return this.todos.sort((a, b) => b.name.localeCompare(a.name));
      }

      if (modalStore.sortOption === "newest") {
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
    getTodosByTag(): Todo[] {
      const modalStore = useModalStore();
      const tagStore = useTagStore();
      const todos: Todo[] = [];

      if (modalStore.tagOption === "noTag") return this.getTodosByStatus;

      for (let todoId of tagStore.tags[modalStore.tagOption]) {
        const todo = this.getTodosByStatus.find((t) => t.id === todoId);
        if (todo) {
          todos.push(todo);
        }
      }

      return todos;
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
    getTotalOnGoingSubtask(): number {
      if (!this.selectedTodo) return 0;
      return this.selectedTodo.subtasks.filter((todo) => !todo.isCompleted)
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
      const tagStore = useTagStore();
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
      tagStore.removeTagsForTodo(id);
      this.todos = this.todos.filter((todo) => todo.id !== id);
    },
    deleteCompletedTodo() {
      this.todos = this.todos.filter((todo) => !todo.isCompleted);
    },
    undoDeletedTodos() {
      this.todos.push(...this.deletedTodos);
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
