import { TestBed } from '@angular/core/testing';

import { ListdetalleService } from './listdetalle.service';

describe('ListdetalleService', () => {
  let service: ListdetalleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListdetalleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
