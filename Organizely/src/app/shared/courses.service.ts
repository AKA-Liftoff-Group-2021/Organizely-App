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
    return this.http.get<Course[]>(this.courseURL);
  }

  getCourse(courseId: number): Observable<Course> {
    return this.http.get<Course>(`${this.courseURL}/${courseId}`, {
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    });
  }

  // TODO: create a method to transform data for calendar and agenda views

  createCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(this.courseURL, course, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  updateCourse(courseId: number, course: Course): Observable<void> {
    return this.http.put<void>(`${this.courseURL}/${courseId}`, course, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  deleteCourse(courseId: number): Observable<void> {
    return this.http.delete<void>(`${this.courseURL}/${courseId}`);
  }
}
