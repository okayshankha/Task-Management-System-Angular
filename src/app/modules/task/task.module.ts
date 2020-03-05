import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTaskComponent } from './create-task/create-task.component';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: CreateTaskComponent,
  },
  {
    path: 'assign',
    component: null,
  }
];

@NgModule({
  declarations: [CreateTaskComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    ApiService,
  ]
})
export class TaskModule { }
