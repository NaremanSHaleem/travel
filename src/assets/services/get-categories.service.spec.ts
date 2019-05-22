/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GetCategoriesService } from './get-categories.service';

describe('Service: GetCategories', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetCategoriesService]
    });
  });

  it('should ...', inject([GetCategoriesService], (service: GetCategoriesService) => {
    expect(service).toBeTruthy();
  }));
});
