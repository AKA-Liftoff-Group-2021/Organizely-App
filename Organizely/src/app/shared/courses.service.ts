import { HttpClient } from '@angular/common/http';
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
    return this.http.get<Course>(`${this.courseURL}/${courseId}`);
  }

  createCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(this.courseURL, course);
  }

  updateCourse(courseId: number, course: Course): Observable<any> {
    return this.http.put(`${this.courseURL}/${courseId}`, course);
  }

  deleteCourse(courseId: number): Observable<any> {
    return this.http.delete(`${this.courseURL}/${courseId}`);
  }
}
