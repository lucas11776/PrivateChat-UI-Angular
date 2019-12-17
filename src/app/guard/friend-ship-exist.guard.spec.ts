import { TestBed, async, inject } from '@angular/core/testing';

import { FriendShipExistGuard } from './friend-ship-exist.guard';

describe('FriendShipExistGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FriendShipExistGuard]
    });
  });

  it('should ...', inject([FriendShipExistGuard], (guard: FriendShipExistGuard) => {
    expect(guard).toBeTruthy();
  }));
});
