import { TestBed } from '@angular/core/testing';

import { ListrutasService } from './listrutas.service';

describe('ListrutasService', () => {
  let service: ListrutasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListrutasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
