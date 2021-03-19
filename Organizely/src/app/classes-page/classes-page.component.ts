import { Component, OnInit } from '@angular/core';
import { COURSES } from '../shared/mock-data/mock-courses';
import { Course } from '../shared/models/course.model';

@Component({
  selector: 'app-classes-page',
  templateUrl: './classes-page.component.html',
  styleUrls: ['./classes-page.component.css'],
})
export class ClassesPageComponent implements OnInit {
  courses: Course[] = COURSES;

  constructor() {}

  ngOnInit(): void {}
}
