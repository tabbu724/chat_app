import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatModule } from './chat/chat.module';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';

import { RouterModule } from "@angular/router";
import { LoginComponent } from './user/login/login.component';
import { ChatServiceService } from "./chat-service.service";
import { CookieModule } from "ngx-cookie";
import { SocketService } from "./socket.service";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChatModule,
    SharedModule,
    UserModule,
    CookieModule.forRoot(),
    RouterModule.forRoot([
      {path:'login',component:LoginComponent},
      {path:'**',component:LoginComponent},
      {path:'',redirectTo:'login',pathMatch:'full'}
    ])
  ],
  providers: [ChatServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
