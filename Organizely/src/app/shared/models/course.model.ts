export class Course {
  public courseName: string;
  public startTime: Date;
  public endTime: Date;
  public startRecur: Date;
  public endRecur: Date;
  public daysOfWeek: number[];
  public semesterSeason: string;
  public semesterYear: number;
  public teacherName?: string;

  constructor(
    courseName: string,
    startTime: Date,
    endTime: Date,
    startRecur: Date,
    endRecur: Date,
    daysOfWeek: number[],
    semesterSeason: string,
    semesterYear: number,
    teacherName?: string
  ) {
    this.courseName = courseName;
    this.startTime = startTime;
    this.endTime = endTime;
    this.startRecur = startRecur;
    this.endRecur = endRecur;
    this.daysOfWeek = daysOfWeek;
    this.semesterSeason = semesterSeason;
    this.semesterYear = semesterYear;
    this.teacherName = teacherName;
  }
}
