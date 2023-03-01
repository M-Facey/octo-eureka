export interface Todo {
  id: string;
  name: string;
  description: string;
  subtasks: Todo[];
  isCompleted: boolean;
  createdAt: Date;
}

export interface Notification {
  id: string;
  type: string;
  detail: string;
  timerId: number;
  canUndo: boolean;
}
