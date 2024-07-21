import { TestBed } from '@angular/core/testing';

import { ListShipmentDetalleService } from './list-shipment-detalle.service';

describe('ListShipmentDetalleService', () => {
  let service: ListShipmentDetalleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListShipmentDetalleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
