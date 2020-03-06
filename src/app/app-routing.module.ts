import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginRedirect } from './modules/auth/login-redirect.service';
import { AuthGaurd } from './modules/auth/auth-gaurd.service';
import { TaskComponent } from './components/task/task.component';





const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
    //canLoad: [LoginRedirect],
  },
  {
    path: 'task',
    component: TaskComponent,
    canLoad: [AuthGaurd]
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
