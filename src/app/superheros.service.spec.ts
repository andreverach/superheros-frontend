import { TestBed } from '@angular/core/testing';

import { SuperherosService } from './superheros.service';

describe('SuperherosService', () => {
  let service: SuperherosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuperherosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
