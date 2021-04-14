import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { StudentTask } from '../shared/models/student-task.model';
import { StudentTasksService } from '../shared/student-tasks.service';

import convertToDate from '../shared/utils/convertToDate';

@Component({
  selector: 'app-tasks-form',
  templateUrl: './tasks-form.component.html',
  styleUrls: ['./tasks-form.component.css'],
})
export class TasksFormComponent implements OnInit, OnDestroy {
  priorityOptions: string[] = ['Low', 'Medium', 'High'];

  currentStudentTask: StudentTask;

  submitted: boolean = false;

  studentTaskSub: Subscription;

  constructor(
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    private router: Router,
    private studentTasksService: StudentTasksService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (params['id'] === undefined) {
        return;
      }

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
    });
  }

  onSubmit(studentTaskValues: any) {
    if (this.currentStudentTask === undefined) {
      this.addStudentTask(studentTaskValues);
    } else {
      this.updateStudentTask(studentTaskValues);
    }
  }

  changeDateFormat(date: Date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  addStudentTask(studentTaskValues: any): void {
    let newStudentTask: StudentTask = <StudentTask>studentTaskValues;
    newStudentTask.studentTaskId = 0;

    newStudentTask.taskDueDate = convertToDate(
      studentTaskValues.taskDueDate,
      'due'
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

  updateStudentTask(studentTaskValues: any): void {
    if (confirm('Are you sure you want to update this task?')) {
      this.currentStudentTask = {
        studentTaskId: this.currentStudentTask.studentTaskId,
        ...studentTaskValues,
        taskDueDate: convertToDate(studentTaskValues.taskDueDate, 'due'),
      };

      this.studentTasksService
        .updateStudentTask(
          this.currentStudentTask.studentTaskId,
          this.currentStudentTask
        )
        .subscribe(
          (data: void) => {
            console.log(
              `${this.currentStudentTask.studentTaskName} task updated successfully.`
            );
            this.submitted = true;
            this.router.navigate(['/', 'organizely', 'tasks']);
          },
          (error: any) => {
            console.log(error);
          }
        );
    }
  }

  ngOnDestroy() {
    if (this.studentTaskSub !== undefined) {
      this.studentTaskSub.unsubscribe();
    }
  }
}
