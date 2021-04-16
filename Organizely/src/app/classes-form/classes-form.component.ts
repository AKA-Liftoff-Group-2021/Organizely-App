import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Params, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { CoursesService } from '../shared/courses.service';
import { Course } from '../shared/models/course.model';

@Component({
  selector: 'app-classes-form',
  templateUrl: './classes-form.component.html',
  styleUrls: ['./classes-form.component.css'],
})
export class ClassesFormComponent implements OnInit, OnDestroy {
  dayNames: object[] = [
    { name: 'Sunday', id: '0' },
    { name: 'Monday', id: '1' },
    { name: 'Tuesday', id: '2' },
    { name: 'Wednesday', id: '3' },
    { name: 'Thursday', id: '4' },
    { name: 'Friday', id: '5' },
    { name: 'Saturday', id: '6' },
  ];

  currentCourse: Course;

  selectedDays: string[] = [];

  currentDate: Date = new Date();
  currentYear = this.currentDate.getFullYear();

  semesterSeasons: string[] = ['Fall', 'Winter', 'Spring', 'Summer'];

  submitted: boolean = false;

  courseSub: Subscription;

  constructor(
    public datePipe: DatePipe,
    private route: ActivatedRoute,
    private router: Router,
    private coursesService: CoursesService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (params['id'] === undefined) {
        return;
      }

      this.courseSub = this.coursesService.getCourse(+params['id']).subscribe(
        (course: Course) => {
          if (course.courseId != undefined) {
            this.currentCourse = course;
            this.currentCourse['daysOfWeek'].forEach((day) => {
              this.selectedDays.push(day);
            });
          }
          return;
        },
        (error: any) => {
          console.log(error);
        }
      );
    });
  }

  onCheckChange(event) {
    if (event.target.checked) {
      this.selectedDays.push(event.target.value);
    } else {
      this.selectedDays.forEach((day: string) => {
        if (day === event.target.value) {
          this.selectedDays.splice(this.selectedDays.indexOf(day), 1);
          return;
        }
      });
    }
  }

  changeDateFormat(date: Date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  onSubmit(courseValues: any) {
    if (this.currentCourse === undefined) {
      this.addCourse(courseValues);
    } else {
      this.updateCourse(courseValues);
    }
  }

  convertToDate(dateString: string, type: string): Date {
    let dateArr = dateString.split('-');

    const year = Number(dateArr[0]);
    const month = Number(dateArr[1]) - 1;
    const day = Number(dateArr[2]);

    let newDate = new Date(year, month, day);

    if (type === 'end') {
      newDate.setDate(newDate.getDate() + 1);
    }

    return newDate;
  }

  addCourse(courseForm: NgForm): void {
    const value = courseForm.value;
    const newCourseId = 0;

    const newCourse = new Course(
      newCourseId,
      value.courseName,
      value.startTime + ':00',
      value.endTime + ':00',
      this.convertToDate(value.startRecur, 'start'),
      this.convertToDate(value.endRecur, 'end'),
      this.selectedDays,
      value.semesterSeason,
      value.semesterYear,
      value.teacherName
    );

    this.coursesService.createCourse(newCourse).subscribe(
      (data: Course) => {
        console.log(data);
        this.submitted = true;
        this.router.navigate(['/', 'organizely', 'classes']);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  updateCourse(courseForm: NgForm): void {
    if (confirm('Are you sure you want to update this course?')) {
      const value = courseForm.value;

      if (this.currentCourse.startTime !== value.startTime) {
        value.startTime = value.startTime + ':00';
      }

      if (this.currentCourse.endTime !== value.endTime) {
        value.endTime = value.endTime + ':00';
      }

      const updatedCourse = new Course(
        this.currentCourse.courseId,
        value.courseName,
        value.startTime,
        value.endTime,
        this.convertToDate(value.startRecur, 'start'),
        this.convertToDate(value.endRecur, 'end'),
        this.selectedDays,
        value.semesterSeason,
        value.semesterYear,
        value.teacherName
      );

      this.coursesService
        .updateCourse(updatedCourse.courseId, updatedCourse)
        .subscribe(
          (data: void) => {
            console.log(
              `${updatedCourse.courseName} course updated successfully.`
            );
            this.submitted = true;
            this.router.navigate(['/', 'organizely', 'classes']);
          },
          (error: any) => {
            console.log(error);
          }
        );
    }
  }

  ngOnDestroy() {
    if (this.courseSub !== undefined) {
      this.courseSub.unsubscribe();
    }
  }
}
