import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Pipe';
  todaydate = new Date(); 
  
   jsonval = {"confirmed":{"value":3207248,"detail":"https://covid19.mathdro.id/api/confirmed"}};

   months = ["Jan", "Feb", "Mar", "April", "May", "Jun", "July", "Aug", 
      "Sept", "Oct", "Nov", "Dec"]; 
}
