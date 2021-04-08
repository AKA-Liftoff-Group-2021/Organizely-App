import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../shared/courses.service';
import { Course } from '../shared/models/course.model';
import setCurrentSemester from '../shared/utils/setCurrentSemester';
import setSemesterCourses from '../shared/utils/setSemesterCourses';
import setCoursesBySemester from '../shared/utils/setCoursesBySemester';

@Component({
  selector: 'app-classes-page',
  templateUrl: './classes-page.component.html',
  styleUrls: ['./classes-page.component.css'],
})
export class ClassesPageComponent implements OnInit {
  courses: Course[];

  currentDate: Date = new Date();
  currentSemester: object = {};
  currentCourses: Course[];

  coursesBySemester: object = {};

  constructor(private coursesService: CoursesService) {}

  ngOnInit(): void {
    this.currentSemester = setCurrentSemester(this.currentDate);
    this.getAllCourses();
  }

  getAllCourses() {
    this.coursesService.getCourses().subscribe(
      (data) => {
        this.courses = data;
        console.log(this.courses);

        this.currentCourses = setSemesterCourses(
          this.courses,
          this.currentSemester
        );

        this.coursesBySemester = setCoursesBySemester(this.courses);
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
