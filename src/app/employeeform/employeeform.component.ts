import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
  FormArray,
} from '@angular/forms';
import { NgClass, Location, NgFor } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employeeform',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, NgFor],
  templateUrl: './employeeform.component.html',
  styleUrl: './employeeform.component.css',
})
export class EmployeeformComponent implements OnInit {
  // Variables
  employeeId: string | null = null;
  formType: string = 'Add';
  userExists: boolean = false;
  isReadonly: boolean = false;
  form: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    email: new FormControl(''),
    contactNumber: new FormControl(''),
    gender: new FormControl(''),
    skills: new FormGroup({
      name: new FormControl(''),
      experience: new FormControl(''),
    }),
  });
  employee: any = {
    id: '',
    name: '',
    email: '',
    contactNumber: '',
    gender: '',
    skills: [],
  };
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private location: Location
  ) {
    this.employeeId = this.route.snapshot.paramMap.get('id');
  }

  // Method to create a form group for existing skills
  existingSkills(emp: any): FormGroup {
    return this.formBuilder.group({
      name: [emp.name, Validators.required],
      experience: [emp.experience, Validators.required],
    });
  }

  //Init Method
  ngOnInit(): void {
    this.employeeId = this.route.snapshot.paramMap.get('id');
    this.initializeForm();
  }

  // Set employee data if employeeId is not null
  setEmployeeData(): void {
    if (this.employeeId != null) {
      this.employee = this.employeeService.getEmployeeById(
        parseInt(this.employeeId)
      );
    }
  }

  // Set form type based on employeeId
  setFormType(): void {
    this.formType = this.employeeId != null ? 'Edit' : 'Add';
  }

  // Set readonly property based on formType
  setReadOnly(): void {
    this.isReadonly = this.formType === 'Edit';
  }
  // Method to initialize the form
  initializeForm(): void {
    this.setEmployeeData();
    this.setFormType();
    this.setReadOnly();

    // add form control to skills form array
    let existingSkills: any = [];
    this.employee.skills.forEach((element: any) => {
      existingSkills.push(this.existingSkills(element));
    });

    if (this.employeeId == null) {
      existingSkills.push(this.newskills());
    }

    //set validation on form
    this.form = this.formBuilder.group({
      id: [this.employee.id, Validators.required],
      name: [this.employee.name, Validators.required],
      email: [this.employee.email, [Validators.required, Validators.email]],
      contactNumber: [
        this.employee.contactNumber,
        [Validators.required, Validators.pattern('^[0-9]{10}$')],
      ],
      gender: [this.employee.gender, Validators.required],
      skills: this.formBuilder.array(existingSkills),
    });

    console.log(this.form);
  }

  // Getter for form controls
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  // Getter for skills form array
  skillsdata(): FormArray {
    return this.form.get('skills') as FormArray;
  }

  // Method to create a new skills form group
  newskills(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
      experience: ['', Validators.required],
    });
  }

  // Method to get a specific skills form group
  skillscon(index: any) {
    const skillsList = this.form.get('skills') as FormArray;
    const formGroup = skillsList.controls[index] as FormGroup;
    return formGroup;
  }

  // Method to add a new skills form group
  addSkills() {
    this.skillsdata().push(this.newskills());
  }

  // Method to remove a skills form group
  removeSkills(index: number) {
    this.skillsdata().removeAt(index);
  }

  // Method to handle form submission
  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
  //check for employeeId
    if (this.employeeId != null) {
      this.employeeService.editEmployee(
        parseInt(this.employeeId),
        this.form.value
      );
    } else {
      // Check if the user already exists
      if (this.employeeService.checkUser(this.form.value.id)) {
        this.userExists = true;
        return;
      }
      //add employee
      this.employeeService.addEmployee(this.form.value);
    }
    this.location.back();
  }

  // Method to reset the form
  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
}
