import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Task } from '../shared/models/task.model';

@Component({
  selector: 'app-tasks-form',
  templateUrl: './tasks-form.component.html',
  styleUrls: ['./tasks-form.component.css'],
})
export class TasksFormComponent implements OnInit {
  @ViewChild('f') addTaskForm: NgForm;

  priorityOptions: string[] = ['Low', 'Medium', 'High'];

  studentTask: Task = {
    taskName: null,
    priority: null,
    dueDate: null,
  };

  submitted: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    this.submitted = true;

    this.studentTask.taskName = this.addTaskForm.value.taskName;
    this.studentTask.priority = this.addTaskForm.value.priority;
    this.studentTask.dueDate = this.addTaskForm.value.dueDate;

    console.log(this.studentTask);

    this.router.navigate(['/', 'organizely', 'tasks']);
  }
}
