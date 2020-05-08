import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  template: `
  // <div  *ngIf ="displayName; then thenBlock; else elseBlock"></div>
  //  <ng-template #thenBlock>

  //  <h2 > 
  //  Structural Directives 
  //  </h2>
  // </ng-template>

  //  <ng-template #elseBlock>
  //  <h2>
  //  Name is Hidden
  //  </h2>
  //  </ng-template> 

  <div [ngSwitch]="color">
  <div *ngSwitchCase="'red'">You picked color Red</div>
  <div *ngSwitchCase="'blue'">You picked color Blue</div>
  <div *ngSwitchCase="'green'">You picked color Green</div>
  <div *ngSwitchCase="'yellow'">You picked color Yellow</div>
  <div *ngSwitchDefault>Pick again</div>
   
  </div>



  `,
  styles: [ ]
})
export class TestComponent implements OnInit {

  displayName = true;
  public color="black";

  constructor() { }

  ngOnInit(): void {
  }

}
