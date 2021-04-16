import { Course } from '../models/course.model';

export const COURSES: Course[] = [
  {
    courseId: 1,
    courseName: 'Lift Off',
    startTime: '17:30:00',
    endTime: '20:30:00',
    startRecur: new Date(2021, 2, 1),
    endRecur: new Date(2021, 3, 28),
    daysOfWeek: ['1'],
    semesterSeason: 'Winter',
    semesterYear: 2021,
    teacherName: 'Mike',
  },
  {
    courseId: 2,
    courseName: 'CoderGirl',
    startTime: '17:30:00',
    endTime: '20:30:00',
    startRecur: new Date(2020, 7, 1),
    endRecur: new Date(2020, 8, 1),
    daysOfWeek: ['1', '3'],
    semesterSeason: 'Fall',
    semesterYear: 2020,
    teacherName: 'Chetna',
  },
];
