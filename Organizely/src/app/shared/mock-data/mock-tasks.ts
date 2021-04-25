import { StudentTask } from '../models/student-task.model';

export const STUDENTTASKS: StudentTask[] = [
  {
    studentTaskId: 1,
    studentTaskName: 'Do homework',
    priority: 'High',
    userId: '1',
    taskDueDate: new Date(2021, 3, 5),
  },
  {
    studentTaskId: 2,
    studentTaskName: 'Practice coding',
    priority: 'High',
    userId: '1',
    taskDueDate: new Date(2021, 2, 29),
  },
];
