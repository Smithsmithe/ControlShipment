import { TestBed } from '@angular/core/testing';

import { ListcondService } from './listcond.service';

describe('ListcondService', () => {
  let service: ListcondService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListcondService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
