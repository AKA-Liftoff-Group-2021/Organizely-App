import { Course } from './course.model';

export interface Assignment {
  id?: string;
  name: string;
  date: Date;
  time: string;
  deadline?: string;
  course: Course;
}
