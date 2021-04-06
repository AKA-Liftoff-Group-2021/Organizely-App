import { Component, OnInit } from '@angular/core';
import { StudentTask } from '../shared/models/student-task.model';
import { STUDENTTASKS } from '../shared/mock-data/mock-tasks';
import { StudentTasksService } from '../shared/student-tasks.service';

@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.css'],
})
export class TasksPageComponent implements OnInit {
  currentDate: Date = new Date();

  studentTasks: StudentTask[];
  // studentTasks: Task[] = TASKS;

  constructor(private studentTasksService: StudentTasksService) {}

  ngOnInit(): void {
    this.getStudentTasks();
  }

  getStudentTasks() {
    this.studentTasksService.getStudentTasks().subscribe(
      (data) => {
        this.studentTasks = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
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

  onDeleteStudentTask(id: number) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.studentTasksService.deleteStudentTask(id).subscribe(
        (response) => {
          console.log(response);
          this.getStudentTasks();
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
}
