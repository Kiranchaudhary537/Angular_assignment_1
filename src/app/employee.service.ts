import { Injectable } from '@angular/core';
import { Employee } from '../employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  employees: Employee[] = [
    // {
    //   id: 1,
    //   name: 'kiran',
    //   contactNumber: '9874868985',
    //   email: 'kiranchaudhary43@gmail.com',
    //   gender: 'Male',
    //   skills: [
    //     {
    //       name: 'js',
    //       experience: '1years',
    //     },
    //     {
    //       name: 'jads',
    //       experience: '2years',
    //     },
    //   ],
    // },
  ];

  constructor() {}

  //get all employees
  getEmployees(): Employee[] {
    return this.employees;
  }

  //get employee by id
  getEmployeeById(id: number): Employee {
    const index = this.employees.findIndex((employee) => employee.id === id);
    return this.employees[index];
  }

  //check any user exist with same id
  checkUser(id: number): boolean {
    return this.employees.some((employee) => employee.id === id);
  }

  //add employee
  addEmployee(data: any): void {
    this.employees.push(data);
  }

  //edit emloyee details
  editEmployee(id: number, newEmployee: Employee): void {
    const index = this.employees.findIndex((employee) => employee.id === id);
    if (index !== -1) {
      this.employees[index] = newEmployee;
    }
  }
 
  //delete employee
  deleteEmployee(id: number): void {
    this.employees = this.employees.filter((employee) => employee.id !== id);
  }
}
