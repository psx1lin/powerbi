import { TestBed } from '@angular/core/testing';

import { ResidestService } from './residest.service';

describe('ResidestService', () => {
  let service: ResidestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResidestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
