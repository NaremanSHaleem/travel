import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetBookingService {

constructor(private http: HttpClient) { }

getBooking(token){
  console.log('token'+ token);
  const headers = new HttpHeaders({
    'Authorization': token
  });
  return this.http.get('https://www.stamped.travel/api/my-orders', {headers: headers});
}
}
