import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onCreateAccount(signupForm: NgForm) {
    console.log(signupForm.value);
  }


}
