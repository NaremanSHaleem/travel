import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetHotelService {

  getHotelApi='https://www.stamped.travel/api/get-hotel/';
constructor(private http: HttpClient) { }


getHotel( hotelId){
  return this.http.get(this.getHotelApi+hotelId);
}
}
