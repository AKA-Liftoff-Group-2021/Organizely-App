import { Component, OnInit } from '@angular/core';
import { COURSES } from '../shared/mock-data/mock-courses';
import { Course } from '../shared/models/course.model';
import { CalendarOptions } from '@fullcalendar/angular';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullCalendar/timegrid';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css'],
})
export class AgendaComponent implements OnInit {
  calendarVisible: boolean = true;
  calendarOptions: CalendarOptions = {
    plugins: [listPlugin, timeGridPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'listWeek,timeGridDay',
    },
    initialView: 'listWeek',
    events: [
      {
        title: 'Liftoff',
        // start: '2021-03-01',
        // end: '2021-04-27',
        daysOfWeek: [1],
        startTime: '17:30:00',
        endTime: '20:30:00',
        startRecur: '2021-03-01',
        endRecur: '2021-04-27',
        extendedProps: {
          assignments: [
            'Class 1 Reading',
            'Class 1 Assignment',
            'Class 1 Studio',
          ],
          semesterSeason: 'Winter',
          semesterYear: 2021,
        },
      },
      {
        title: 'CoderGirl',
        // start: '2020-08-01',
        // end: '2021-02-25',
        daysOfWeek: [1, 3],
        startTime: '17:30:00',
        endTime: '20:30:00',
        startRecur: '2020-08-01',
        endRecur: '2021-02-20',
        extendedProps: {
          assignments: [
            'Class 3 Reading',
            'Class 3 Assignment',
            'Class 3 Studio',
          ],
          semesterSeason: 'Winter',
          semesterYear: 2021,
        },
      },
    ],
  };

  dates: Date[] = [
    new Date(2021, 2, 7),
    new Date(2021, 2, 8),
    new Date(2021, 2, 9),
    new Date(2021, 2, 10),
    new Date(2021, 2, 11),
    new Date(2021, 2, 12),
    new Date(2021, 2, 13),
  ];

  courses: Course[] = COURSES;

  coursesByDay = {};

  constructor() {}

  ngOnInit(): void {
    // this.sortCoursesByDay();
    // console.log(this.coursesByDay);
    // console.log(this.calendarOptions['events'][0].extendedProps['semester']);
  }

  sortCoursesByDay() {
    this.dates.forEach((date) => {
      let courseDayMatch = this.courses.find((course) =>
        course.days.includes(date.getDay())
      );
      if (courseDayMatch !== undefined) {
        this.coursesByDay[date.getDay()] = courseDayMatch;
      }
    });
  }
}
