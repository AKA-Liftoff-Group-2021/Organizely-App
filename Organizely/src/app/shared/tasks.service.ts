import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from './models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  taskURL = 'https://localhost:44394/api/StudentTask';

  constructor(private http: HttpClient) {}

  // getTasks() {
  //   return this.http.get<Task[]>(this.taskURL);
  // }

  postTaskForm(task: Task) {
    this.http.post<Task>(this.taskURL, task).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
