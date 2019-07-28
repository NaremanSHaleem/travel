import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewsletterSubmissionService {

constructor() { }
newsletterSubmit(mail){
  console.log(mail);
}
}
