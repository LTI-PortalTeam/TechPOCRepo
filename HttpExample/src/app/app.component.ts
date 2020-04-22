import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedServices } from './shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ SharedServices ]
})
export class AppComponent implements OnInit {

  ecampDtls: any;
  title: any;
  confirmed:any

  constructor(private route: Router, private service: SharedServices) { }

  ngOnInit(): void {
    
  }


  getData() {
    this.service.getHttpRequest('api').subscribe((res) => {
          console.log(res);
    });
  }
}
