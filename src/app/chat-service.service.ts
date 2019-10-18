import { Injectable } from '@angular/core';
import { Observable } from "../../node_modules/rxjs";
import { HttpErrorResponse, HttpClient, HttpParams } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {
  baseUrl = 'https://chatapi.edwisor.com/api/v1/';
  constructor(private http: HttpClient) {
    console.log("service const called");

  }

  userSignup = (data) => {
    const bodyParams = new HttpParams()
      .set('firstName', data.firstname)
      .set('lastName', data.lastname)
      .set('email', data.email)
      .set('password', data.password)
      .set('mobile', data.mobile_num)
      .set('apiKey', data.apikey);

    let response = this.http.post(this.baseUrl + 'users/signup', bodyParams);
    return response;
  }

  userLogin = (data) => {
    const bodyParams = new HttpParams()
      .set('email', data.email)
      .set('password', data.password);
    let response = this.http.post(`${this.baseUrl}users/login`, bodyParams);
    return response;
  }

  getLocalStorage = (userData) => {
    return localStorage.getItem(JSON.parse(userData));
  }

  setLocalStorage = (userData) => {
    localStorage.setItem('userDetails', JSON.stringify(userData));
  }

  public handleError=(err :HttpErrorResponse)=>{
    // console.log("handling errors");
    // console.log(err.message);
    // return Observable.throw(err.message);
    return err.message;
    
  }
}
