export default function setCurrentSemester(currentDate: Date) {
  const currentSemester = {};

  const winterMonths = [11, 0, 1];
  const springMonths = [2, 3, 4];
  const summerMonths = [5, 6, 7];
  const fallMonths = [8, 9, 10];

  currentSemester['semesterYear'] = currentDate.getFullYear();

  if (winterMonths.includes(currentDate.getMonth())) {
    currentSemester['semesterSeason'] = 'Winter';
  }

  if (springMonths.includes(currentDate.getMonth())) {
    currentSemester['semesterSeason'] = 'Spring';
  }

  if (summerMonths.includes(currentDate.getMonth())) {
    currentSemester['semesterSeason'] = 'Summer';
  }

  if (fallMonths.includes(currentDate.getMonth())) {
    currentSemester['semesterSeason'] = 'Fall';
  }

  return currentSemester;
}
