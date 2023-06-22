import { TestBed } from '@angular/core/testing';

import { KeragaanTanamanService } from './keragaan-tanaman.service';

describe('KeragaanTanamanService', () => {
  let service: KeragaanTanamanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeragaanTanamanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
