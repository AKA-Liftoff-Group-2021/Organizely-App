import { Assignment } from "../models/assignment.model";

export const Assignments: Assignment[] = [
    {
        assignmentId: 1,
        assignmentName: 'Essay about Hemingway',
        dueDate: new Date(2021, 3, 1),
        courseId: 1        
    }      
    /* {
        assignmentName: 'Read Chapter 2',
        dueDate: new Date(2021, 3, 5)
    },
    {
        assignmentName: 'Exercises from page 148',
        dueDate: new Date(2021, 3, 5)
    } */
];