export class Course {
  public courseId: string;
  public courseName: string;
  public startTime: string;
  public endTime: string;
  public startRecur: string;
  public endRecur: string;
  public daysOfWeek: number[];
  public semesterSeason: string;
  public semesterYear: number;
  public teacherName?: string;

  constructor(
    courseId: string,
    courseName: string,
    startTime: string,
    endTime: string,
    startRecur: string,
    endRecur: string,
    daysOfWeek: number[],
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
