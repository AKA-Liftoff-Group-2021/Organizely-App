import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from "rxjs/operators";
import { ApplicationUser } from './shared/models/application-user.model';


export interface RegistrationResponseData {
  status: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(user: ApplicationUser) {
    return this.http.post<RegistrationResponseData>(
      'https://localhost:44394/api/Authentication/Register', user)
      .pipe(catchError(this.handleError));
}

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured!';
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }
        switch (errorRes.error.error.message) {
            case 'Passwords do not match.':
                errorMessage = 'Passwords do not match!';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'This email does not exist.';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'This password is not correct.';
                break;    
        }
        return throwError(errorMessage);
  }

}



