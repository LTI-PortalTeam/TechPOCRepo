import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  fullName: string = "Hello Neha"; 
  onSave($event){
    console.log("Save button is clicked!");    
  }  
}
