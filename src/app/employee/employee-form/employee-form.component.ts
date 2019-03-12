import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms'
import {Employee} from '../../employee'
@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
    employeeForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      position: new FormControl(''),
      compensation: new FormControl('')
    })

  constructor() { }

  ngOnInit() {
  }
  onSubmit() {
    
  }
}
