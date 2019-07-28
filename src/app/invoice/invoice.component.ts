import { Component, OnInit } from '@angular/core';
import { Hotel_purchaseService } from 'src/assets/services/hotel_purchase.service';
import { TokenCheckService } from 'src/assets/services/token-check.service';
import { CheckoutService } from 'src/assets/services/checkout.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  urlPath = environment.urlPath;
  user;
  today= Date.now();
  paymentInfo;
  cardType;
  roomType;
  boardType;
  numberOfPassangers;
  roomPrice;
  Total;
  bookedhotel;
  checkIn;
  checkOut;
  destination;
  Arr=Array;
  constructor(private purchaseservice: Hotel_purchaseService,
              private tokencheckoutservice: TokenCheckService,
              private checkoutservice: CheckoutService) { }

  ngOnInit() {
    this.paymentInfo = this.purchaseservice.paymentInfo;
    this.user = this.tokencheckoutservice.Userdata;
    this.bookedhotel = this.checkoutservice.selectedhotel;
    this.numberOfPassangers = this.checkoutservice.numberOfpassanger;
    this.roomPrice = this.checkoutservice.selectedRoomPrice;
    this.roomType = this.checkoutservice.selectedRoomDetails;
    this.boardType = this.checkoutservice.selectedBoardDetails;
    this.Total= this.numberOfPassangers*this.roomPrice;
    this.checkIn = this.checkoutservice.startDate;
    this.checkOut = this.checkoutservice.endDate;
    this.destination = this.checkoutservice.countryName;
    if (this.paymentInfo.card_type == 'V') {
      this.cardType = 'Visa'
    } else this.cardType = 'Master Card'
    console.log(this.paymentInfo);
    console.log(this.user);
    console.log(this.bookedhotel);
    console.log(this.numberOfPassangers);
    console.log(this.roomType);
    console.log(this.boardType);
    console.log(this.roomPrice);
    console.log(this.Total);
    console.log(this.cardType);
    console.log(this.today);
  }

}
