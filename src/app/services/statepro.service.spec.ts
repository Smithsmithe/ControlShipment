import { TestBed } from '@angular/core/testing';

import { StateproService } from './statepro.service';

describe('StateproService', () => {
  let service: StateproService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StateproService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
