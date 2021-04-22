import { Assignment } from '../models/assignment.model';
import { StudentTask } from '../models/student-task.model';

export default function createUpcomingList(
  nextWeekDate: Date,
  weekAfterNextDate: Date,
  assignments: Assignment[],
  studentTasks: StudentTask[]
): any {
  let upcomingList = [];

  assignments.forEach((assignment: Assignment) => {
    let convertedDate = new Date(assignment.dueDate).getTime();
    if (
      convertedDate > nextWeekDate.getTime() &&
      convertedDate <= weekAfterNextDate.getTime()
    ) {
      upcomingList.push(assignment);
    }
  });

  studentTasks.forEach((studentTask: StudentTask) => {
    let convertedDate = new Date(studentTask.taskDueDate).getTime();
    if (
      convertedDate > nextWeekDate.getTime() &&
      convertedDate <= weekAfterNextDate.getTime()
    ) {
      upcomingList.push(studentTask);
    }
  });

  return upcomingList;
}
