import {Component,OnInit, Input} from '@angular/core';
import  {Observable, from} from 'rxjs';
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
  @Input() reportees: Array<Employee>;
  constructor(private employeeService:EmployeeService) {
    this.totalReports = 0;
    this.reportees=[]
  } 
  ngOnInit(){
    this.setReports(this.employee)
    console.log(this.reportees)
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
    //  (this.employeeService.get(id)).subscribe({
    //    next(response) { console.log(response);
    //      return response}
    //  })
      indirectReports(id)
      this.totalReports++
    })
    
  
  }
  letGo(id) {
    if(confirm("Are you sure you would like to let them go?")){
    this.employeeService.remove(id)
    console.log('the individual has been removed')
  }}
}
