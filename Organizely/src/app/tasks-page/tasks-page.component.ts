import { Component, OnInit } from '@angular/core';
import { TASKS } from '../shared/mock-data/mock-tasks';
import { Task } from '../shared/models/task.model';
import { TasksService } from '../shared/tasks.service';

@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.css'],
})
export class TasksPageComponent implements OnInit {
  currentDate: Date = new Date();

  tasks: Task[] = TASKS;

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    // this.tasksService.getTasks().subscribe(tasks => this.tasks = tasks);
  }

  styleBadge(dueDate: Date): string {
    let badgeStyle: string = 'badge-primary';
    let current: Date = new Date(this.currentDate);
    let due: Date = new Date(dueDate);

    current.setHours(0, 0, 0, 0);

    let same: boolean = current.getTime() === due.getTime();

    if (same) {
      badgeStyle = 'badge-warning';
    }

    if (current > due) {
      badgeStyle = 'badge-danger';
    }

    return badgeStyle;
  }
}
