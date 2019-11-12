import { TestBed } from '@angular/core/testing';

import { MapsLoaderService } from './maps-loader.service';

describe('MapsLoaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MapsLoaderService = TestBed.get(MapsLoaderService);
    expect(service).toBeTruthy();
  });
});
