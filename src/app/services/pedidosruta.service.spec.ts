import { TestBed } from '@angular/core/testing';

import { PedidosrutaService } from './pedidosruta.service';

describe('PedidosrutaService', () => {
  let service: PedidosrutaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PedidosrutaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
