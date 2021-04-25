import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { StudentTask } from '../shared/models/student-task.model';
import { StudentTasksService } from '../shared/student-tasks.service';

import convertToDate from '../shared/utils/convertToDate';
import { CalendarService } from '../shared/calendar.service';

@Component({
  selector: 'app-tasks-form',
  templateUrl: './tasks-form.component.html',
  styleUrls: ['./tasks-form.component.css'],
})
export class TasksFormComponent implements OnInit, OnDestroy {
  priorityOptions: string[] = ['Low', 'Medium', 'High'];

  currentStudentTask: StudentTask;

  submitted: boolean = false;

  selectedDate: Date;

  studentTaskSub: Subscription;

  constructor(
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    private router: Router,
    private studentTasksService: StudentTasksService,
    private calendarService: CalendarService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (params['id'] === undefined) {
        this.calendarService.currentDate.subscribe((data) => {
          this.selectedDate = data;
        });
      } else {
        this.studentTaskSub = this.studentTasksService
          .getStudentTask(+params['id'])
          .subscribe(
            (studentTask: StudentTask) => {
              this.currentStudentTask = studentTask;
            },
            (error: any) => {
              console.log(error);
            }
          );
      }
    });
  }

  onSubmit(studentTaskForm: NgForm) {
    if (this.currentStudentTask === undefined) {
      this.addStudentTask(studentTaskForm);
    } else {
      this.updateStudentTask(studentTaskForm);
    }
  }

  changeDateFormat(date: Date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  addStudentTask(studentTaskForm: NgForm): void {
    const value = studentTaskForm.value;
    const studentTaskId = 0;

    const newStudentTask = new StudentTask(
      studentTaskId,
      value.studentTaskName,
      value.priority,
      value.userId,
      convertToDate(value.taskDueDate, 'due')
    );

    this.studentTasksService.createStudentTask(newStudentTask).subscribe(
      (data: StudentTask) => {
        console.log(data);
        this.submitted = true;
        this.router.navigate(['/', 'organizely', 'tasks']);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  updateStudentTask(studentTaskForm: NgForm): void {
    if (confirm('Are you sure you want to update this task?')) {
      const value = studentTaskForm.value;

      const updatedStudentTask = new StudentTask(
        this.currentStudentTask.studentTaskId,
        value.studentTaskName,
        value.priority,
        value.userId,
        convertToDate(value.taskDueDate, 'due')
      );

      this.studentTasksService
        .updateStudentTask(updatedStudentTask.studentTaskId, updatedStudentTask)
        .subscribe((data: void) => {
          console.log(
            `${updatedStudentTask.studentTaskName} task updated successfully.`
          );
          this.submitted = true;
          this.router.navigate(['/', 'organizely', 'tasks']);
        });
    }
  }

  ngOnDestroy() {
    if (this.studentTaskSub !== undefined) {
      this.studentTaskSub.unsubscribe();
    }
  }
}
