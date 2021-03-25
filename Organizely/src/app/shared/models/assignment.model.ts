export class Assignment {
  public assignmentName: string;
  public dueDate: Date;

  constructor(
    assignmentName: string,
    dueDate: Date
  ) {
    this.assignmentName = assignmentName;
    this.dueDate = dueDate;
  }
}
