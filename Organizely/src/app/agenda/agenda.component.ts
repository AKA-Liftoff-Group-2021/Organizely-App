import { Component, OnInit } from '@angular/core';
import { COURSES } from '../shared/mock-data/mock-courses';
import { Course } from '../shared/models/course.model';
import { CalendarOptions } from '@fullcalendar/angular';
import listPlugin from '@fullcalendar/list';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css'],
})
export class AgendaComponent implements OnInit {
  calendarVisible: boolean = true;
  calendarOptions: CalendarOptions = {
    plugins: [listPlugin],
    initialView: 'listWeek',
    events: [
      {
        title: 'LC101',
        start: '2021-03-10T17:30:00',
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
