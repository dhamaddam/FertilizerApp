import { TestBed } from '@angular/core/testing';

import { FaktorAlamAnomaliService } from './faktor-alam-anomali.service';

describe('FaktorAlamAnomaliService', () => {
  let service: FaktorAlamAnomaliService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FaktorAlamAnomaliService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
