export class Assignment {
  public assignmentName: string;
  public date: Date;
  public time: string;
  public deadline: string;

  constructor(
    assignmentName: string,
    date: Date,
    time: string,
    deadline: string
  ) {
    this.assignmentName = assignmentName;
    this.date = date;
    this.time = time;
    this.deadline = deadline;
  }
}
