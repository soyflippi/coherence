import { TestBed } from '@angular/core/testing';

import { PropinaService } from './propina.service';

describe('PropinaService', () => {
  let service: PropinaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PropinaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
