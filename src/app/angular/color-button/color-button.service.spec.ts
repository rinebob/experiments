import { TestBed } from '@angular/core/testing';

import { ColorButtonService } from './color-button.service';

describe('ColorButtonService', () => {
  let service: ColorButtonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColorButtonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
