import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EmployeeformComponent } from './employeeform/employeeform.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'add',
    component: EmployeeformComponent,
  },
  {
    path: 'edit/:id',
    component: EmployeeformComponent,
  },
];
