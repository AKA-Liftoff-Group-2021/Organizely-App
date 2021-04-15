import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AssignmentsService } from '../shared/assignments.service';
import { CoursesService } from '../shared/courses.service';
import { Assignment } from '../shared/models/assignment.model';
import { Course } from '../shared/models/course.model';
import convertToDate from '../shared/utils/convertToDate';


@Component({
  selector: 'app-assignments-form',
  templateUrl: './assignments-form.component.html',
  styleUrls: ['./assignments-form.component.css']
})
export class AssignmentsFormComponent implements OnInit {
  courses: Course[];
  submitted: boolean = false;

  constructor(private router: Router,
              private assignmentsService: AssignmentsService,
              private coursesService: CoursesService,
              private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getAllCourses();
    console.log(this.courses);
  }

  getAllCourses() {
    this.coursesService.getCourses().subscribe(
      (data: Course[]) => {
        this.courses = data;
      },
      (error: any) => {
        console.log(error);
      },
      () => console.log('All done getting your courses.')
    );
  }

  onSubmit(assignmentForm: NgForm) {
    const value = assignmentForm.value;
    const assignmentId = 0;
    
    const newAssignment = new Assignment(
      assignmentId, 
      value.assignmentName, 
      convertToDate(value.dueDate, 'due'), 
      value.courseId);
    
      this.assignmentsService.createAssignment(newAssignment).subscribe(
        (data: Assignment) => {
          console.log(data);
          this.submitted = true;
          this.router.navigate(['/', 'organizely', 'assignments']);
        },
        (error: any) => {
          console.log(error);
        }
      );
    }

}
