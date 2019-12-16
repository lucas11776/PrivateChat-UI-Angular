import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsWindowComponent } from './friends-window.component';

describe('FriendsWindowComponent', () => {
  let component: FriendsWindowComponent;
  let fixture: ComponentFixture<FriendsWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendsWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
