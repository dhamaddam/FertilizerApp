import { TestBed } from '@angular/core/testing';

import { KondisiLahanService } from './kondisi-lahan.service';

describe('KondisiLahanService', () => {
  let service: KondisiLahanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KondisiLahanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
