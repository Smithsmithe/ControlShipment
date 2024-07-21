import { TestBed } from '@angular/core/testing';

import { BuscaPedidoDetalleService } from './busca-pedido-detalle.service';

describe('BuscaPedidoDetalleService', () => {
  let service: BuscaPedidoDetalleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuscaPedidoDetalleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
