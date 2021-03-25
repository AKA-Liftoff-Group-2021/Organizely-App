import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from './shared/models/course.model';

@Injectable({
  providedIn: 'root',
})
export class DataBaseAPIService {
  courseURL = 'https://localhost:44394/api/Course';

  constructor(private http: HttpClient) {}

  postCourseForm(course: Course) {
    this.http.post<Course>(this.courseURL, course)
    .subscribe((response) => {
      console.log(response);
    });
}
}
