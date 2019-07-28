/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GetDestinationsService } from './get-destinations.service';

describe('Service: GetDestinations', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetDestinationsService]
    });
  });

  it('should ...', inject([GetDestinationsService], (service: GetDestinationsService) => {
    expect(service).toBeTruthy();
  }));
});
