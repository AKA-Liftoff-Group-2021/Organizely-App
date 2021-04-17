import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullCalendar/timegrid';

import { Course } from '../shared/models/course.model';
import { COURSES } from '../shared/mock-data/mock-courses';
import { CoursesService } from '../shared/courses.service';
import { StudentTasksService } from '../shared/student-tasks.service';

import createCalendarEvents from '../shared/utils/createCalendarEvents';
import { StudentTask } from '../shared/models/student-task.model';
import { Assignment } from '../shared/models/assignment.model';

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

  courses: Course[] = [];
  studentTasks: StudentTask[] = [];
  // assignments: Assignment[] = [];

  constructor(
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
}
