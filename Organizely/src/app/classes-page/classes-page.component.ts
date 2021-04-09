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
    this.getAllCourses();
  }

  getAllCourses() {
    this.coursesService.getCourses().subscribe(
      (data) => {
        this.courses = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onDeleteCourse(id: number) {
    if (confirm('Are you sure you want to delete this course?')) {
      this.coursesService.deleteCourse(id).subscribe(
        (response) => {
          // TODO: Determine why this returns 'null'
          console.log(response);
          this.getAllCourses();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
