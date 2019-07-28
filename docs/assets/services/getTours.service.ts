import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetToursService {

  searchApi ='https://tailored-travel-api-prod.herokuapp.com/tours/search';
  toursCategoriesApi ='https://tailored-travel-api-prod.herokuapp.com/tours/categories/1/100';
  toursdata;
  
constructor(public http: HttpClient) { 
 }

 public gettours(page){
   this.toursdata = [];
  const headers = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded'
  });
  const params = new HttpParams()
  .set('keyword', '')
  .set('fields', '')
  .set('categories', '')
  .set('page', page)
  .set('limit', '15')
  .set('countries', '')
  .set('with_pictures', 'true');

  console.log('service page number' + page);
  return this.http.post(this.searchApi, params, {headers: headers})   
}

public getToursCategories(){
  return this.http.get(this.toursCategoriesApi);
}


}
