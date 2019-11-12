import { TestBed, async, inject } from '@angular/core/testing';

import { LoadMapsGuard } from './load-maps.guard';

describe('LoadMapsGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadMapsGuard]
    });
  });

  it('should ...', inject([LoadMapsGuard], (guard: LoadMapsGuard) => {
    expect(guard).toBeTruthy();
  }));
});
