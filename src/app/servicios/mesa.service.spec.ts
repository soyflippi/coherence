import { TestBed } from '@angular/core/testing';

import { MesaService } from './mesa.service';

describe('MesaService', () => {
  let service: MesaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MesaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
