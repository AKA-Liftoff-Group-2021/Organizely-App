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

  currentCourseId: number;
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
        (course) => {
          this.currentCourse = course;
          this.currentCourseId = course.courseId;
          console.log(this.currentCourse);
          this.currentCourse['daysOfWeek'].forEach((day) => {
            this.selectedDays.push(day);
          });
        },
        (error) => {
          console.error(error);
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

  onSubmit(courseForm: NgForm) {
    if (this.currentCourseId === undefined) {
      this.addCourse(courseForm);
    } else {
      this.updateCourse(courseForm);
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

  addCourse(courseForm: NgForm) {
    const value = courseForm.value;

    const newCourse = new Course(
      value.courseId,
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
      (response) => {
        console.log(response);
        this.submitted = true;
        this.router.navigate(['/', 'organizely', 'classes']);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateCourse(courseForm: NgForm) {
    if (confirm('Are you sure you want to update this course?')) {
      const value = courseForm.value;

      const updatedCourse = new Course(
        this.currentCourseId,
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

      this.coursesService
        .updateCourse(updatedCourse.courseId, updatedCourse)
        .subscribe(
          (response) => {
            // TODO: Determine why this returns 'null'
            console.log(response);
            this.submitted = true;
            this.router.navigate(['/', 'organizely', 'classes']);
          },
          (error) => {
            console.error(error);
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
