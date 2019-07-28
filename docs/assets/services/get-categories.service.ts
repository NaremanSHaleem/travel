import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetCategoriesService {

  toursCategoriesApi ='https://tailored-travel-api-prod.herokuapp.com/tours/categories/1/100';

constructor(public http: HttpClient) { }

public getToursCategories(){
  return this.http.get(this.toursCategoriesApi);
}

}
