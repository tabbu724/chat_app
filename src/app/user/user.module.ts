import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CookieModule } from "ngx-cookie";

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CookieModule.forChild(),
    ToastrModule.forRoot(),
    RouterModule.forChild([
      {path:'signup',component:SignupComponent}
    ])
  ]
})
export class UserModule { }
