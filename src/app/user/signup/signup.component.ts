import { Component, OnInit } from '@angular/core';
import { ChatServiceService } from '../../chat-service.service';
import { ToastrService } from "../../../../node_modules/ngx-toastr";
import { Router } from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private chatSer: ChatServiceService, private toast: ToastrService, private _router: Router) { }

  public user_firstname: string;
  private user_lastname: string;
  private user_email: string;
  private user_password: string;
  private user_mobile_num: number;
  private user_apikey: string;

  private signInPage = () => {
    this._router.navigate(['/login']);
  }

  public signUp = () => {
    if (!this.user_firstname) {
      this.toast.warning('Enter First Name');
    }
    else if (!this.user_lastname) {
      this.toast.warning('Enter Last Name');
    }
    else if (!this.user_email) {
      this.toast.warning('Enter email');
    }
    else if (!this.user_mobile_num) {
      this.toast.warning('Enter mobile number');
    }
    else if (this.user_mobile_num.toString().length != 10) {
      console.log(this.user_mobile_num.toString().length);

      this.toast.warning('Mobile number should have 10 digits');
    }
    else if (!this.user_password) {
      this.toast.warning('Enter password');
    }
    else if (this.user_password.length < 8) {
      this.toast.warning('Password should have minimum 8 characters');
    }
    else if (!this.user_apikey) {
      this.toast.warning('Enter api key');
    }
    else {
      let userInfo = {
        firstname: this.user_firstname,
        lastname: this.user_lastname,
        email: this.user_email,
        password: this.user_password,
        mobile_num: this.user_mobile_num,
        apikey: this.user_apikey
      }
      this.chatSer.userSignup(userInfo).subscribe(
        data => {
          if (data['status'] == 200) {
            console.log("data", data['data'])
            this.toast.success('Success', 'You have signed up successfully');
            setTimeout(() => {
              this.signInPage();
            }, 2000);
          }
          else {
            // console.log('not 200',data['message']);
            this.toast.error(data['message']);
          }

        },
        error => {
          // console.log('err',error);
          this.toast.error(error.message)
        }
      );
    }

  }
  ngOnInit() {
    console.log("signup init called");

  }

}
