/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GetHotelService } from './get-hotel.service';

describe('Service: GetHotel', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetHotelService]
    });
  });

  it('should ...', inject([GetHotelService], (service: GetHotelService) => {
    expect(service).toBeTruthy();
  }));
});
