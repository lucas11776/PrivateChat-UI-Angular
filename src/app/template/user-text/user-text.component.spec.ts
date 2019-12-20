import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTextComponent } from './user-text.component';

describe('UserTextComponent', () => {
  let component: UserTextComponent;
  let fixture: ComponentFixture<UserTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
