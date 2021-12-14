import { TestBed } from '@angular/core/testing';

import { ChartGeneratorService } from './chart-generator.service';

describe('ChartGeneratorService', () => {
  let service: ChartGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChartGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
