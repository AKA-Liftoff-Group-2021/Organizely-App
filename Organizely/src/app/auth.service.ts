import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface RegistrationResponseData {
  status: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(username: string, email: string, password: string, confirmPassword: string, firstName?: string, lastName?: string) {
    return this.http.post<RegistrationResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB_Ra6WzUVB2vd8T0Usir7Y66qTixG6p4o',
        {
        email: email,
        password: password,
        returnSecureToken: true
        }
    ).pipe(catchError(this.handleError));
}

}



