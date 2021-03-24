import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DataBaseAPIService } from '../data-base-api.service';
import { Course } from '../shared/models/course.model';

@Component({
  selector: 'app-classes-form',
  templateUrl: './classes-form.component.html',
  styleUrls: ['./classes-form.component.css'],
})
export class ClassesFormComponent implements OnInit {
  @ViewChild('f') addCourseForm: NgForm;

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

  selectedDays: string[] = [];

  currentDate: Date = new Date();
  currentYear = this.currentDate.getFullYear();

  semesterSeasons: string[] = ['Fall', 'Winter', 'Spring', 'Summer'];

  submitted: boolean = false;

  constructor(
    private router: Router,
    private dataBaseAPIService: DataBaseAPIService
  ) {}

  ngOnInit(): void {}

  onCheckChange(event) {
    if (event.target.checked) {
      this.selectedDays.push(event.target.value);
    } else {
      this.selectedDays.forEach((day) => {
        if (day === event.target.value) {
          this.selectedDays.splice(this.selectedDays.indexOf(day), 1);
          return;
        }
      });
    }
  }

  onSubmit() {
    this.submitted = true;

    this.course.courseName = this.addCourseForm.value.courseName;
    this.course.startTime = this.addCourseForm.value.startTime + ':00';
    this.course.endTime = this.addCourseForm.value.endTime + ':00';

    // Returns "Invalid Date" if user uses arrow keys to move to last day of a month

    this.course.startRecur = this.convertToDate(
      this.addCourseForm.value.startRecur,
      'start'
    );

    // Returns "Invalid Date" if user uses arrow keys to move to last day of a month

    this.course.endRecur = this.convertToDate(
      this.addCourseForm.value.endRecur,
      'end'
    );

    this.course.daysOfWeek = this.selectedDays;
    this.course.semesterSeason = this.addCourseForm.value.semesterSeason;
    this.course.semesterYear = this.addCourseForm.value.semesterYear;
    this.course.teacherName = this.addCourseForm.value.teacherName;

    this.dataBaseAPIService
      .postCourseForm(this.addCourseForm.value)
      .subscribe((responseData) => {
        console.log(responseData);
      });

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
}
