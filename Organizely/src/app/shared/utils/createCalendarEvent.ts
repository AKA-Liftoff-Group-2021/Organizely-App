export default function createCalendarEvent(item: any, type: string): any {
  if (type === 'course') {
    return {
      id: item.courseId,
      title: item.courseName,
      daysOfWeek: item.daysOfWeek.map((day) => {
        return Number(day);
      }),
      startTime: item.startTime,
      endTime: item.endTime,
      startRecur: item.startRecur,
      endRecur: item.endRecur,
      extendedProps: {
        semesterSeason: item.semesterSeason,
        semesterYear: item.semesterYear,
      },
    };
  }

  if (type === 'studentTask') {
    return {
      id: item.studentTaskId,
      title: item.studentTaskName,
      start: item.taskDueDate,
      extendedProps: {
        priority: item.priority,
      },
    };
  }

  if (type === 'assignment') {
    return {
      id: item.assignmentId,
      title: item.assignmentName,
      start: item.dueDate,
      extendedProps: {
        // TODO: Place other extendedProps (courseName)
        courseName: item.courseName,
      },
    };
  }

  return;
}
