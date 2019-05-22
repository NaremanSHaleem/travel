/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HotelsSearchService } from './hotels-search.service';

describe('Service: HotelsSearch', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HotelsSearchService]
    });
  });

  it('should ...', inject([HotelsSearchService], (service: HotelsSearchService) => {
    expect(service).toBeTruthy();
  }));
});
