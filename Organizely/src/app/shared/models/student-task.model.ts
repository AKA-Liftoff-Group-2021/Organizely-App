export class StudentTask {
  public studentTaskId: number;
  public studentTaskName: string;
  public priority: string;
  // public userId: string;
  public taskDueDate?: Date;

  constructor(
    studentTaskId: number,
    studentTaskName: string,
    priority: string,
    // userId: string,
    taskDueDate?: Date
  ) {
    this.studentTaskId = studentTaskId;
    this.studentTaskName = studentTaskName;
    this.priority = priority;
    // this.userId = userId;
    this.taskDueDate = taskDueDate;
  }
}
