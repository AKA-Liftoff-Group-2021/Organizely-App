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

  course: Course = {
    courseId: null,
    courseName: null,
    startTime: null,
    endTime: null,
    startRecur: null,
    endRecur: null,
    daysOfWeek: null,
    semesterSeason: null,
    semesterYear: null,
    teacherName: null,
  };

  currentCourseId: number;
  currentCourse: Course;

  selectedDays: string[] = [];

  currentDate: Date = new Date();
  currentYear = this.currentDate.getFullYear();

  semesterSeasons: string[] = ['Fall', 'Winter', 'Spring', 'Summer'];

  submitted: boolean = false;

  courseSubscription: Subscription;

  constructor(
    public datePipe: DatePipe,
    private route: ActivatedRoute,
    private router: Router,
    private coursesService: CoursesService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.course.courseId = +params['id'];

      this.coursesService.getCourse(this.course.courseId).subscribe(
        (course) => {
          this.currentCourse = course;
          console.log(this.currentCourse);
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

  convertDateFormat(date: Date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  onSubmit(courseForm: NgForm) {
    this.submitted = true;

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

    console.log(newCourse);

    this.coursesService.createCourse(newCourse);

    this.router.navigate(['/', 'organizely', 'classes']);
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

  ngOnDestroy() {
    this.courseSubscription.unsubscribe();
  }
}
