import { Component, OnInit } from '@angular/core';
import { CheckoutService } from 'src/assets/services/checkout.service';
import { TokenCheckService } from 'src/assets/services/token-check.service';

@Component({
  selector: 'app-order-finished',
  templateUrl: './order-finished.component.html',
  styleUrls: ['./order-finished.component.css']
})
export class OrderFinishedComponent implements OnInit {

  user;
  constructor(private tokencheckoutservice: TokenCheckService) { }

  ngOnInit() {
    this.user = this.tokencheckoutservice.Userdata;
    console.log(this.user);
  }

}
