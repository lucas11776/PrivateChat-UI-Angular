import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatWindowInputComponent } from './chat-window-input.component';

describe('ChatWindowInputComponent', () => {
  let component: ChatWindowInputComponent;
  let fixture: ComponentFixture<ChatWindowInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatWindowInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatWindowInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
