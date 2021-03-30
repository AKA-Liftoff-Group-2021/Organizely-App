import { Task } from '../models/task.model';

export const TASKS: Task[] = [
  {
    taskName: 'Do homework',
    priority: 'High',
    dueDate: new Date(2021, 3, 5),
  },
  {
    taskName: 'Practice coding',
    priority: 'High',
    dueDate: new Date(2021, 2, 29),
  },
];
