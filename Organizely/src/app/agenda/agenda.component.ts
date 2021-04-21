import { Component, OnInit } from '@angular/core';
import { CalendarOptions, EventClickArg } from '@fullcalendar/angular';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullCalendar/timegrid';

import { Course } from '../shared/models/course.model';
import { StudentTask } from '../shared/models/student-task.model';
import { Assignment } from '../shared/models/assignment.model';

import { CoursesService } from '../shared/courses.service';
import { StudentTasksService } from '../shared/student-tasks.service';
import { AssignmentsService } from '../shared/assignments.service';

import createCalendarEvents from '../shared/utils/createCalendarEvents';
import { Router } from '@angular/router';
import { QuotesService } from '../quotes.service';
import { Quote } from '../shared/models/quote.model';

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
    editable: true,
    eventClick: this.updateEvent.bind(this),
  };

  courses: Course[] = [];
  studentTasks: StudentTask[] = [];
  assignments: Assignment[] = [];
  quotes = [];

  constructor(
    private router: Router,
    private coursesService: CoursesService,
    private studentTasksService: StudentTasksService,
    private assignmentsService: AssignmentsService,
    private quotesService: QuotesService
  ) {}

  ngOnInit(): void {
    this.quotes = this.quotesService.getQuote();
    console.log(this.quotes);

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
            () => console.log('All done getting your tasks.')
          );
        });
    });
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

  onSaveQuote(quote: Quote) {
    const quoteId = 0;
    let savedQuote = new Quote(quoteId, quote.content, quote.author);
    console.log(savedQuote);
  }
}
