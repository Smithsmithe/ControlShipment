import { TestBed } from '@angular/core/testing';

import { ListShipmentService } from './list-shipment.service';

describe('ListShipmentService', () => {
  let service: ListShipmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListShipmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
