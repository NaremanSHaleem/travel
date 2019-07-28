import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  itemAdded= false;
  selectedhotel;
  countryName;
  numberOfpassanger;
  numberOfAdults;
  numberOfChildern;
  bookedDateRange;
  numberofnights;
  totalAmout;
  rooms;
  selectedRoomPrice;
  selectedRoomDetails;
  selectedBoardDetails;
  startDate;
  endDate;
constructor() {

 }

}
