export class Course {
  public courseId: number;
  public courseName: string;
  public startTime: string;
  public endTime: string;
  public startRecur: Date;
  public endRecur: Date;
  public daysOfWeek: string[];
  public semesterSeason: string;
  public semesterYear: number;
  public teacherName?: string;

  constructor(
    courseId: number,
    courseName: string,
    startTime: string,
    endTime: string,
    startRecur: Date,
    endRecur: Date,
    daysOfWeek: string[],
    semesterSeason: string,
    semesterYear: number,
    teacherName?: string
  ) {
    this.courseId = courseId;
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
