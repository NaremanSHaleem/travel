import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetDestinationsService {

  getDestinationsApi='https://www.stamped.travel/api/get-destinations';
constructor(public http: HttpClient) { }

getDestinations(keyword:string){

  return this.http.get(this.getDestinationsApi, {
    params:{
        'keyword': keyword
    }
  });
}
}
