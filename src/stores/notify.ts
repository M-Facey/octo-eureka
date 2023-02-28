import { nanoid } from "nanoid";
import { defineStore } from "pinia";
import { useAppStore } from "./app";
import type { Notification } from "@/types";

export const useNotifyStore = defineStore({
  id: "notify",
  state: () => ({
    notifications: [] as Notification[],
    duration: 2500,
  }),
  getters: {
    getNotifications(): Notification[] {
      return this.notifications;
    },
  },
  actions: {
    addNotification(type: string, detail: string) {
      const notification = {
        id: nanoid(),
        type,
        detail,
        timerId: -1,
        canUndo: type === "delete",
      };

      const prevNotification = this.notifications.findIndex(
        (notify) => notify.type === type
      );

      if (prevNotification === -1) {
        this.notifications.push(notification);

        notification.timerId = setTimeout(() => {
          this.closeNotification(notification, false);
        }, this.duration);
      } else {
        this.notifications[prevNotification].detail = detail;
        clearTimeout(this.notifications[prevNotification].timerId);

        this.notifications[prevNotification].timerId = setTimeout(() => {
          this.closeNotification(this.notifications[prevNotification], false);
        }, this.duration);
      }
    },
    closeNotification(notification: Notification, clearTimer: boolean) {
      if (clearTimer) {
        clearTimeout(notification.timerId);
      }

      const appStore = useAppStore();
      this.notifications = this.notifications.filter(
        (notify) => notify.id !== notification.id
      );

      if (notification.type === "delete") {
        appStore.deletedTodos = [];
      }
    },
  },
});
