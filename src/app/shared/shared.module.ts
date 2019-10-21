import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { OnlinUsersInfoComponent } from './onlin-users-info/onlin-users-info.component';
import { FirstCharComponent } from './first-char/first-char.component';


@NgModule({
  declarations: [OnlinUsersInfoComponent, FirstCharComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      
    ])
  ],
  exports:[
    OnlinUsersInfoComponent,
    FirstCharComponent
  ]
})
export class SharedModule { }
