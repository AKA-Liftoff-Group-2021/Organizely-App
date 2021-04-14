import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { COURSES } from '../shared/mock-data/mock-courses';
import { Assignment } from '../shared/models/assignment.model';
import { Course } from '../shared/models/course.model';

@Component({
  selector: 'app-assignments-form',
  templateUrl: './assignments-form.component.html',
  styleUrls: ['./assignments-form.component.css']
})
export class AssignmentsFormComponent implements OnInit {
  courses: Course[] = COURSES;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(assignmentForm: NgForm) {
    const value = assignmentForm.value;
    const assignmentId = 0;
    
    const newAssignment = new Assignment(
      assignmentId, 
      value.assignmentName, 
      value.dueDate, 
      value.courseId
      );

    console.log(newAssignment);

    this.router.navigate(['/', 'organizely', 'assignments']);
  }

  convertToDate(dateString: string, type: string): Date {
    let dateArr = dateString.split('-');

    const year = Number(dateArr[0]);
    const month = Number(dateArr[1]);
    let day = Number(dateArr[2]);

    let newDate = new Date(year, month, day);

    newDate.setMonth(newDate.getMonth() - 1);

    // let lastDayOfMonth = new Date(
    //   newDate.getFullYear(),
    //   newDate.getMonth() + 1,
    //   0
    // );

    if (type === 'end') {
      //TODO: Test for edge cases
      newDate.setDate(newDate.getDate() + 1);
    }

    return newDate;
  }

}
