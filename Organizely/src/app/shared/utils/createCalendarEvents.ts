import { Course } from '../models/course.model';
import { StudentTask } from '../models/student-task.model';
import setTaskCalendarColor from './setTaskCalendarCol';

export default function createCalendarEvent(
  courses: Course[],
  studentTasks: StudentTask[]
): any {
  let courseEvents = [];

  courses.forEach((course) => {
    courseEvents.push({
      id: course.courseId,
      title: course.courseName,
      daysOfWeek: course.daysOfWeek.map((day) => {
        return Number(day);
      }),
      startTime: course.startTime,
      endTime: course.endTime,
      startRecur: course.startRecur,
      endRecur: course.endRecur,
      extendedProps: {
        semesterSeason: course.semesterSeason,
        semesterYear: course.semesterYear,
        eventType: 'course',
      },
    });
  });

  let studentTaskEvents = [];

  studentTasks.forEach((studentTask) => {
    studentTaskEvents.push({
      id: studentTask.studentTaskId,
      title: studentTask.studentTaskName,
      start: studentTask.taskDueDate,
      allDay: true,
      color: setTaskCalendarColor(studentTask.priority),
      extendedProps: {
        priority: studentTask.priority,
        eventType: 'studentTask',
      },
    });
  });

  // const assignmentEvents = assignments.forEach((assignment) => {
  //   return {
  //     id: assignment.assignmentId,
  //     title: assignment.assignmentName,
  //     start: assignment.dueDate,
  //     extendedProps: {
  //       // TODO: Place other extendedProps (courseName)
  //       // courseName: assignment.courseName,
  //       // courseId: assignment.courseId
  //       // eventType: 'assignment'
  //     },
  //   };
  // });

  return [...courseEvents, ...studentTaskEvents];
}
