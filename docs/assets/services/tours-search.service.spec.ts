/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ToursSearchService } from './tours-search.service';

describe('Service: ToursSearch', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToursSearchService]
    });
  });

  it('should ...', inject([ToursSearchService], (service: ToursSearchService) => {
    expect(service).toBeTruthy();
  }));
});
