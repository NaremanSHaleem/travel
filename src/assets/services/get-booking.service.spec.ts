/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GetBookingService } from './get-booking.service';

describe('Service: GetBooking', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetBookingService]
    });
  });

  it('should ...', inject([GetBookingService], (service: GetBookingService) => {
    expect(service).toBeTruthy();
  }));
});
