import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  itemAdded= false;
  selectedtour;
  numberOfpassanger;
  numberOfAdults;
  numberOfChildern;
  bookedDateRange;
  totalAmout;
  rooms;
  startDate;
  endDate;
constructor() {

 }

}
