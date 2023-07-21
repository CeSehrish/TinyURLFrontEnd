import { TestBed } from '@angular/core/testing';

import { TinyUrlAPIresponseService } from './tiny-url-apiresponse.service';

describe('TinyUrlAPIresponseService', () => {
  let service: TinyUrlAPIresponseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TinyUrlAPIresponseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
