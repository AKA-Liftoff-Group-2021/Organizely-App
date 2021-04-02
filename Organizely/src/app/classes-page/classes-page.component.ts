import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../shared/courses.service';
import { COURSES } from '../shared/mock-data/mock-courses';
import { Course } from '../shared/models/course.model';

@Component({
  selector: 'app-classes-page',
  templateUrl: './classes-page.component.html',
  styleUrls: ['./classes-page.component.css'],
})
export class ClassesPageComponent implements OnInit {
  courses: Course[];
  // courses: Course[] = COURSES;

  constructor(private coursesService: CoursesService) {}

  ngOnInit(): void {
    this.coursesService.getCourses().subscribe((courses) => {
      this.courses = courses;
    });
  }

  onDeleteCourse(id: number) {
    if (confirm('Are you sure you want to delete this course?')) {
      this.coursesService.deleteCourse(id).subscribe(
        (res) => {
          this.coursesService.getCourses();
        },
        (err) => {
          console.error(err);
        }
      );
    }
  }
}
