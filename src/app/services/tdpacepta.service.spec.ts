import { TestBed } from '@angular/core/testing';

import { TdpaceptaService } from './tdpacepta.service';

describe('TdpaceptaService', () => {
  let service: TdpaceptaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TdpaceptaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
