import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApplicationUser } from '../shared/models/application-user.model';

export interface RegistrationResponseData {
  status: string;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(user: ApplicationUser) {
    return this.http
      .post<RegistrationResponseData>(
        'https://localhost:44394/api/Authentication/Register',
        user
      )
      .pipe(catchError(this.handleError));
  }

  login(formData) {
    return this.http.post(
      'https://localhost:44394/api/Authentication/Login',
      formData
    );
  }

  getStudent() {
    return this.http.get('https://localhost:44394/api/Student', {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    });
  }

  private handleError(errorRes: HttpErrorResponse) {
    // TODO: Figure out why user signup triggers error handler when signup successful
    let errorMessage = 'An unknown error occured!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'Passwords do not match.':
        errorMessage = 'Passwords do not match!';
        break;
      case 'User already exists.':
        errorMessage = 'User already exists!';
        break;
    }
    return throwError(errorMessage);
  }
}
