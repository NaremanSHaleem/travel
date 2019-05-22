/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SelectTourService } from './select-tour.service';

describe('Service: SelectTour', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SelectTourService]
    });
  });

  it('should ...', inject([SelectTourService], (service: SelectTourService) => {
    expect(service).toBeTruthy();
  }));
});
