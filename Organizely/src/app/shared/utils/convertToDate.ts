export default function convertToDate(dateString: string, type: string): Date {
  let dateArr = dateString.split('-');

  const year = Number(dateArr[0]);
  const month = Number(dateArr[1]) - 1;
  const day = Number(dateArr[2]);

  let newDate = new Date(year, month, day);

  if (type === 'end') {
    newDate.setDate(newDate.getDate() + 1);
  }

  return newDate;
}
