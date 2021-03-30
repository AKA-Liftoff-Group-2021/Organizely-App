import { TestBed } from '@angular/core/testing';

import { DataBaseAPIService } from './data-base-api.service';

describe('DataBaseAPIService', () => {
  let service: DataBaseAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataBaseAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
