/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NewsletterSubmissionService } from './newsletter-submission.service';

describe('Service: NewsletterSubmission', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NewsletterSubmissionService]
    });
  });

  it('should ...', inject([NewsletterSubmissionService], (service: NewsletterSubmissionService) => {
    expect(service).toBeTruthy();
  }));
});
