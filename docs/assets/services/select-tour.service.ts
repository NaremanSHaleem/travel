import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SelectTourService {
  select_tour_Api="https://tailored-travel-api-prod.herokuapp.com/tours";

constructor(public http: HttpClient) { }

public getTour(tour_id){
  const headers = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded'
  });
  const params = new HttpParams()
  .set('id', '')
  .set('item', '')
  .set('__v', '1')
  .set('id', tour_id)
  .set('fields', '');
  
  return this.http.post(this.select_tour_Api, params, {headers: headers})   
}
}
