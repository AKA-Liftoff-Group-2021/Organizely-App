import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TASKS } from './mock-data/mock-tasks';
import { Task } from './models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  taskURL = 'https://localhost:44394/api/StudentTask';
  // tasks: Task[];
  tasks: Task[] = TASKS;

  constructor(private http: HttpClient) {}

  // getTasks() {
  //   this.http.get<Task[]>(this.taskURL).subscribe((tasks) => {
  //     this.tasks = tasks;
  //   });
  // }

  postTaskForm(task: Task) {
    this.http.post<Task>(this.taskURL, task).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
