import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentTask } from './models/student-task.model';

@Injectable({
  providedIn: 'root',
})
export class StudentTasksService {
  studentTaskURL = 'https://localhost:44394/api/StudentTask';

  constructor(private http: HttpClient) {}

  getStudentTasks(): Observable<StudentTask[]> {
    return this.http.get<StudentTask[]>(this.studentTaskURL);
  }

  getStudentTask(studentTaskId: number): Observable<StudentTask> {
    return this.http.get<StudentTask>(
      `${this.studentTaskURL}/${studentTaskId}`,
      {
        headers: new HttpHeaders({
          Accept: 'application/json',
        }),
      }
    );
  }

  // TODO: create a method to transform data for calendar and agenda views

  createStudentTask(studentTask: StudentTask): Observable<StudentTask> {
    return this.http.post<StudentTask>(this.studentTaskURL, studentTask, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  updateStudentTask(
    studentTaskId: number,
    studentTask: StudentTask
  ): Observable<void> {
    return this.http.put<void>(
      `${this.studentTaskURL}/${studentTaskId}`,
      studentTask,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      }
    );
  }

  deleteStudentTask(studentTaskId: number): Observable<void> {
    return this.http.delete<void>(`${this.studentTaskURL}/${studentTaskId}`);
  }
}
