import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { RouterModule } from "@angular/router";
import { SharedModule } from '../shared/shared.module';
import { removeSpecialChar } from '../shared/remove-special-char/remove-special-char.pipe';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ ChatWindowComponent,removeSpecialChar],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:'chatwindow',component:ChatWindowComponent}
    ]),
    SharedModule,
    FormsModule
  ]
})
export class ChatModule { }
