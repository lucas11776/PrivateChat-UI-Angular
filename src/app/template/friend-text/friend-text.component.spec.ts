import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendTextComponent } from './friend-text.component';

describe('FriendTextComponent', () => {
  let component: FriendTextComponent;
  let fixture: ComponentFixture<FriendTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
