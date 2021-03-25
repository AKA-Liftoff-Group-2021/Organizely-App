export class Task {
  public taskName: string;
  public priority: string;
  public dueDate?: Date;

  constructor(taskName: string, priority: string, dueDate?: Date) {
    this.taskName = taskName;
    this.priority = priority;
    this.dueDate = dueDate;
  }
}
