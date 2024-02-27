import { Injectable } from '@angular/core';
import { Employee } from '../employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  employees: Employee[] = [
    {
      id: 1,
      name: 'kiran',
      contactNumber: '987486985',
      email: 'kiranchaudhary43@gmail.com',
      gender: 'Male',
      skills: [
        {
          name: 'kiran',
          experience: 'beginner',
        },
      ],
    },
  ];

  constructor() {}

  getEmployees(): Employee[] {
    return this.employees;
  }

  getEmployeeById(id: number): Employee {
    const index = this.employees.findIndex((employee) => employee.id === id);
    return this.employees[index];
  }

  checkUser(id: number): boolean {
    return this.employees.some((employee) => employee.id === id);
  }

  addEmployee(data: any): void {
    this.employees.push(data);
  }

  editEmployee(id: number, newEmployee: Employee): void {
    const index = this.employees.findIndex((employee) => employee.id === id);
    if (index !== -1) {
      this.employees[index] = newEmployee;
    }
  }

  deleteEmployee(id: number): void {
    this.employees = this.employees.filter((employee) => employee.id !== id);
  }
}
