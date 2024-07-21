import { TestBed } from '@angular/core/testing';

import { RoluserService } from './roluser.service';

describe('RoluserService', () => {
  let service: RoluserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoluserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
