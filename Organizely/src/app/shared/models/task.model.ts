export class Task {
  public taskName: string;
  public date: Date;
  public time: string;
  public priority: string;
  public deadline?: string;

  constructor(
    taskName: string,
    date: Date,
    time: string,
    priority: string,
    deadline?: string
  ) {
    this.taskName = taskName;
    this.date = date;
    this.time = time;
    this.priority = priority;
    this.deadline = deadline;
  }
}
