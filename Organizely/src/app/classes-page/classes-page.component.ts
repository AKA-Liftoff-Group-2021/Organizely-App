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

  semestersBySchoolYear: object = {};

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

        this.semestersBySchoolYear = setCoursesBySemester(this.courses);
      },
      (error) => {
        console.log(error);
      },
      () => console.log('All done getting your courses.')
    );
  }

  onDeleteCourse(id: number) {
    if (confirm('Are you sure you want to delete this course?')) {
      this.coursesService.deleteCourse(id).subscribe(
        (data: void) => {
          let coursesOfCurrentSem = this.semestersBySchoolYear[
            this.currentSemester['semesterYear']
          ][this.currentSemester['semesterSeason']];

          let currentCourseIndex: number = this.currentCourses.findIndex(
            (currentCourse) => currentCourse.courseId === id
          );

          let courseIndex: number = this.courses.findIndex(
            (course) => course.courseId === id
          );

          let courseInSemIndex: number = coursesOfCurrentSem.findIndex(
            (course) => course.courseId === id
          );

          this.semestersBySchoolYear[this.currentSemester['semesterYear']][
            this.currentSemester['semesterSeason']
          ].splice(courseInSemIndex, 1);
          this.currentCourses.splice(currentCourseIndex, 1);
          this.courses.splice(courseIndex, 1);

          if (
            this.semestersBySchoolYear[this.currentSemester['semesterYear']][
              this.currentSemester['semesterSeason']
            ].length === 0
          ) {
            delete this.semestersBySchoolYear[
              this.currentSemester['semesterYear']
            ];
          }
        },
        (error: any) => {
          console.log(error);
        },
        () => console.log('Course deleted successfully.')
      );
    }
  }
}
