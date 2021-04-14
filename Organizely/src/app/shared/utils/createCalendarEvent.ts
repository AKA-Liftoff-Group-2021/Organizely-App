export default function createCalendarEvent(item: any, type: string): object {
  if (type === 'course') {
    return {
      // id: item.courseId,
      title: item.courseName,
      daysOfWeek: item.daysOfWeek.map((day) => {
        return Number(day);
      }),
      startTime: item.startTime,
      endTime: item.endTime,
      startRecur: item.startRecur,
      endRecur: item.endRecur,
      extendedProps: {
        courseId: item.courseId,
        semesterSeason: item.semesterSeason,
        semesterYear: item.semesterYear,
      },
    };
  }

  if (type === 'studentTask') {
    return {
      // id: item.studentTaskId,
      title: item.studentTaskName,
      start: item.taskDueDate,
      extendedProps: {
        studentTaskId: item.studentTaskId,
        priority: item.prioirty,
      },
    };
  }

  if (type === 'assignment') {
    return {
      // id: item.assignmentId,
      title: item.assignmentName,
      start: item.dueDate,
      extendedProps: {
        assignmentId: item.assignmentId,
        // TODO: Place other extendedProps (courseName)
      },
    };
  }

  return {};
}
