export default function setAssignmentCalendarColor(dueDate: Date) {
  let eventStyle: string;

  let currentDate = new Date();
  let due: Date = new Date(dueDate);

  currentDate.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);

  if (currentDate.getTime() < due.getTime()) {
    eventStyle = 'green';
  }

  if (currentDate.getTime() === due.getTime()) {
    eventStyle = 'orange';
  }

  if (currentDate > due) {
    eventStyle = 'red';
  }

  return eventStyle;
}
