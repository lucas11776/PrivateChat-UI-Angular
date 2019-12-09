import { TestBed, async, inject } from '@angular/core/testing';

import { LoggedoutGuard } from './loggedout.guard';

describe('LoggedoutGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoggedoutGuard]
    });
  });

  it('should ...', inject([LoggedoutGuard], (guard: LoggedoutGuard) => {
    expect(guard).toBeTruthy();
  }));
});
