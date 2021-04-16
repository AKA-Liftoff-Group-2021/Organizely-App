import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CoursesService } from '../shared/courses.service';
import { Assignment } from '../shared/models/assignment.model';
import { Course } from '../shared/models/course.model';
import { StudentTask } from '../shared/models/student-task.model';
import { StudentTasksService } from '../shared/student-tasks.service';

@Component({
  selector: 'app-calendar-page',
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.css'],
})
export class CalendarPageComponent implements OnInit {
  
  constructor(

  ) {}
  ngOnInit(): void {
  }

  
}
