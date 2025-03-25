import { TaskType } from "./task";

export interface RoutineType {
    id: string;
    title: string;
    tasks: TaskType[];
}