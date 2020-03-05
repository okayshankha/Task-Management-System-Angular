import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  template: '<p>Logout</p>',
  styles: []
})
export class LogoutComponent implements OnInit {

  constructor(
    private router: Router,
    private api: ApiService
    ) { }

  ngOnInit(): void {
    console.log('lohout init');
    let data = null;

    if(this.redirect()){
      return;
    }

    data = this.api.request('logout', {});

    if (data['function_response'] == 'success') {
      data = data['server_response'];
      if (data != null) {
        data.subscribe(
          response => {
            if (response.status == 'success') {
              localStorage.removeItem('token');
              this.router.navigateByUrl('/login');
            } else {
              console.log(response);
            }
          },
          error => {
            console.log(error.error);
          }
        );
      }
    }
  }

  redirect(){
    console.log('logout redirect');
    
    if(localStorage.getItem('token') == null){
      console.log('logout redirect 222');
      this.router.navigateByUrl('');
      return 1;
    }else{
      return 0;
    }
  }

}
