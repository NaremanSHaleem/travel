import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HotelsSearchService {

  hotelsSearchApi='https://www.stamped.travel/api/search-hotels';
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
    params = params.append('children_room[]', room.children.length+ room.infants);
    room.children.forEach(child=>{
      child_age.push(child.age);
    })

  })
if(hotelSearch != undefined && hotelSearch != ''){params = params.append('filter_hotel_name', hotelSearch);}else{params = params.delete('filter_hotel_name', hotelSearch)}

if(minValue != undefined&& maxValue!= undefined){
  priceRange= minValue+';'+maxValue;
  params = params.append('filter_price_range', priceRange);
}

if(selectedRate != undefined && selectedRate.length > 0){
  selectedRate.forEach(rate =>{
    params = params.append('filter_hotel_rating[]', rate);
  })
}

if(selectedFoodType != undefined && selectedFoodType.length > 0){
  selectedFoodType.forEach(foodType=>{
    params = params.append('filter_meal_code[]', foodType);
  })
  }

  // console.log('hotelSearch service ' + destination, destinationId, fromDate ,toDate, rooms, page, hotelSearch, minValue , maxValue, selectedRate, selectedFoodType);
  
  return this.http.get(this.hotelsSearchApi, {headers: headers, params});
  }
}
