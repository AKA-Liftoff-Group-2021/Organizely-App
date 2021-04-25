import { Course } from './course.model';

export class Assignment {
  public assignmentId: number;
  public assignmentName: string;
  public dueDate: Date;
  public courseId: number;
  // public userId: string;
  public course?: Course;

  constructor(
    assignmentId: number,
    assignmentName: string,
    dueDate: Date,
    courseId: number,
    // userId: string,
    course?: Course
  ) {
    this.assignmentId = assignmentId;
    this.assignmentName = assignmentName;
    this.dueDate = dueDate;
    this.courseId = courseId;
    // this.userId = userId;
    this.course = course;
  }
}
