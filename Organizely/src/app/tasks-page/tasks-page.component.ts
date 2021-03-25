import { Component, OnInit } from '@angular/core';
import { TASKS } from '../shared/mock-data/mock-tasks';
import { Task } from '../shared/models/task.model';

@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.css'],
})
export class TasksPageComponent implements OnInit {
  tasks: Task[] = TASKS;

  constructor() {}

  ngOnInit(): void {}
}
