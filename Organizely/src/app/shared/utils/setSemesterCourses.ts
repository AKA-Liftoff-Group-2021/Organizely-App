import { Course } from '../models/course.model';

export default function setSemesterCourses(courses, currentSemester) {
  return courses.filter(
    (course: Course) =>
      course.semesterSeason === currentSemester.semesterSeason &&
      course.semesterYear === currentSemester.semesterYear
  );
}
