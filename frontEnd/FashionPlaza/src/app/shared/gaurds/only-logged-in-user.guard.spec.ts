import { TestBed, async, inject } from '@angular/core/testing';

import { OnlyLoggedInUserGuard } from './only-logged-in-user.guard';

describe('OnlyLoggedInUserGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OnlyLoggedInUserGuard]
    });
  });

  it('should ...', inject([OnlyLoggedInUserGuard], (guard: OnlyLoggedInUserGuard) => {
    expect(guard).toBeTruthy();
  }));
});
