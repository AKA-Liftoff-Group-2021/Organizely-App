import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from './models/course.model';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  courseURL = 'https://localhost:44394/api/Course';

  constructor(private http: HttpClient) {}

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.courseURL, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    });
  }

  getCourse(courseId: number): Observable<Course> {
    return this.http.get<Course>(`${this.courseURL}/${courseId}`, {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    });
  }

  createCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(this.courseURL, course, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    });
  }

  updateCourse(courseId: number, course: Course): Observable<void> {
    return this.http.put<void>(`${this.courseURL}/${courseId}`, course, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    });
  }

  deleteCourse(courseId: number): Observable<void> {
    return this.http.delete<void>(`${this.courseURL}/${courseId}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    });
  }
}
