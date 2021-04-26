import { DatePipe } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AssignmentsService } from '../shared/assignments.service';
import { CalendarService } from '../shared/calendar.service';
import { CoursesService } from '../shared/courses.service';
import { Assignment } from '../shared/models/assignment.model';
import { Course } from '../shared/models/course.model';
import convertToDate from '../shared/utils/convertToDate';

@Component({
  selector: 'app-assignments-form',
  templateUrl: './assignments-form.component.html',
  styleUrls: ['./assignments-form.component.css'],
})
export class AssignmentsFormComponent implements OnInit {
  courses: Course[];
  submitted: boolean = false;

  selectedDate: Date;

  currentAssignmentId: number;
  currentAssignment: Assignment;

  assignmentSub: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private assignmentsService: AssignmentsService,
    private coursesService: CoursesService,
    private calendarService: CalendarService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.getAllCourses();

    this.route.params.subscribe((params: Params) => {
      if (params['id'] === undefined) {
        this.calendarService.currentDate.subscribe((data) => {
          this.selectedDate = data;
        });
      } else {
        this.assignmentSub = this.assignmentsService
          .getAssignment(+params['id'])
          .subscribe(
            (assignment: Assignment) => {
              this.currentAssignmentId = assignment.assignmentId;
              this.currentAssignment = assignment;
            },
            (error: any) => {
              console.log(error);
            }
          );
      }
    });
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

  changeDateFormat(date: Date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  onSubmit(assignmentForm: NgForm) {
    if (this.currentAssignmentId === undefined) {
      this.addAssignment(assignmentForm);
    } else {
      this.updateAssignment(assignmentForm);
    }
  }

  addAssignment(assignmentForm: NgForm) {
    const value = assignmentForm.value;
    const assignmentId = 0;

    const newAssignment = new Assignment(
      assignmentId,
      value.assignmentName,
      convertToDate(value.dueDate, 'due'),
      value.courseId,
      value.userId
    );

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

  updateAssignment(assignmentForm: NgForm) {
    if (confirm('Are you sure you want to update this assignment?')) {
      const value = assignmentForm.value;

      const updatedAssignment = new Assignment(
        this.currentAssignmentId,
        value.assignmentName,
        convertToDate(value.dueDate, 'due'),
        value.courseId,
        value.userId
      );

      this.assignmentsService
        .updateAssignment(updatedAssignment.assignmentId, updatedAssignment)
        .subscribe(
          (data: void) => {
            console.log(
              `${updatedAssignment.assignmentName} assignment updated successfully.`
            );
            this.submitted = true;
            this.router.navigate(['/', 'organizely', 'assignments']);
          },
          (error: any) => {
            console.log(error);
          }
        );
    }
  }

  ngOnDestroy() {
    if (this.assignmentSub !== undefined) {
      this.assignmentSub.unsubscribe();
    }
  }
}
