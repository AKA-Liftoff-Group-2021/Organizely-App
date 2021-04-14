import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CoursesService } from '../shared/courses.service';
import { Assignment } from '../shared/models/assignment.model';
import { Course } from '../shared/models/course.model';
import { StudentTask } from '../shared/models/student-task.model';
import { StudentTasksService } from '../shared/student-tasks.service';
import createCalendarEvent from '../shared/utils/createCalendarEvent';

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
    events: [],
  };

  // assignments: Assignment[];
  courses: Course[];
  studentTasks: StudentTask[];

  constructor(
    private coursesService: CoursesService,
    private studentTasksService: StudentTasksService
  ) {}
  ngOnInit(): void {
    this.getAllCourses();
    this.getAllStudentTasks();
  }

  getAllCourses() {
    this.coursesService.getCourses().subscribe(
      (data: Course[]) => {
        this.courses = data;
        console.log(this.courses);
        for (let i = 0; i < this.courses.length; i++) {
          this.calendarOptions.events[i].push(
            createCalendarEvent(this.courses[i], 'course')
          );
        }
      },
      (error) => {
        console.log(error);
      },
      () => console.log('All done getting your courses.')
    );
  }

  getAllStudentTasks() {
    this.studentTasksService.getStudentTasks().subscribe(
      (data: StudentTask[]) => {
        this.studentTasks = data;
        console.log(this.studentTasks);
        for (let i = 0; i < this.studentTasks.length; i++) {
          this.calendarOptions.events[i].push(
            createCalendarEvent(this.studentTasks[i], 'task')
          );
        }
      },
      (error: any) => {
        console.log(error);
      },
      () => console.log('All done getting your tasks.')
    );
  }
}
