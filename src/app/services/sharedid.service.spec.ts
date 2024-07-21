import { TestBed } from '@angular/core/testing';

import { SharedidService } from './sharedid.service';

describe('SharedidService', () => {
  let service: SharedidService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedidService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
