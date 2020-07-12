import { TestBed } from '@angular/core/testing';

import { ListaEsperaService } from './lista-espera.service';

describe('ListaEsperaService', () => {
  let service: ListaEsperaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaEsperaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
