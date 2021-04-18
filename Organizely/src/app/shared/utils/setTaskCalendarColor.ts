export default function setTaskCalendarColor(priority: string): string {
  return priority === 'Low'
    ? 'green'
    : priority === 'Medium'
    ? 'orange'
    : 'red';
}
