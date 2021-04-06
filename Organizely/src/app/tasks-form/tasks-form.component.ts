import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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

  currentStudentTaskId: number;
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
          (studentTask) => {
            this.currentStudentTaskId = studentTask.studentTaskId;
            this.currentStudentTask = studentTask;
            console.log(this.currentStudentTask);
          },
          (error) => {
            console.log(error);
          }
        );
    });
  }

  onSubmit(studentTaskForm: NgForm) {
    if (this.currentStudentTaskId === undefined) {
      this.addStudentTask(studentTaskForm);
    } else {
      this.updateStudentTask(studentTaskForm);
    }
  }

  changeDateFormat(date: Date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  addStudentTask(studentTaskForm: NgForm) {
    const value = studentTaskForm.value;

    const newTask = new StudentTask(
      value.studentTaskId,
      value.studentTaskName,
      value.priority,
      convertToDate(value.taskDueDate, 'due')
    );

    this.studentTasksService.createStudentTask(newTask).subscribe(
      (response) => {
        console.log(response);
        this.submitted = true;
        this.router.navigate(['/', 'organizely', 'tasks']);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateStudentTask(studentTaskForm: NgForm) {
    if (confirm('Are you sure you want to update this task?')) {
      const value = studentTaskForm.value;

      const updatedStudentTask = new StudentTask(
        this.currentStudentTaskId,
        value.studentTaskName,
        value.prioirty,
        convertToDate(value.taskDueDate, 'due')
      );

      this.studentTasksService
        .updateStudentTask(updatedStudentTask.studentTaskId, updatedStudentTask)
        .subscribe(
          (response) => {
            // TODO: Determine why this returns 'null'
            console.log(response);
            this.submitted = true;
            this.router.navigate(['/', 'organizely', 'tasks']);
          },
          (error) => {
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
