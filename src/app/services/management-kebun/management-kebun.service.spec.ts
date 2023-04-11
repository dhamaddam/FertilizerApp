import { TestBed } from '@angular/core/testing';

import { ManagementKebunService } from './management-kebun.service';

describe('ManagementKebunService', () => {
  let service: ManagementKebunService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagementKebunService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
