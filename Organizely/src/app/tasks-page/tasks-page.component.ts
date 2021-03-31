import { Component, OnInit } from '@angular/core';
import { Task } from '../shared/models/task.model';
import { TasksService } from '../shared/tasks.service';

@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.css'],
})
export class TasksPageComponent implements OnInit {
  currentDate: Date = new Date();

  tasks: Task[];
  // tasks: Task[] = TASKS;

  constructor(public tasksService: TasksService) {}

  ngOnInit(): void {
    this.tasksService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  stylePriorityBadge(priority: string): string {
    let badgeStyle: string = 'badge-success';

    if (priority === 'Medium') {
      badgeStyle = 'badge-warning';
    }

    if (priority === 'High') {
      badgeStyle = 'badge-danger';
    }

    return badgeStyle;
  }

  styleDueDateBadge(dueDate: Date): string {
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