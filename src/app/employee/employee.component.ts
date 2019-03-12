import {Component,OnInit, Input, EventEmitter, Output} from '@angular/core';
import  {Observable} from 'rxjs';
import {MatDialog, MatDialogRef} from '@angular/material';
import {EmployeeFormComponent} from '../employee/employee-form/employee-form.component';
import {Employee} from '../employee';
import {EmployeeService} from '../employee.service'

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit{
  @Input() employee: Employee;
  @Input() totalReports: number;
  @Output() deleteEmployee = new EventEmitter();
  @Output() editEmployee = new EventEmitter();
  reportees: Array<Employee>;
  fileNameDialogRef: MatDialogRef<EmployeeFormComponent>;
  constructor(private employeeService:EmployeeService, private dialog: MatDialog) {
    this.totalReports = 0;
    this.reportees =[]
  } 
  ngOnInit(){
    this.setReports(this.employee)
  }
  setReports(employee: Employee){
    const indirectReports = (id) => {
      this.employeeService.get(id).subscribe(childEmployee => { 
        this.reportees.push(childEmployee)
        if(!childEmployee.directReports){return}
        this.totalReports += childEmployee.directReports.length
        childEmployee.directReports.forEach(id =>{
          indirectReports(id)
        })
      })
    }
    if (!employee.directReports){return}
    employee.directReports.forEach( id => {
      indirectReports(id)
      this.totalReports++
    })
    
  
  }
  letGo(employee) {
    if(confirm("Are you sure you want to delete "+ employee.firstName +" "+ employee.lastName +"?")){
      this.reportees=this.reportees.filter(function(emp){ return emp !=employee})
      this.deleteEmployee.emit(employee)
  }}
  openForm(employee){
    console.log("child")
    this.fileNameDialogRef = this.dialog.open(EmployeeFormComponent, {data:{
      Employee: employee}})
  }
}
