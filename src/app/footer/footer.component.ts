import { Component, OnInit } from '@angular/core';
import { TokenCheckService } from 'src/assets/services/token-check.service';
import { environment } from 'src/environments/environment';
import { NewsletterSubmissionService } from 'src/assets/services/newsletter-submission.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  urlPath = environment.urlPath;

  constructor(private tokenChecher: TokenCheckService, private newsletterSubmission: NewsletterSubmissionService) { }

  ngOnInit() {
  }
  newsLetterSubmit(email) {
    if (this.tokenChecher.token == null) {
      this.tokenChecher.requiredLogin = true;
      console.log('please login first');
      console.log(this.tokenChecher.requiredLogin);
    }
    else {
      console.log(this.tokenChecher.requiredLogin);
      this.newsletterSubmission.newsletterSubmit(email);
    } 

  }
}
