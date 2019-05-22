import { Injectable } from '@angular/core';
import { HotelsSearchService } from './hotels-search.service';

@Injectable({
  providedIn: 'root'
})
export class HomeSearchService {

constructor(private hotelsSearchservice: HotelsSearchService) { }

searchResults = null;
searchResultsDiv = false;
numberOfPage;
page = 1;
destination; destinationId; fromDate; toDate; rooms; nights;
moreResults;
search(destination, destinationId, fromDate ,toDate, numOfNights, rooms){
  // console.log('HomeSearchService' + destination, fromDate, toDate);
  this.searchResultsDiv = true;
  this.destination = destination;
  this.destinationId = destinationId;
  this.fromDate = fromDate;
  this.toDate = toDate;
  this.rooms = rooms;
  this.nights = numOfNights;
  this.hotelsSearchservice.hotelSearch(destination, destinationId, fromDate, toDate, numOfNights, rooms, this.page)
  .subscribe((data) => { this.searchResults = data; this.numberOfPage= data['data']['totalPages']; console.log('nummmm', data['data']['totalPages']); })
  // if(this.searchResults != null){
  //   this.searchResultsDiv = true;
  //   console.log(this.searchResultsDiv);
  // }
}
filter(SearchHotel , minValue , maxValue, selectedRate, selectedFoodType){
  // console.log(SearchHotel , minValue , maxValue, selectedRate, selectedFoodType);
  this.hotelsSearchservice.hotelSearch(this.destination, this.destinationId, this.fromDate, this.toDate, this.nights, this.rooms, this.page,
     SearchHotel,minValue , maxValue, selectedRate, selectedFoodType)
  .subscribe((data) => { this.searchResults = data; this.numberOfPage= data['data']['totalPages']; console.log('filter service'); })
}
onResultsScroll(){
  console.log('srolling from home');
  console.log(this.numberOfPage);
  // console.log(this.country);
  this.page = this.page +1;
  if (this.page <= this.numberOfPage){
  this.hotelsSearchservice.hotelSearch(this.destination, this.destinationId, this.fromDate, this.toDate,  this.nights, this.rooms, this.page).subscribe((data) => {this.searchResults = this.searchResults.concat(data); })
  // this.toursearchservice.toursSearch(this.keyword, this.country, this.type, this.page).subscribe((data) => { this.searchResults = this.searchResults.concat(data['docs']); })
    // this.searchResults = this.searchResults.concat(this.moreResults);
    console.log(this.searchResults);
  }
}
}
