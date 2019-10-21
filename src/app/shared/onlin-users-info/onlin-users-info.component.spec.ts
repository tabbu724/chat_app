import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlinUsersInfoComponent } from './onlin-users-info.component';

describe('OnlinUsersInfoComponent', () => {
  let component: OnlinUsersInfoComponent;
  let fixture: ComponentFixture<OnlinUsersInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlinUsersInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlinUsersInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
