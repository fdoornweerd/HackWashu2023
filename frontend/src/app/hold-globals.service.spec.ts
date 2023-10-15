import { TestBed } from '@angular/core/testing';

import { HoldGlobalsService } from './hold-globals.service';

describe('HoldGlobalsService', () => {
  let service: HoldGlobalsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HoldGlobalsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
