import { Component, OnInit, Input,Output,  EventEmitter } from '@angular/core';

@Component({
  selector: 'app-component-interaction',
  template: `
  
  <h2>{{"Hello " + name}}</h2>
  <button (click) ="fireEvent()">Send Event</button>
  `,
  styleUrls: []
})
export class ComponentInteractionComponent implements OnInit {
 
 @Input('parentData') public name;
 @Output() public childEvent= new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  fireEvent(){
    this.childEvent.emit('This is an Angular App');
  }
}
