import { Course } from '../models/course.model';

export const COURSES: Course[] = [
  {
    courseName: 'Liftoff',
    startTime: '17:30:00',
    endTime: '20:30:00',
    startRecur: new Date(2021, 2, 1),
    endRecur: new Date(2021, 3, 27),
    daysOfWeek: ['1'],
    semesterSeason: 'Winter',
    semesterYear: 2021,
    teacherName: 'Mike',
  },
  {
    courseName: 'CoderGirl',
    startTime: '17:30:00',
    endTime: '20:30:00',
    startRecur: new Date(2020, 7, 17),
    endRecur: new Date(2021, 1, 16),
    daysOfWeek: ['1', '3'],
    semesterSeason: 'Fall',
    semesterYear: 2020,
    teacherName: 'Chetna',
  },
];
