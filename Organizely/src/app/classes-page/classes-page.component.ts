import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-classes-page',
  templateUrl: './classes-page.component.html',
  styleUrls: ['./classes-page.component.css'],
})
export class ClassesPageComponent implements OnInit {
  dayNames: string[] = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  currentDate: Date = new Date();
  currentYear = this.currentDate.getFullYear();

  semesterSeasons: string[] = ['Fall', 'Winter', 'Spring', 'Summer'];

  constructor() {}

  ngOnInit(): void {}
}
