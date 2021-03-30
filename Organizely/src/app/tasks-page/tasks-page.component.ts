import { Component, OnInit } from '@angular/core';
import { Task } from '../shared/models/task.model';
import { TasksService } from '../shared/tasks.service';

@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.css'],
})
export class TasksPageComponent implements OnInit {
  tasks: Task[];

  constructor(public tasksService: TasksService) {}

  ngOnInit(): void {
    this.tasksService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }
}
