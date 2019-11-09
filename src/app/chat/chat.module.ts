import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { RouterModule } from "@angular/router";
import { SharedModule } from '../shared/shared.module';
import { removeSpecialChar } from '../shared/remove-special-char/remove-special-char.pipe';
import { FormsModule } from '@angular/forms';
import { ChatrouteguardService } from "./chatrouteguard.service";


@NgModule({
  declarations: [ ChatWindowComponent,removeSpecialChar],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:'chatwindow',component:ChatWindowComponent,canActivate:[ChatrouteguardService]}
    ]),
    SharedModule,
    FormsModule
  ],
  providers:[ChatrouteguardService]
})
export class ChatModule { }
