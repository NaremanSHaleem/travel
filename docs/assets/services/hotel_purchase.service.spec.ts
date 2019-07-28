/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Hotel_purchaseService } from './hotel_purchase.service';

describe('Service: Hotel_purchase', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Hotel_purchaseService]
    });
  });

  it('should ...', inject([Hotel_purchaseService], (service: Hotel_purchaseService) => {
    expect(service).toBeTruthy();
  }));
});
