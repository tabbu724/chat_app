import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-first-char',
  templateUrl: './first-char.component.html',
  styleUrls: ['./first-char.component.css']
})
export class FirstCharComponent implements OnInit, OnChanges {

  @Output()
  notify = new EventEmitter()

  @Input() name;
  @Input() bgColor;
  @Input() textColor;
  public firstChar;
  public _name = ''
  constructor() { }

  ngOnInit() {
    this._name = this.name[0];
    this.firstChar = this._name
  }

  ngOnChanges(changes: SimpleChanges) {
    let name = changes.name
    this._name = name.currentValue;
    this.firstChar = this._name[0];

  }

  nameClicked() {
    this.notify.emit(this._name)
  }

}
