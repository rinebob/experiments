import { TestBed } from '@angular/core/testing';

import { BlackScholesService } from './black-scholes.service';

describe('BlackScholesService', () => {
  let service: BlackScholesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlackScholesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
