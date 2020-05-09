import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  template: `<h2>{{name}}</h2>
  <h2>{{name| uppercase}}</h2> 
   <h2>{{name| uppercase}}</h2>
   <h2>{{message| titlecase}}</h2>
   <h2>{{name| slice:2:4}}</h2>
   <h2>{{person| json}}</h2>


   <h2> {{5.678 | number:'1.2-3'}}</h2>
   <h2> {{5.678 | number:'3.4-5'}}</h2>
   <h2> {{5.678 | number:'3.1-2'}}</h2>

   <h2>{{0.25|percent}}</h2>

   <h2>{{0.25|currency: 'GBP'}}</h2>
   <h2>{{0.25|currency}}</h2>
   <h2>{{0.25|currency: 'GBP' : 'code'}}</h2>
   <h2>{{0.25|currency: 'EUR'}}</h2>



   
   <h2>{{date}}</h2>
   <h2>{{date | date: 'medium'}}</h2>
   <h2>{{date | date: 'mediumDate'}}</h2>
   <h2>{{date | date: 'mediumTime'}}</h2>




   <h2>{{date}}</h2>
   <h2>{{date | date: 'long'}}</h2>
   <h2>{{date | date: 'longDate'}}</h2>
   <h2>{{date | date: 'longTime'}}</h2>






    
   `,
   
   
   

  styles: []
})
export class TestComponent implements OnInit {

  public name = "Pipes";
  public message = "This is the first app on Pipes";
  public person = {
    "firstName" : "Ramola",
    "lastName"  : "Vats"
  }
  public date=new Date();
  constructor() { }

  ngOnInit(): void {
  }

}
