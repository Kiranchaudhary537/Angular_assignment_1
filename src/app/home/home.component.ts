import { Component, OnInit } from '@angular/core';
import { Employee } from './../employee.model';
import { EmployeeService } from './../employee.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  //variable
  employees: Employee[] = [];
  messageShow: boolean = false;
  modelShow: boolean = false;
  employeeName: string = '';
  employeeId: number = 0;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employees = this.employeeService.getEmployees();
  }

  //Function to change the visibility of the toast message
  changeToastVisibility(): void {
    this.messageShow = !this.messageShow;
    this.employeeName = '';
  }

  //Function to set visibility of the toast message after 2second
  timeOut(): void {
    setTimeout(() => {
      if (this.messageShow == true) {
        this.messageShow = false;
      }
    }, 2000);
  }

  //Function to set the visibility of the modal and get confirmation
  onDeleteConfirm(name: string, index: number): void {
    this.employeeName = name;
    this.employeeId = index;
    this.modelShow = true;
  }

  // cancel delete
  cancelDelete(): void {
    this.employeeName = '';
    this.employeeId = 0;
    this.modelShow = false;
  }
  
  // delete employee
  deleteEmployee(): void {
    this.messageShow = true;
    this.modelShow = false;
    this.employeeService.deleteEmployee(this.employeeId);
    this.employees = this.employees.filter(
      (employee) => employee.id !== this.employeeId
    );
    this.employeeId = 0;
    this.timeOut();
  }
}
