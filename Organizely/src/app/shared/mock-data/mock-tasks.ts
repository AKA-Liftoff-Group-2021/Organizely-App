import { Task } from '../models/task.model';

export const TASKS: Task[] = [
  {
    studentTaskName: 'Do homework',
    priority: 'High',
    taskDueDate: new Date(2021, 3, 5),
  },
  {
    studentTaskName: 'Practice coding',
    priority: 'High',
    taskDueDate: new Date(2021, 2, 29),
  },
];
