import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  /**
   * Init registration form
   */
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      'username': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      'confirm_password': ['', [Validators.required]]
    });
  }

  /**
   * Send registration form data to api
   */
  register() {
    console.info(this.registerForm);
  }

}
