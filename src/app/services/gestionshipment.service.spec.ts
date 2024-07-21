import { TestBed } from '@angular/core/testing';

import { GestionshipmentService } from './gestionshipment.service';

describe('GestionshipmentService', () => {
  let service: GestionshipmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionshipmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
