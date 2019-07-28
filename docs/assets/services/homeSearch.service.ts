import { Injectable } from '@angular/core';
import { HotelsSearchService } from './hotels-search.service';
// import { error } from '@angular/compiler/src/util';

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
  currentHotels;
  loading = false;
  search(destination, destinationId, fromDate, toDate, numOfNights, rooms) {
    // console.log('HomeSearchService' + destination, fromDate, toDate);
    this.loading = true;
    this.destination = destination;
    this.destinationId = destinationId;
    this.fromDate = fromDate;
    this.toDate = toDate;
    this.rooms = rooms;
    this.nights = numOfNights;

    this.hotelsSearchservice.hotelSearch(destination, destinationId, fromDate, toDate, numOfNights, rooms, this.page)
      .subscribe(
        (data) => {
          this.searchResults = data;
          this.numberOfPage = data['data']['totalPages'];
          this.currentHotels = data['data']['hotels'];
          this.searchResultsDiv = true;
          this.loading = false;
          console.log(this.loading);

          console.log(this.currentHotels)
        })
  }

   filter(SearchHotel, minValue, maxValue, selectedRate, selectedFoodType, callback) {
    this.loading = true;
     this.hotelsSearchservice.hotelSearch(this.destination, this.destinationId, this.fromDate, this.toDate, this.nights, this.rooms, this.page,
      SearchHotel, minValue, maxValue, selectedRate, selectedFoodType)
      .subscribe((data) => { this.searchResults = data; this.numberOfPage = data['data']['totalPages']; this.loading = false; console.log('filter service'); if(typeof callback!= 'undefined')callback() })
  }
  onResultsScroll() {
    console.log('srolling from home');
    console.log('total pages:' + this.numberOfPage + 'currentpage:' + this.page);
    console.log('next page:' + this.page);
    if (this.page <= this.numberOfPage) {
      this.hotelsSearchservice.hotelSearch(this.destination, this.destinationId, this.fromDate, this.toDate, this.nights, this.rooms, this.page)
        .subscribe((data) => { this.searchResults['data']['hotels'] = this.searchResults['data']['hotels'].concat(data['data']['hotels']); })
      console.log(this.searchResults);
    }
  }

  searchfromdetailspage(fromdate, todate, numOfNights, rooms, hotelName) {
    console.log('researxh feon home service' + fromdate, todate, numOfNights, rooms, hotelName);
    this.loading = true;
    let newnights;
    if (numOfNights == undefined) { newnights = this.nights }
    return this.hotelsSearchservice.hotelSearch(this.destination, this.destinationId, fromdate, todate, newnights, rooms, this.page,
      hotelName);
  }
}
