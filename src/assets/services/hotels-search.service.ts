import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HotelsSearchService {

  hotelsSearchApi='https://www.discountedhotels.co.uk/api/search-hotels';
constructor(public http: HttpClient) { }

hotelSearch(destination, destinationId, fromDate ,toDate, numOfNights, rooms, page, hotelSearch?, minValue? , maxValue?, selectedRate?, selectedFoodType?){
  let adult_room = [];
  let children_room= [];
  let child_age= [];
  let adults =0;
  let children =0;
  let priceRange;
  // adult_room.push(1);
  // categories.push(type);
  // keywords.push(keyword);
  
  const headers = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded'
  });
  let params = new HttpParams()
  .set('location', destination)
  .set('hidden_id', destinationId)
  .set('hidden_key', 'Destination')
  .set('arrival', fromDate)
  .set('departure', toDate)
  .set('nights', numOfNights)
  .set('rooms', rooms.length)
  .set('adults', adults.toString())
  .set('children', children.toString())
  .set('child_age[]', child_age.toString())
  .set('page', '1');
  
  rooms.forEach(room=>{
    adults += room.adults;
    children += room.children.length;
    params = params.append('adult_room[]',room.adults);
    params = params.append('children_room[]', room.children.length);
    room.children.forEach(child=>{
      child_age.push(child.age);
    })
  //  console.log(adults);
  //  console.log(children);
  //  console.log('adult_room[]' + room.adults );
  //  console.log('children_room[]:' + room.children.length );
  //  console.log(child_age);
  })
if(hotelSearch != undefined && hotelSearch != ''){params = params.append('filter_hotel_name', hotelSearch);}
if(minValue != undefined&& maxValue!= undefined){
  priceRange= minValue+';'+maxValue;
  console.log(priceRange);
  params = params.append('filter_price_range', priceRange);
}
if(selectedRate != undefined){params = params.append('filter_hotel_rating[]', selectedRate);}
// if(selectedFoodType != undefined){params = params.append('filter_meal_code[]', selectedFoodType);}

  console.log('hotelSearch service ' + destination, destinationId, fromDate ,toDate, rooms, page, hotelSearch, minValue , maxValue, selectedRate, selectedFoodType);
  
  return this.http.get(this.hotelsSearchApi, {headers: headers, params});
  }
}
