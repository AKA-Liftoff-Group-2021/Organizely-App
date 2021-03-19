import { Course } from '../models/course.model';

export const COURSES: Course[] = [
  {
    courseName: 'Liftoff',
    startTime: '17:30:00',
    endTime: '20:30:00',
    startRecur: '2021-03-01',
    endRecur: '2021-04-26',
    daysOfWeek: [1],
    semesterSeason: 'Winter',
    semesterYear: 2021,
    teacherName: 'Mike',
  },
  {
    courseName: 'CoderGirl',
    startTime: '17:30:00',
    endTime: '20:30:00',
    startRecur: '2021-03-01',
    endRecur: '2021-04-26',
    daysOfWeek: [1, 3],
    semesterSeason: 'Fall',
    semesterYear: 2020,
    teacherName: 'Chetna',
  },
];
