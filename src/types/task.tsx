export interface TaskType {
    id: string;
    title: string;
    description?: string;
    alarm?: string;
    length?: number;
    color: string;
    completed: boolean;
  }
  