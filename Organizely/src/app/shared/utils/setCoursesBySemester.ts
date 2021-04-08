import { Course } from '../models/course.model';

export default function setCoursesBySemester(courses) {
  let semestersBySchoolYear: object = {};

  courses.forEach((course: Course) => {
    if (semestersBySchoolYear[course.semesterYear]) {
      if (semestersBySchoolYear[course.semesterYear][course.semesterSeason]) {
        semestersBySchoolYear[course.semesterYear][course.semesterSeason].push(
          course
        );
      } else {
        semestersBySchoolYear[course.semesterYear][course.semesterSeason] = [
          course,
        ];
      }
    } else {
      semestersBySchoolYear[course.semesterYear] = {};
      semestersBySchoolYear[course.semesterYear][course.semesterSeason] = [
        course,
      ];
    }
  });

  return semestersBySchoolYear;
}
