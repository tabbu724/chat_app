import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { RouterModule } from "@angular/router";


@NgModule({
  declarations: [ ChatWindowComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:'chatwindow',component:ChatWindowComponent}
    ])
  ]
})
export class ChatModule { }
