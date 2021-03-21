import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Course } from '../shared/models/course.model';

@Component({
  selector: 'app-classes-form',
  templateUrl: './classes-form.component.html',
  styleUrls: ['./classes-form.component.css'],
})
export class ClassesFormComponent implements OnInit {
  @ViewChild('f') addCourseForm: NgForm;

  dayNames: object[] = [
    { name: 'Sunday', id: 0 },
    { name: 'Monday', id: 1 },
    { name: 'Tuesday', id: 2 },
    { name: 'Wednesday', id: 3 },
    { name: 'Thursday', id: 4 },
    { name: 'Friday', id: 5 },
    { name: 'Saturday', id: 6 },
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

  selectedDays: number[] = [];

  currentDate: Date = new Date();
  currentYear = this.currentDate.getFullYear();

  semesterSeasons: string[] = ['Fall', 'Winter', 'Spring', 'Summer'];

  submitted: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onCheckChange(event) {
    if (event.target.checked) {
      this.selectedDays.push(Number(event.target.value));
    } else {
      this.selectedDays.forEach((day: number) => {
        if (day === Number(event.target.value)) {
          this.selectedDays.splice(this.selectedDays.indexOf(day), 1);
          return;
        }
      });
    }
  }

  onSubmit() {
    this.submitted = true;

    this.course.courseName = this.addCourseForm.value.courseName;
    this.course.startTime = this.addCourseForm.value.startTime;
    this.course.endTime = this.addCourseForm.value.endTime;
    this.course.startRecur = this.addCourseForm.value.startRecur;
    this.course.endRecur = this.addCourseForm.value.endRecur;
    this.course.daysOfWeek = this.selectedDays;
    this.course.semesterSeason = this.addCourseForm.value.semesterSeason;
    this.course.semesterYear = this.addCourseForm.value.semesterYear;
    this.course.teacherName = this.addCourseForm.value.teacherName;

    console.log(this.course);

    this.router.navigate(['/', 'organizely', 'classes']);
  }
}
