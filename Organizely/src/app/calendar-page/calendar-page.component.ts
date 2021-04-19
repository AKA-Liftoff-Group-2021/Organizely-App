import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  CalendarOptions,
  EventClickArg,
  DateSelectArg,
} from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import { AssignmentsService } from '../shared/assignments.service';
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
  showModal: boolean = false;
  date: string;

  calendarVisible: boolean = true;
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    dateClick: this.handleDateClick.bind(this),
    headerToolbar: {
      left: 'title',
      right: 'today prev,next',
    },
    initialView: 'dayGridMonth',
    editable: true,
    selectable: true,
    eventClick: this.updateEvent.bind(this),
  };

  assignments: Assignment[];
  courses: Course[];
  studentTasks: StudentTask[];

  constructor(
    private router: Router,
    private coursesService: CoursesService,
    private studentTasksService: StudentTasksService,
    private assignmentsService: AssignmentsService
  ) {}

  ngOnInit(): void {
    this.coursesService.getCourses().subscribe((data: Course[]) => {
      this.courses = data;

      this.assignmentsService
        .getAssignments()
        .subscribe((data: Assignment[]) => {
          this.assignments = data;

          this.studentTasksService.getStudentTasks().subscribe(
            (data: StudentTask[]) => {
              this.studentTasks = data;

              this.calendarOptions.events = createCalendarEvents(
                this.courses,
                this.studentTasks,
                this.assignments
              );

              console.log(this.calendarOptions.events);
            },
            (error: any) => {
              console.log(error);
            },
            () => console.log('All calendar events have been loaded.')
          );
        });
    });
  }

  handleDateClick(selectInfo: DateSelectArg) {
    console.log(selectInfo);
    this.date = selectInfo['date'];
    this.showModal = true;
  }

  hide() {
    this.showModal = false;
  }

  onSubmit(eventType: string) {
    if (eventType === 'course') {
      this.router.navigate(['/', 'organizely', 'classform']);
    }
    if (eventType === 'assignment') {
      this.router.navigate(['/', 'organizely', 'assignmentform']);
    }
    if (eventType === 'task') {
      this.router.navigate(['/', 'organizely', 'taskform']);
    }
  }

  updateEvent(clickInfo: EventClickArg) {
    if (confirm('Are you sure you want to update this event?')) {
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

      if (clickInfo.event.extendedProps['eventType'] === 'assignment') {
        this.router.navigate([
          '/',
          'organizely',
          'assignmentform',
          clickInfo.event.id,
        ]);
      }
    }
  }
}
