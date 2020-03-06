import { Injectable } from '@angular/core';
import { CanLoad, Route } from '@angular/router';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthGaurd implements CanLoad {

  constructor(private router: Router) { }

  canLoad(route: Route) {
    console.log('LoginRedirect Token Found' + (localStorage.getItem('token') == null));
    if (localStorage.getItem('token') == null) {
      this.router.navigate(['']);
      console.log('Didn\'t got the token');
      return false;
    }
    console.log('Got the token');
    return true;
  }
}