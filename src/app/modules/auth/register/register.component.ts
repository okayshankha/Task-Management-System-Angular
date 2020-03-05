import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup;

  constructor(public router: Router, private fb: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      fname: ['', [Validators.required]],
      mname: ['', [Validators.required]],
      lname: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      address: ['', [Validators.required]],
      password: ['', [Validators.required]],
      cpassword: ['', [Validators.required]],
    }, { validators: this.PasswordMatch });
  }

  registrationFormSubmit() {
    console.log('registrationFormSubmit called');
    let data = null;
    if (!this.registrationForm.valid) {
      this.registrationForm.markAllAsTouched();
    } else {
      console.log('registrating...');
      data = this.api.request('register', this.registrationForm.value);
      if (data['function_response'] == 'success') {
        console.log('function_response...success');
        data = data['server_response'];
        if (data != null) {
          data.subscribe((response) => {
            if (response.status == 'success') {
              console.log(response);
              console.log('registration successfull');
              this.router.navigate(['']);
            } else {
              console.log(response);
            }
          });
        }
      }
    }
  }

  PasswordMatch(form: FormGroup): { [key: string]: boolean } | null {
    if (form.get('password').value !== form.get('cpassword').value) {
      form.get('cpassword').setErrors({ PasswordMatch: true });
    }
    return null;
  }

}
