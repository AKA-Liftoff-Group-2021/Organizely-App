import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullCalendar/timegrid';

import { Course } from '../shared/models/course.model';
import { COURSES } from '../shared/mock-data/mock-courses';

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
    events: [],
  };

  courses: Course[] = COURSES;

  constructor() {}

  ngOnInit(): void {
    for (let i = 0; i < this.courses.length; i++) {
      this.calendarOptions.events[i] = {
        title: this.courses[i].courseName,
        daysOfWeek: this.courses[i].daysOfWeek.map((day) => {
          return Number(day);
        }),
        startTime: this.courses[i].startTime,
        endTime: this.courses[i].endTime,
        startRecur: this.courses[i].startRecur,
        endRecur: this.courses[i].endRecur,
        extendedProps: {
          semesterSeason: this.courses[i].semesterSeason,
          semesterYear: this.courses[i].semesterYear,
        },
      };
    }
  }
}
