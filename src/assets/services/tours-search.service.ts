import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ToursSearchService {

  searchApi ='https://tailored-travel-api-prod.herokuapp.com/tours/search';

constructor(public http: HttpClient) { }

toursSearch(keyword: string, country:string[] ,type:number, page){
  let countries = [];
  let categories= [];
  // let keywords= [];
  countries.push(country);
  categories.push(type);
  // keywords.push(keyword);
  
  const headers = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded'
  });
  const params = new HttpParams()
  .set('keyword', keyword)
  .set('fields', '')
  .set('categories', JSON.stringify(categories))
  .set('page', page)
  .set('limit', '15')
  .set('countries', JSON.stringify(countries))
  .set('with_pictures', 'true');
  
  console.log('service' + keyword + country + type);
  
  return this.http.post(this.searchApi, params, {headers: headers});
  }

}
