import { TestBed } from '@angular/core/testing';

import { CshipmentService } from './cshipment.service';

describe('CshipmentService', () => {
  let service: CshipmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CshipmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
