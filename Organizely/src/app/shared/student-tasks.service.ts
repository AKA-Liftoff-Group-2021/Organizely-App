import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudentTask } from './models/student-task.model';

@Injectable({
  providedIn: 'root',
})
export class StudentTasksService {
  studentTaskURL = 'https://localhost:44394/api/StudentTask';

  constructor(private http: HttpClient) {}

  getStudentTasks() {
    return this.http.get<StudentTask[]>(this.studentTaskURL);
  }

  createStudentTask(studentTask: StudentTask) {
    this.http.post<StudentTask>(this.studentTaskURL, studentTask).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  deleteStudentTask(studentTaskId: number) {
    return this.http.delete(`${this.studentTaskURL}/${studentTaskId}`);
  }
}
