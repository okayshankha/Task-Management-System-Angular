import { Injectable } from '@angular/core';
import { CanLoad, Route } from '@angular/router';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
 
export class LoginRedirect implements CanLoad {

  constructor(private router: Router) { }

  canLoad(route: Route) {
    console.log('LoginRedirect Token Found' + (localStorage.getItem('token') != null));
    if(0){
      return true;
    }else{
      return false;
    }
    
  }
}
