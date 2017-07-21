import { TestBed, async, inject } from '@angular/core/testing';

import { ValiduserGuard } from './validuser.guard';

describe('ValiduserGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValiduserGuard]
    });
  });

  it('should ...', inject([ValiduserGuard], (guard: ValiduserGuard) => {
    expect(guard).toBeTruthy();
  }));
});
