import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ChatServiceService } from "../../chat-service.service";
import { SocketService } from "../../socket.service";
import { CookieService } from 'ngx-cookie';
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css'],
  providers: [SocketService]
})
export class ChatWindowComponent implements OnInit {
  @ViewChild('scrollBar', { read: ElementRef, static: false })
  private scrollBar: ElementRef;
  private authToken;
  private userDetails;
  private username;
  private userId;
  private userList;
  private connDisconnected: boolean;
  private msgTextBox;
  private msgList = [];
  private scrollToTop: boolean = false;
  private receiverId;
  private receiverName;
  private pageValue = 0;
  private loadingPrevChat: boolean = false;

  constructor(private chatser: ChatServiceService, private socketser: SocketService, private cookieSer: CookieService, private _route: Router, private toast: ToastrService) {
    this.username = this.cookieSer.get('userName');
    this.userId = this.cookieSer.get('userId');
  }

  public checkStatus = () => {

    if (this.authToken == null || this.authToken == undefined || this.authToken == '') {
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
          let eachUserInfo = { 'userId': x, 'name': data[x], 'unreadMsgs': 0, 'chatStatus': false };
          this.userList.push(eachUserInfo)
        }
      },
      (err) => {
        this.socketser.errorHandler(err);
      });
    console.log('userlist in fn', this.userList);

  }

  //sending the message on hitting enter key
  public sendMsgUsingKeyPress = (event: KeyboardEvent) => {
    // if(event.keyCode === 13){
    //   this.sendMsg();
    // }
    if (event.key === 'Enter') {
      this.createMsg();
    }
  }

  public createMsg = () => {
    if (this.msgTextBox) {
      let msgObject =
      {
        senderName: `${this.userDetails.firstName} ${this.userDetails.lastName}`,
        senderId: this.userDetails.userId,
        receiverName: this.cookieSer.get('receiverName'),
        receiverId: this.cookieSer.get('receiverId'),
        message: this.msgTextBox,
        createdOn: new Date
      };
      this.socketser.sendChatMsg(msgObject);
      this.pushToChatWindow(msgObject);
    }
    else {
      this.toast.warning('Cannot send an empty message');
    }
  }

  public pushToChatWindow = (data) => {
    this.msgTextBox = ''
    this.msgList.push(data.message);
    this.scrollToTop = false;
  }

  public receiveMsgs = () => {
    this.socketser.receiveMsgs(this.userDetails.userId).subscribe(
      (msgObject) => {
        //receiverId of the person logged in user is chatting with
        this.receiverId === msgObject.senderId ? this.msgList.push(msgObject.message) : '';
        this.scrollToTop = false;
        this.toast.success(`You ahve recived a message from ${msgObject.senderName}`);
      },
      (err) => {
        this.socketser.errorHandler(err);
      });
  }

  //to set the receiver with whom user is chatting

  public userSelectedToChat = (receiverId, receiverName) => {
    this.userList.map((eachUser) => {
      if (eachUser.userId === receiverId) {
        eachUser.chatStatus = true;
      }
      else {
        eachUser.chatStatus = false;
      }
    });
    this.cookieSer.put('receiverId', receiverId);
    this.cookieSer.put('receiverName', receiverName);
    this.receiverId = receiverId;
    this.receiverName = receiverName;
    this.msgList = [];
    this.pageValue = 0;
    let chatIdDetailsObject = {
      userId: this.userDetails.userId,//user id of logged in user
      senderId: receiverId//user id of the other user with which logged in user wants to chat
    }
    this.socketser.markChatAsRead(chatIdDetailsObject);

  }

  public getPrevChatWithUser = () => {
    let previousChatMsgs = this.msgList.length > 0 ? this.msgList.slice() : [];
    this.socketser.getPrevChat(this.userDetails.userId, this.receiverId, this.pageValue * 10)
      .subscribe((response) => {
        if (response['status'] == 200) {
          this.msgList = response['data'].push(previousChatMsgs);
        }
        else {
          this.msgList = previousChatMsgs;
          this.toast.warning('No previous mesages available');
        }
        this.loadingPrevChat = false;
      },
        (err) => {
          this.socketser.errorHandler(err)
        })

  }

  public loadPrevChats = () => {
    this.loadingPrevChat = true;
    this.pageValue++;
    this.scrollToTop = true;
    this.getPrevChatWithUser();
  }

  public logout = () => {
    this.socketser.logout().subscribe(
      (response) => {
        if (response['status'] == 200) {
          console.log('logout called');
          this.cookieSer.remove('authToken');
          this.cookieSer.remove('receiverId');
          this.cookieSer.remove('receiverName');
          this.socketser.exitSocket();
          this._route.navigate(['/login']);
        }
        else {
          this.toast.error(response['message']);
        }
      },
      (err) => {
        this.socketser.errorHandler(err);
      }
    )
  }

  public showName=(name:string)=>{
    this.toast.success(`You are chatting with ${name}`);
  }

  ngOnInit() {
    this.authToken = this.cookieSer.get('authToken');
    this.userDetails = this.chatser.getLocalStorage('userDetails');
    this.receiverId = this.cookieSer.get('receiverId')
    this.receiverName = this.cookieSer.get('receiverName');
    if (this.receiverName != null || this.receiverId != undefined || this.receiverId != '') {
      this.userSelectedToChat(this.receiverId, this.receiverName);
    }
    this.checkStatus();
    this.verifyUserConfirmation();
    this.onlineUserList();
    this.receiveMsgs();
  }

}                                                                                               
