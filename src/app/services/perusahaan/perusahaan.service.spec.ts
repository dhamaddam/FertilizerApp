import { TestBed } from '@angular/core/testing';

import { PerusahaanService } from './perusahaan.service';

describe('PerusahaanService', () => {
  let service: PerusahaanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerusahaanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
