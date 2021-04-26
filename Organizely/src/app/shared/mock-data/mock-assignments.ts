import { Assignment } from '../models/assignment.model';

export const Assignments: Assignment[] = [
  {
    assignmentId: 1,
    assignmentName: 'Essay about Hemingway',
    dueDate: new Date(2021, 3, 1),
    userId: '1',
    courseId: 1,
  },
  /* {
        assignmentId: 2,
        assignmentName: 'Read Chapter 2',
        userId: '1',
        dueDate: new Date(2021, 3, 5)
        courseId: 1,
    },
    {
        assignmentId: 3,
        assignmentName: 'Exercises from page 148',
        userId: '1',
        dueDate: new Date(2021, 3, 5)
        courseId: 1,
    } */
];
