import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../shared/courses.service';
import { Course } from '../shared/models/course.model';
import setCurrentSemester from '../shared/utils/setCurrentSemester';
import setSemesterCourses from '../shared/utils/setSemesterCourses';

@Component({
  selector: 'app-classes-page',
  templateUrl: './classes-page.component.html',
  styleUrls: ['./classes-page.component.css'],
})
export class ClassesPageComponent implements OnInit {
  courses: Course[];

  currentDate: Date = new Date();
  currentSemester: object;
  currentCourses: Course[];

  constructor(private coursesService: CoursesService) {}

  ngOnInit(): void {
    // TODO: set current semester year and season to variables based on result of setCurrentSemester(currentDate)
    this.currentSemester = setCurrentSemester(this.currentDate);
    this.getAllCourses();
  }

  getAllCourses() {
    this.coursesService.getCourses().subscribe(
      (data) => {
        this.courses = data;
        console.log(this.courses);
        // TODO: call a function to filter in list the courses associated with the current semester => setSemesterCourses(courses, currentSemester)
        this.currentCourses = setSemesterCourses(
          this.courses,
          this.currentSemester
        );
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
