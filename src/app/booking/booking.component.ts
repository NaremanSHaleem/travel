import { Component, OnInit } from '@angular/core';
import { GetBookingService } from 'src/assets/services/get-booking.service';
import { TokenCheckService } from 'src/assets/services/token-check.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  constructor(private getBooking: GetBookingService, private tokenchecker: TokenCheckService) { }
token;
booking=[];
Arr = Array;
  ngOnInit() {
    this.token = this.tokenchecker.token;
    this.getBooking.getBooking(this.tokenchecker.token).subscribe(
      (data)=>{this.booking= data['data']['orders'];console.log(this.booking)},
      (error)=>{console.log(error)}
    );

  }

}
