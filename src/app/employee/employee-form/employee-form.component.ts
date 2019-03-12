import { Component, OnInit, Input, Inject, Output, EventEmitter } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms'
import {MAT_DIALOG_DATA} from '@angular/material'
import {Employee} from '../../employee'
@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
      @Input() employee: Employee;
      @Output() updateEmployee = new EventEmitter();
      employeeForm = new FormGroup({
      id: new FormControl(this.data.employee.id),
      firstName: new FormControl(this.data.employee.firstName, Validators.required),
      lastName: new FormControl(this.data.employee.lastName, Validators.required),
      position: new FormControl(this.data.employee.position, Validators.required),
      compensation: new FormControl(this.data.employee.compensation, Validators.required)
    })

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {}
  onSubmit() {
    this.updateEmployee.emit(this.employeeForm.value)
  }
}
