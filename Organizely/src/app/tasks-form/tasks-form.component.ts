import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentTask } from '../shared/models/student-task.model';
import { StudentTasksService } from '../shared/student-tasks.service';

import convertToDate from '../shared/utils/convertToDate';

@Component({
  selector: 'app-tasks-form',
  templateUrl: './tasks-form.component.html',
  styleUrls: ['./tasks-form.component.css'],
})
export class TasksFormComponent implements OnInit {
  priorityOptions: string[] = ['Low', 'Medium', 'High'];

  submitted: boolean = false;

  constructor(
    private router: Router,
    private studentTasksService: StudentTasksService
  ) {}

  ngOnInit(): void {}

  onSubmit(studentTaskForm: NgForm) {
    this.submitted = true;

    const value = studentTaskForm.value;
    const newTask = new StudentTask(
      value.studentTaskId,
      value.studentTaskName,
      value.priority,
      convertToDate(value.taskDueDate, 'due')
    );

    this.studentTasksService.createStudentTask(newTask);
    console.log(newTask);

    this.router.navigate(['/', 'organizely', 'tasks']);
  }
}
