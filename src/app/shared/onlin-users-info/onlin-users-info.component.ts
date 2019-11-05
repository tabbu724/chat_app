import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-onlin-users-info',
  templateUrl: './onlin-users-info.component.html',
  styleUrls: ['./onlin-users-info.component.css']
})
export class OnlinUsersInfoComponent implements OnInit {
  @Input() firstName;
  @Input() lastName;
  @Input() chatStatus;
  @Input() msgRead;
public firstChar;
  constructor() { }

  ngOnInit() {
    this.firstChar=this.firstName[0];
  }

}

