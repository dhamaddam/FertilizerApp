import { TestBed } from '@angular/core/testing';

import { KeragaanTanahService } from './keragaan-tanah.service';

describe('KeragaanTanahService', () => {
  let service: KeragaanTanahService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeragaanTanahService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
