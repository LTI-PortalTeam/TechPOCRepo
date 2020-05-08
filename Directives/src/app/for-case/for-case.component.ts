import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-for-case',
  template:  `
  <div *ngFor="let color of colors; index as i">
  <h2>{{i}}{{color}}</h2>
  </div>

  `
   ,
  styles: []
})
export class ForCaseComponent implements OnInit {

  public colors = ["red","yellow","blue","green"];

  constructor() { }

  ngOnInit(): void {
  }

}
