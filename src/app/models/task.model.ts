export interface Task {
    id: Date;
    title: string;
    completed: boolean;
    editing?: boolean;
}
