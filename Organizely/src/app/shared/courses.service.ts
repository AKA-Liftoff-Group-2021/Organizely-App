import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from './models/course.model';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  courseURL = 'https://localhost:44394/api/Course';

  constructor(private http: HttpClient) {}

  getCourses() {
    return this.http.get<Course[]>(this.courseURL);
  }

  getCourse(courseId: number) {
    return this.http.get<Course>(`${this.courseURL}/${courseId}`);
  }

  createCourse(course: Course) {
    this.http.post<Course>(this.courseURL, course).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  updateCourse(courseId: number, course: Course) {
    return this.http.put(`${this.courseURL}/${courseId}`, course);
  }

  deleteCourse(courseId: number) {
    return this.http.delete(`${this.courseURL}/${courseId}`);
  }
}
