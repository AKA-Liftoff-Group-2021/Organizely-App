export class Task {
  public studentTaskName: string;
  public priority: string;
  public taskDueDate?: Date;

  constructor(studentTaskName: string, priority: string, taskDueDate?: Date) {
    this.studentTaskName = studentTaskName;
    this.priority = priority;
    this.taskDueDate = taskDueDate;
  }
}
