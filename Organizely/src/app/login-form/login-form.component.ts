import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('token') != null) {
      this.router.navigate(['/', 'organizely', 'home']);
    }
  }

  onLogin(loginForm: NgForm) {
    this.authService.login(loginForm.value).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/', 'organizely', 'home']);
      },
      (err) => {
        if (err.status == 400) {
          console.log('Incorrect username or password');
        } else {
          console.log(err);
        }
      }
    );
  }
}
