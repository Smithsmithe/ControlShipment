import { TestBed } from '@angular/core/testing';

import { BuscadorpedidoService } from './buscadorpedido.service';

describe('BuscadorpedidoService', () => {
  let service: BuscadorpedidoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuscadorpedidoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
