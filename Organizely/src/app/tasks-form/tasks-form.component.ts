import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Task } from '../shared/models/task.model';
import { TasksService } from '../shared/tasks.service';

@Component({
  selector: 'app-tasks-form',
  templateUrl: './tasks-form.component.html',
  styleUrls: ['./tasks-form.component.css'],
})
export class TasksFormComponent implements OnInit {
  priorityOptions: string[] = ['Low', 'Medium', 'High'];

  submitted: boolean = false;

  constructor(private router: Router, private tasksService: TasksService) {}

  ngOnInit(): void {}

  onSubmit(taskForm: NgForm) {
    this.submitted = true;

    const value = taskForm.value;
    const newTask = new Task(
      value.studentTaskName,
      value.priority,
      value.taskDueDate
    );

    this.tasksService.postTaskForm(newTask);

    this.router.navigate(['/', 'organizely', 'tasks']);
  }
}
