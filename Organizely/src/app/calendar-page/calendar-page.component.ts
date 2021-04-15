import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
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
  };

  // assignments: Assignment[];
  courses: Course[];
  studentTasks: StudentTask[];

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
