import { Injectable } from '@angular/core';
import io from "socket.io-client";
import { Observable } from "rxjs";
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private url = 'https://chatapi.edwisor.com';
  private socket;
  constructor() {
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


  // events to emit

  public setUser = (authToken) => {
    this.socket.emit('set-user', authToken)
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

