import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-classes-page',
  templateUrl: './classes-page.component.html',
  styleUrls: ['./classes-page.component.css'],
})
export class ClassesPageComponent implements OnInit {
  dayNames: object[] = [
    { name: 'Sunday', id: 0 },
    { name: 'Monday', id: 1 },
    { name: 'Tuesday', id: 2 },
    { name: 'Wednesday', id: 3 },
    { name: 'Thursday', id: 4 },
    { name: 'Friday', id: 5 },
    { name: 'Saturday', id: 6 },
  ];

  currentDate: Date = new Date();
  currentYear = this.currentDate.getFullYear();

  semesterSeasons: string[] = ['Fall', 'Winter', 'Spring', 'Summer'];

  addCourseForm: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.addCourseForm = new FormGroup({
      courseName: new FormControl(null, Validators.required),
      startTime: new FormControl(null, Validators.required),
      endTime: new FormControl(null, Validators.required),
      startRecur: new FormControl(null, Validators.required),
      endRecur: new FormControl(null, Validators.required),
      daysOfWeek: new FormArray([]),
      semesterSeason: new FormControl(null, Validators.required),
      semesterYear: new FormControl(null, Validators.required),
      teacherName: new FormControl(null),
    });
  }

  onCheckboxChange(event) {
    console.log(event.target.value);
  }

  submit() {
    console.log(this.addCourseForm.value);
  }
}
