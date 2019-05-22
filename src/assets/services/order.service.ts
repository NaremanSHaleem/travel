import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { TokenCheckService } from './token-check.service';
import { CheckoutService } from './checkout.service';
import {formatDate} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  orderApi= 'https://tailored-travel-api-prod.herokuapp.com/orders/create';

constructor(public http: HttpClient, private tokencheckservice: TokenCheckService, private checkoutservice: CheckoutService) { }

order(passangers){
  console.log('purchasing service', passangers);
  let adults = passangers.value.AdultsPassengers;
  let children = passangers.value.ChildernPassengers;
  let token = this.tokencheckservice.token;
  let tour_id = this.checkoutservice.selectedtour['_id'];
  let book_date = this.checkoutservice.bookedDateRange;
  let total_amount = this.checkoutservice.numberOfpassanger*this.checkoutservice.selectedtour.Item.Tour.price;
  let now = formatDate(new Date(), 'yyyy/MM/dd', 'en');

  // tourdetails.Item.Tour.price*numberOfPassangers
  // let allpassangers = [];



  adults.map((obj) => {
    obj.pax_type = "ADT";
    return obj;
  })
  children.map((obj) => {
    obj.pax_type = "CHD";
    return obj;
  })

  // allpassangers.push(adults);
  // allpassangers.push(children);
  let orderObj = {
    "tour_id": tour_id,
    "book_date": book_date,
    "passengers":  [{
      "adults": adults,
      "childern": children
    }]
  }
  
  const headers = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': "Bearer " + token
  });

  const params = new HttpParams()
  .set('status', 'processed')
  .set('order_date', now)
  .set('folder_number', '0')
  .set('type', 'Tour')
  .set('payment_gateway', 'stripe')
  .set('order_data', JSON.stringify(orderObj))
  .set('total_amount', JSON.stringify(total_amount))
  .set('currency', 'GBP')

   console.log(adults);console.log( children);
   console.log( tour_id , book_date , formatDate(new Date(), 'yyyy/MM/dd', 'en'), total_amount);
  return this.http.post(this.orderApi, params, { headers: headers });
}
}
