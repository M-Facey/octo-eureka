import { nanoid } from "nanoid";
import { defineStore } from "pinia";
import type { Notification } from "@/types";

export const useNotifyStore = defineStore({
  id: "notify",
  state: () => ({
    notifications: [] as Notification[],
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
          this.notifications = this.notifications.filter(
            (notify) => notify.id !== notification.id
          );
        }, 1000);
      } else {
        clearTimeout(this.notifications[prevNotification].timerId);
        this.notifications[prevNotification].timerId = setTimeout(() => {
          this.notifications = this.notifications.filter(
            (notify) => notify.id !== this.notifications[prevNotification].id
          );
        }, 1000);
      }
    },
  },
});
