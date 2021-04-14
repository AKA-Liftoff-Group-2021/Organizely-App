import { Course } from "./course.model";

export class Assignment {
  public assignmentId: number;
  public assignmentName: string;
  public dueDate: Date;
  public courseId: number;

  constructor(
    assignmentId: number,
    assignmentName: string,
    dueDate: Date,
    courseId: number
  ) {
    this.assignmentId = assignmentId;
    this.assignmentName = assignmentName;
    this.dueDate = dueDate;
    this.courseId = courseId;
  }
}
