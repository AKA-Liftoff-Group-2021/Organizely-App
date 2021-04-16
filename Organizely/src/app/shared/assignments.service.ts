import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Assignment } from './models/assignment.model';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  assignmentURL = 'https://localhost:44394/api/Assignment';

  constructor(private http: HttpClient) { }

  createAssignment(assignment: Assignment): Observable<Assignment> {
    return this.http.post<Assignment>(this.assignmentURL, assignment,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  getAssignments(): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(this.assignmentURL);
  }

  getAssignment(assignmentId: number): Observable<Assignment> {
    return this.http.get<Assignment>(
      `${this.assignmentURL}/${assignmentId}`,
      {
        headers: new HttpHeaders({
          Accept: 'application/json',
        }),
      }
    );
  }


  updateAssignment(assignmentId: number, assignment: Assignment): Observable<void> {
    return this.http.put<void>(`${this.assignmentURL}/${assignmentId}`, assignment,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      }
    );
  }

  deleteAssignment(assignmentId: number): Observable<void> {
    return this.http.delete<void>(`${this.assignmentURL}/${assignmentId}`);
  }
}


