import { HttpClient } from '@angular/common/http';
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
      `${this.studentTaskURL}/${studentTaskId}`
    );
  }

  createStudentTask(studentTask: StudentTask): Observable<StudentTask> {
    return this.http.post<StudentTask>(this.studentTaskURL, studentTask);
  }

  updateStudentTask(
    studentTaskId: number,
    studentTask: StudentTask
  ): Observable<any> {
    return this.http.put(
      `${this.studentTaskURL}/${studentTaskId}`,
      studentTask
    );
  }

  deleteStudentTask(studentTaskId: number): Observable<any> {
    return this.http.delete(`${this.studentTaskURL}/${studentTaskId}`);
  }
}
