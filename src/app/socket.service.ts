import { Injectable } from '@angular/core';
import io from "socket.io-client";
import { Observable } from "rxjs";
import { HttpErrorResponse ,HttpClient} from '@angular/common/http';
import { CookieService } from "ngx-cookie";

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private url = 'https://chatapi.edwisor.com';
  private socket;
  constructor(private http:HttpClient,private cookie:CookieService) {
    // initial connection setup through handshake
    this.socket = io(this.url);
  }

  // events to listen

  public verifyUser = () => {
    return Observable.create((observer) => {
      this.socket.on('verifyUser', (tokenData) => {
        observer.next(tokenData);
      });//end socket
    });//end observable
  }//end verifyUser

  public onlineUserList = () => {
    return Observable.create((observer) => {
      this.socket.on('online-user-list', (userData) => {
        observer.next(userData);
      });//end socket
    });//end observable
  }//end onlineUserList

  public disconnect = () => {
    return Observable.create((observer) => {
      this.socket.on('disconnect', () => {
        observer.next();
      });
    });
  }

  public receiveMsgs = (receiverUserId) => {
    return Observable.create((observer) => {
      this.socket.on(receiverUserId, (receivedMsgObject) => {
        observer.next(receivedMsgObject);
      });
    });
  }

  // events to emit

  public setUser = (authToken) => {
    this.socket.emit('set-user', authToken);
  }

  public sendChatMsg = (chatMsgObject) => {
    this.socket.emit('chat-msg', chatMsgObject);
  }


  public markChatAsRead=(chatDetailsObject)=>{
this.socket.emit('mark-chat-as-seen',chatDetailsObject);
  }

  public exitSocket=()=>{
    this.socket.disconnect();
  }

// api requests

public getPrevChat=(senderId,receiverId,skip)=>{
  return this.http.get(`${this.url}/api/v1/chat/get/for/user`,
  {params:{senderId:senderId,receiverId:receiverId,skip:skip,authToken:this.cookie.get('authToken')}});

}

public logout=()=>{
  return this.http.post(`${this.url}/api/v1/users/logout?authToken=
  ${this.cookie.get('authToken')}`,{'userId':this.cookie.get('userId')});
}

  //error handler

  public errorHandler = (err: HttpErrorResponse) => {
    let errMessage = '';
    if (err.error instanceof Error) {
      errMessage = `An error occurred ${err.error.message}`;
    }
    else {
      errMessage = `Server returned the code: ${err.status} with error mesaage : ${err.message}`;
    }
    console.error(errMessage);
    return Observable.throw(errMessage);
  }//end error handler


}

