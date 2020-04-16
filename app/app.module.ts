import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

// import { BrowserModule } from '@angular/platform-browser';
// import { NgModule } from '@angular/core';
// import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// import { AppComponent } from './app.component';
// import { SimpleFormComponent } from './simple-form/simple-form.component';
// //import { TemplateDrivenFormComponent } from './template-driven-form/template-driven-form.component';//
// import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
// //import { ArrayFormComponent } from './array-form/array-form.component';
// @NgModule({
//   declarations: [
//     AppComponent,
//     SimpleFormComponent,
//    // TemplateDrivenFormComponent,
//     ReactiveFormComponent,
//     //ArrayFormComponent
//   ],
//   imports: [
//     BrowserModule,
//     FormsModule,
//     ReactiveFormsModule
//   ],
//   providers: [],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }
