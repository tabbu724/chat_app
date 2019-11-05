import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { OnlinUsersInfoComponent } from './onlin-users-info/onlin-users-info.component';
import { FirstCharComponent } from './first-char/first-char.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [OnlinUsersInfoComponent, FirstCharComponent],
  imports: [
    CommonModule
  ],
  exports:[
    OnlinUsersInfoComponent,
    FirstCharComponent,
    CommonModule,
    FormsModule
  ]
})
export class SharedModule { }
