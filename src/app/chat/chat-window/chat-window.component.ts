import { Component, OnInit } from '@angular/core';
import { ChatServiceService } from "../../chat-service.service";
import { SocketService } from "../../socket.service";
import { CookieService } from 'ngx-cookie';
import { Router } from "@angular/router";

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css'],
  providers: [SocketService]
})
export class ChatWindowComponent implements OnInit {
  private authToken;
  private userDetails;
  private username;
  private userId;
  public userList;
  private connDisconnected: boolean;
  constructor(private chatser: ChatServiceService, private socketser: SocketService, private cookieSer: CookieService, private _route: Router) { 
    this.username=this.cookieSer.get('userName');
    this.userId=this.cookieSer.get('userId');
  }

  public checkStatus = () => {

    if (this.authToken == null || this.authToken ==undefined || this.authToken =='') {
      this._route.navigate(['/login']);
      return false;
    }
    else {
      return true;
    }
  }

  public verifyUserConfirmation = () => {
    this.socketser.verifyUser().subscribe(
      (data) => {
        this.connDisconnected = false;
        this.socketser.setUser(this.authToken);
        this.onlineUserList();
      },
      (err) => {
        this.socketser.errorHandler(err);
      }
    )
  }


  public onlineUserList = () => {
    this.socketser.onlineUserList().subscribe(
      (data) => {
        this.userList = [];
        for (let x in data) {
          let eachUserInfo = { 'userId': x, 'name': data[x], 'unreadMsgs': 0 ,'chatStatus':false};
          this.userList.push(eachUserInfo)
        }
      },
      (err) => {
        this.socketser.errorHandler(err);
      });
      console.log('userlist in fn',this.userList);
      
  }

  ngOnInit() {
    this.authToken = this.cookieSer.get('authToken');
    this.userDetails = this.chatser.getLocalStorage('userDetails');  
    // this.userList = [];                                                                                                                                                                                                                                                                                                                                                                                                                                                       
    this.checkStatus();
    this.verifyUserConfirmation();
    // console.log('userlist at end',this.userList);
    
  }

}                                                                                               
