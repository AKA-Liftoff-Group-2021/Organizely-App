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
    return this.http.get<StudentTask[]>(this.studentTaskURL, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    });
  }

  getStudentTask(studentTaskId: number): Observable<StudentTask> {
    return this.http.get<StudentTask>(
      `${this.studentTaskURL}/${studentTaskId}`,
      {
        headers: new HttpHeaders({
          Accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }),
      }
    );
  }

  createStudentTask(studentTask: StudentTask): Observable<StudentTask> {
    return this.http.post<StudentTask>(this.studentTaskURL, studentTask, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
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
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }),
      }
    );
  }

  deleteStudentTask(studentTaskId: number): Observable<void> {
    return this.http.delete<void>(`${this.studentTaskURL}/${studentTaskId}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    });
  }
}
