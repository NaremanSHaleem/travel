/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HomeSearchService } from './homeSearch.service';

describe('Service: HomeSearch', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HomeSearchService]
    });
  });

  it('should ...', inject([HomeSearchService], (service: HomeSearchService) => {
    expect(service).toBeTruthy();
  }));
});
