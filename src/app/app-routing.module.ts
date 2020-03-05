import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginRedirect } from './modules/auth/login-redirect.service';




const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
    //canLoad: [LoginRedirect],
  },
  /*
  {
    path: 'me/logout',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
    //canLoad: [LoginRedirect],
  },
  */
  {
    path: 'task',
    loadChildren: () => import('./modules/task/task.module').then(m => m.TaskModule),
    //canLoad: [AuthGaurd]
  },
  {
    path: '**',
    loadChildren: () => import('./modules/error/error.module').then(m => m.ErrorModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
