/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TokenCheckService } from './token-check.service';

describe('Service: TokenCheck', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TokenCheckService]
    });
  });

  it('should ...', inject([TokenCheckService], (service: TokenCheckService) => {
    expect(service).toBeTruthy();
  }));
});
