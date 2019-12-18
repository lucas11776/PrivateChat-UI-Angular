import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatWindowHeaderComponent } from './chat-window-header.component';

describe('ChatWindowHeaderComponent', () => {
  let component: ChatWindowHeaderComponent;
  let fixture: ComponentFixture<ChatWindowHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatWindowHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatWindowHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
