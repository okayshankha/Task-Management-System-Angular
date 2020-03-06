import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  loggedInAs:any = null;
  countries: any = null;
  errorMessage: any = null;
  addNewTaskForm: FormGroup;
  assignTaskForm: FormGroup;
  assignableManagerEmployeeList: any = null;
  assignableParentTaskList: any = null;
  assignableProjectList: any = null;
  assignTaskForm_emoloyeeList: any = null;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private api: ApiService
  ) { 
    this.loggedInAs = {
      fname : "",
      mname: "",
      lname: ""
    }
    this.fetchMeApi();
  }

  ngOnInit(): void {
    this.redirection();
    this.addNewTaskForm = this.fb.group({
      name: ['', [Validators.required]],
      project_id: ['', Validators.required],
      description: ['', Validators.required],
      //assigned_to_login_access_id: [''],
      estimated_hours: ['0', [Validators.required, Validators.pattern('^[0-9]+\d*$')]],
      //assignment_comment: [''],
      parent_task_details_id: [''],
    });

    this.assignTaskForm = this.fb.group({
      project_id: ['', Validators.required],
      task_id: ['', Validators.required],
      assigned_to_login_access_id: ['', Validators.required],
      assignment_comment: ['', Validators.required],

    });

    this.refreshList();

  }

  fetchMeApi(){
    let data = null;
    data = this.api.request('me', {});
    if (data['function_response'] == 'success') {
      data = data['server_response'];
      if (data != null) {
        data.subscribe(
          response => {
            //console.log(response);
            if (response.status == 'success') {
              this.loggedInAs = response.me;
              //console.log(this.loggedInAs);
            } else {
              //console.log(response);
              if (response.status == 'failed') {
                //this.errorMessage = response.info;
              }
            }
          },
          error => {
            //console.log(error.error);
            if (error.error.status == 'failed') {
              this.errorMessage = error.error.info;
            }
          }
        );
      }
    }
  }

  redirection() {
    if (!localStorage.getItem('token')) {
      this.router.navigateByUrl('');
    }
  }

  refreshList(){
    //console.log('yo refreshList');
    this.getAssignableParentTaskList();
    this.getAssignableProjectList();
    this.getAssignableManagerEmployeeList();
  }

  refineForm(callform = null) {
    if (callform) {
      switch (callform) {
        case 'project_id':
          if (this.addNewTaskForm.get('project_id').value != '') {
            this.addNewTaskForm.get('project_id').setValidators(Validators.required);
            this.addNewTaskForm.get('project_id').markAsTouched();

            this.addNewTaskForm.get('parent_task_details_id').setValue('');
            this.addNewTaskForm.get('parent_task_details_id').clearValidators();
            this.addNewTaskForm.get('parent_task_details_id').updateValueAndValidity();
          }
          break;
        case 'parent_task':
          if (this.addNewTaskForm.get('parent_task_details_id').value != '') {
            this.addNewTaskForm.get('parent_task_details_id').setValidators(Validators.required);
            this.addNewTaskForm.get('parent_task_details_id').markAsTouched();

            this.addNewTaskForm.get('project_id').setValue('');
            this.addNewTaskForm.get('project_id').clearValidators();
            this.addNewTaskForm.get('project_id').updateValueAndValidity();
            break;
          }
      }
    } else {
      if (this.addNewTaskForm.get('project_id').value != '') {
        this.addNewTaskForm.get('project_id').setValidators(Validators.required);
        this.addNewTaskForm.get('project_id').markAsTouched();

        this.addNewTaskForm.get('parent_task_details_id').setValue('');
        this.addNewTaskForm.get('parent_task_details_id').clearValidators();
        this.addNewTaskForm.get('parent_task_details_id').updateValueAndValidity();
      } else if (this.addNewTaskForm.get('parent_task_details_id').value != '') {
        this.addNewTaskForm.get('parent_task_details_id').setValidators(Validators.required);
        this.addNewTaskForm.get('parent_task_details_id').markAsTouched();

        this.addNewTaskForm.get('project_id').setValue('');
        this.addNewTaskForm.get('project_id').clearValidators();
        this.addNewTaskForm.get('project_id').updateValueAndValidity();
      }
    }

    //console.log('assigned_to_login_access_id  ' + this.addNewTaskForm.get('assigned_to_login_access_id').value);

    /*
    if (this.addNewTaskForm.get('assigned_to_login_access_id').value != '') {
      this.addNewTaskForm.get('assignment_comment').setValidators(Validators.required);
      this.addNewTaskForm.get('assignment_comment').updateValueAndValidity();
    } else {
      this.addNewTaskForm.get('assignment_comment').clearValidators();
      this.addNewTaskForm.get('assignment_comment').updateValueAndValidity();
    }

    */
  }

  addNewTaskSubmitCancel() {
    this.addNewTaskForm.reset();
    this.errorMessage = null;
  }

  addNewTaskSubmit() {
    this.errorMessage = null;
    this.addNewTaskForm.markAllAsTouched();
    if (!this.addNewTaskForm.valid) {
      return;
    }
    let data = null;
    data = this.api.request('createTask', this.addNewTaskForm.value);
    if (data['function_response'] == 'success') {
      data = data['server_response'];
      if (data != null) {
        data.subscribe(
          response => {
            //console.log(response);
            if (response.status == 'success') {
              this.errorMessage = null;
              document.getElementById('addNewTaskFormCancelBtn').click();
            } else {
              //console.log(response);
              if (response.status == 'failed') {
                this.errorMessage = response.info;
              }
            }
          },
          error => {
            //console.log(error.error);
            if (error.error.status == 'failed') {
              this.errorMessage = error.error.info;
            }
          }
        );
      }
    }
    this.refreshList();
  }

  assignTaskFormCancel() {
    this.assignTaskForm.reset();
    this.assignTaskForm_emoloyeeList = null;
    this.assignableProjectList = null;
    this.errorMessage = null;
  }

  assignTaskFormSubmit() {

    this.assignTaskForm.markAllAsTouched();
    if (!this.assignTaskForm.valid) {
      return;
    } else {
      let data = null;
      data = this.api.request('taskAssign', this.assignTaskForm.value);


      if (data['function_response'] == 'success') {

        data = data['server_response'];
        if (data != null) {
          data.subscribe(
            response => {
              if (response.status == 'success') {
                document.getElementById('taskAssignFormCancelBtn').click();
              } else {
                //console.log(response);
                if (response.status == 'failed') {
                  this.errorMessage = response.info;
                }
              }
            },
            error => {
              //console.log(error.error);
              if (error.error.status == 'failed') {
                this.errorMessage = error.error.info;
              }
            }
          );
        }
      }
    }
    
    this.refreshList();
  }


  onClickTaskAssignButton(project_id, task_id) {
    this.getProjectSpecificEmployees(project_id);
    this.assignTaskForm.get('task_id').setValue(task_id);
    this.assignTaskForm.get('task_id').updateValueAndValidity();
  }

  getProjectSpecificEmployees(project_id = null) {
    this.assignTaskForm.get('project_id').setValue(project_id);
    this.assignTaskForm.get('project_id').updateValueAndValidity();

    //console.log('getting ProjectSpecificEmployees');

    let data = null;
    data = this.api.request('allEmployeeWithFilter', { filterByField: 'project_id', filterValue: project_id });


    if (data['function_response'] == 'success') {

      data = data['server_response'];
      if (data != null) {
        data.subscribe(
          response => {
            //console.log(response);
            if (response.status == 'success') {
              //console.log('getAssignableParentTaskList ===>==>');
              //console.log(response);
              this.assignableProjectList = response.employees;
              this.assignTaskForm_emoloyeeList = this.assignableProjectList;

            } else {
              //console.log(response);
              if (response.status == 'failed') {
                this.errorMessage = response.info;
              }
            }
          },
          error => {
            //console.log(error.error);
            if (error.error.status == 'failed') {
              this.errorMessage = error.error.info;
            }
          }
        );
      }
    }
  }

  getAssignableProjectList() {
    let data = null;
    data = this.api.request('allProjects', {});
    if (data['function_response'] == 'success') {
      data = data['server_response'];
      if (data != null) {
        data.subscribe(
          response => {
            //console.log(response);
            if (response.status == 'success') {
              //console.log('getAssignableParentTaskList');

              this.assignableProjectList = response.projects;

            } else {
              //console.log(response);
              if (response.status == 'failed') {
                this.errorMessage = response.info;
              }
            }
          },
          error => {
            //console.log(error.error);
            if (error.error.status == 'failed') {
              this.errorMessage = error.error.info;
            }
          }
        );
      }
    }
  }

  getAssignableParentTaskList() {

    let data = null;
    data = this.api.request('allTask', {});
    if (data['function_response'] == 'success') {
      data = data['server_response'];
      if (data != null) {
        data.subscribe(
          response => {
            //console.log(response);
            if (response.status == 'success') {
              //console.log('getAssignableParentTaskList');

              this.assignableParentTaskList = response.tasks;

            } else {
              //console.log(response);
              if (response.status == 'failed') {
                this.errorMessage = response.info;
              }
            }
          },
          error => {
            //console.log(error.error);
            if (error.error.status == 'failed') {
              this.errorMessage = error.error.info;
            }
          }
        );
      }
    }
  }

  getAssignableManagerEmployeeList() {
    //console.log('getAssignableManagerEmployeeList');

    let data = null;
    data = this.api.request('allEmployee', {});
    if (data['function_response'] == 'success') {
      data = data['server_response'];
      if (data != null) {
        data.subscribe(
          response => {
            if (response.status == 'success') {
              this.assignableManagerEmployeeList = response.employees;
            } else {
              // console.log(response);
              if (response.status == 'failed') {
                this.errorMessage = response.info;
              }
            }
          },
          error => {
            // console.log(error.error);
            if (error.error.status == 'failed') {
              this.errorMessage = error.error.info;
            }
          }
        );
      }
    }
  }

}
