import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { ApplicationUser } from '../shared/models/application-user.model';
import { RegistrationResponseData } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css'],
})
export class SignupFormComponent implements OnInit {
  constructor(private authService: AuthService,
              private router: Router) {}

  ngOnInit(): void {}

  onCreateAccount(signupForm: NgForm) {
    const value = signupForm.value;

    const newUser = new ApplicationUser(
      value.username,
      value.email,
      value.password,
      value.confirmPassword,
      value.firstName,
      value.lastName
    );
    this.authService.register(newUser).subscribe(
      (data: RegistrationResponseData) => {
        console.log(data);
        //this.submitted = true;
        this.router.navigate(['organizely/login']);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
