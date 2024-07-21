import { TestBed } from '@angular/core/testing';

import { TdpService } from './tdp.service';

describe('TdpService', () => {
  let service: TdpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TdpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
