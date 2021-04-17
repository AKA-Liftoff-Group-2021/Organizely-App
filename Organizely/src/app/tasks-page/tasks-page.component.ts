import { Component, OnInit } from '@angular/core';
import { StudentTask } from '../shared/models/student-task.model';
import { StudentTasksService } from '../shared/student-tasks.service';

@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.css'],
})
export class TasksPageComponent implements OnInit {
  currentDate: Date = new Date();

  studentTasks: StudentTask[];

  constructor(private studentTasksService: StudentTasksService) {}

  ngOnInit(): void {
    this.getAllStudentTasks();
  }

  getAllStudentTasks() {
    this.studentTasksService.getStudentTasks().subscribe(
      (data: StudentTask[]) => {
        this.studentTasks = data;
      },
      (error: any) => {
        console.log(error);
      },
      () => console.log('All done getting your tasks.')
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
    let badgeStyle: string;
    let due: Date = new Date(dueDate);

    this.currentDate.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);

    if (this.currentDate.getTime() < due.getTime()) {
      badgeStyle = 'badge-success';
    }

    if (this.currentDate.getTime() === due.getTime()) {
      badgeStyle = 'badge-warning';
    }

    if (this.currentDate > due) {
      badgeStyle = 'badge-danger';
    }

    return badgeStyle;
  }

  onDeleteStudentTask(id: number) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.studentTasksService.deleteStudentTask(id).subscribe(
        (data: void) => {
          let index: number = this.studentTasks.findIndex(
            (task) => task.studentTaskId === id
          );
          this.studentTasks.splice(index, 1);
        },
        (error: any) => {
          console.log(error);
        }
      );
    }
  }
}
