export interface Task {
  createdAt: string; // Dates returned as ISO strings from API
  updatedAt: string; // Dates returned as ISO strings from API
  id: number;
  name: string;
  description: string;
  dueAt: string; // Dates returned as ISO strings from API
  completed: boolean;
}

export interface CreateTask {
  name: string;
  description: string;
  dueAt: Date;
}