import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarOptions, EventClickArg } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CoursesService } from '../shared/courses.service';
import { Assignment } from '../shared/models/assignment.model';
import { Course } from '../shared/models/course.model';
import { StudentTask } from '../shared/models/student-task.model';
import { StudentTasksService } from '../shared/student-tasks.service';

import createCalendarEvents from '../shared/utils/createCalendarEvents';

@Component({
  selector: 'app-calendar-page',
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.css'],
})
export class CalendarPageComponent implements OnInit {
  calendarVisible: boolean = true;
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    headerToolbar: {
      left: 'title',
      right: 'today prev,next',
    },
    initialView: 'dayGridMonth',
    editable: true,
    eventClick: this.updateEvent.bind(this),
  };

  // assignments: Assignment[];
  courses: Course[];
  studentTasks: StudentTask[];

  constructor(
    private router: Router,
    private coursesService: CoursesService,
    private studentTasksService: StudentTasksService
  ) {}

  ngOnInit(): void {
    this.coursesService.getCourses().subscribe((data: Course[]) => {
      this.courses = data;

      this.studentTasksService.getStudentTasks().subscribe(
        (data: StudentTask[]) => {
          this.studentTasks = data;

          this.calendarOptions.events = createCalendarEvents(
            this.courses,
            this.studentTasks
          );

          console.log(this.calendarOptions.events);
        },
        (error: any) => {
          console.log(error);
        },
        () => console.log('All done getting your tasks.')
      );
    });
  }

  updateEvent(clickInfo: EventClickArg) {
    if (confirm('Are you sure you want to update this event?')) {
      // console.log(clickInfo.event.extendedProps['eventType']);

      if (clickInfo.event.extendedProps['eventType'] === 'course') {
        this.router.navigate([
          '/',
          'organizely',
          'classform',
          clickInfo.event.id,
        ]);
      } else if (clickInfo.event.extendedProps['eventType'] === 'studentTask') {
        this.router.navigate([
          '/',
          'organizely',
          'taskform',
          clickInfo.event.id,
        ]);
      }

      // if (clickInfo.event.extendedProps['eventType'] === 'assignment') {
      //   this.router.navigate([
      //     '/',
      //     'organizely',
      //     'assignmentform',
      //     clickInfo.event.id,
      //   ]);
      // }
    }
  }
}
