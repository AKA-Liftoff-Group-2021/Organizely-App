import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataBaseAPIService {
  courseURL = "https://localhost:44394/api/Course";

  constructor(private http: HttpClient) { }

  postCourseForm(form: Object): Observable<Object> {
    return this.http.post<Object>(this.courseURL, form);
  };
}


