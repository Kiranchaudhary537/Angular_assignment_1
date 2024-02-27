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
  changeToastVisibility(): void {
    this.messageShow = !this.messageShow;
  }
  timeOut(): void {
    setTimeout(() => {
      if (this.messageShow == true) {
        this.messageShow = false;
      }
    }, 2000);
  }

  onDeleteConfirm(name: string, index: number): void {
    this.employeeName = name;
    this.employeeId = index;
    this.modelShow = true;
  }

  cancelDelete(): void {
    this.employeeName = '';
    this.employeeId = 0;
    this.modelShow = false;
  }
  deleteEmployee(): void {
    this.messageShow = true;
    this.modelShow=false;
    this.employeeService.deleteEmployee(this.employeeId);
    this.employees = this.employees.filter(
      (employee) => employee.id !== this.employeeId
    );
    this.employeeId=0;
    this.employeeName='';
    this.timeOut();
  }
}
