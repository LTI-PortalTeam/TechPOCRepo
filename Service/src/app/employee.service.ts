import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor() { }

  getEmployees(){
    return[
      { "id": 1, "name": "Andy", "age": 30 },
      { "id": 2, "name": "Jonas", "age": 25 },
      { "id": 3, "name": "Martha", "age": 18 },
      { "id": 4, "name": "Mikkel", "age": 35 },
      { "id": 5, "name": "Olef", "age": 45 }
    ];
  

    
  }
}
