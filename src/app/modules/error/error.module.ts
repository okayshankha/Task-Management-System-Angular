import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Page404Component } from './page404/page404.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: Page404Component,
  },
  {
    path: '404',
    component: Page404Component,
  },
];

@NgModule({
  declarations: [Page404Component],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class ErrorModule { }
