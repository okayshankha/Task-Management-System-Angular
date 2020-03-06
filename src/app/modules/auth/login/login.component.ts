import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    //console.log('entered login');

    this.redirect();

    this.loginForm = this.fb.group({
      username: ['admin', [Validators.required]],
      password: ['12345', Validators.required],
    });
  }

  loginFormSubmit() {
    this.errorMessage = "";
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    document.getElementById('loginSubmitBtn').innerHTML = '<i class="fas fa-circle-notch fa-spin"></i>';
    let params = this.loginForm.value;
    let data = null;

    data = this.api.request('login', params);

    if (data['function_response'] == 'success') {
      data = data['server_response'];
      if (data != null) {
        data.subscribe(
          response => {
            if (response.status == 'success') {
              localStorage.setItem('token', response.token);
              //console.log(localStorage.getItem('token'));
              this.router.navigateByUrl('/task');
            } else {
              //console.log(response);
              if (response.status == 'failed') {
                this.errorMessage = response.info;
              }

            }
            document.getElementById('loginSubmitBtn').innerHTML = 'Login';
          },
          error => {
            //console.log(error.error);
            if (error.error.status == 'failed') {
              this.errorMessage = error.error.info;
            }
            document.getElementById('loginSubmitBtn').innerHTML = 'Login';
          }
        );
      }
    }
  }

  redirect() {
    /**
     * redirect
     */
    if ((localStorage.getItem('token') != null)) {
      this.router.navigateByUrl('/task');
    }
  }
}
