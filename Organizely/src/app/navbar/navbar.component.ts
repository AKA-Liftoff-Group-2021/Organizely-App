import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  // currentUser;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    // this.authService.getStudent().subscribe(
    //   (data) => {
    //     this.currentUser = data;
    //     console.log(this.currentUser);
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
  }

  onLogout() {
    localStorage.removeItem('token');
    // this.currentUser = {};
    // console.log(this.currentUser);
    this.router.navigate(['/', 'organizely', 'login']);
  }
}
