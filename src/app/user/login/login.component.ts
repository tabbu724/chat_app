import { Component, OnInit } from '@angular/core';
import { ChatServiceService } from "../../chat-service.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private user_email;
  private user_password;
  constructor(private chatser: ChatServiceService, private toastr: ToastrService, private _router: Router, private cookie: CookieService) { }

  private logIn = () => {
    let credentials = {
      "email": this.user_email,
      "password": this.user_password
    };
    if (!this.user_email) {
      return this.toastr.warning('email id missing')
    }
    else if (!this.user_password) {
      return this.toastr.warning('Password missing');
    }
    else {
      this.chatser.userLogin(credentials).subscribe(
        response => {
          if (response['status'] == 200) {
            this.chatser.setLocalStorage(response['data']['userDetails']);
            this.cookie.put('authToken', response['data']['authToken']);
            this.cookie.put('userId', response['data']['userDetails']['userId']);
            this.cookie.put('userName', `${response['data']['userDetails']['firstName']} ${response['data']['userDetails']['lastName']}`);
            console.log(response['data']);
            this.toastr.success('Login Successfull');
            setTimeout(() => {
              this._router.navigate(['/chatwindow']);
            }, 2000);
          }
          else {
            this.toastr.error('Response status is not 200', response['message']);
          }
        },
        error => {
          let message =this.chatser.handleError(error);
          if(message == "Http failure response for https://chatapi.edwisor.com/api/v1/users/login: 400 Bad Request")
          this.toastr.error('Either Email or password is incorrect');
        }
      );
    }

  }
  ngOnInit() {
  }

}
