import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Options, LabelType } from 'ng5-slider';
import { HomeSearchService } from 'src/assets/services/homeSearch.service';
@Component({
  selector: 'app-Hotel-Items-withFilters',
  templateUrl: './Hotel-Items-withFilters.component.html',
  styleUrls: ['./Hotel-Items-withFilters.component.css']
})
export class HotelItemsWithFiltersComponent implements OnInit {

  @Output() selected: EventEmitter<any> = new EventEmitter();

  counter = 1;
  ischecked = false;
  SearchHotel;
  DataFeed: any;
  hotels = ['A', 'B', 'C']
  selectedFoodType = [];
  selectedRate = []
  showresults;
  Arr = Array;
  minValue: number = 0;
  maxValue: number = 12000;
  options: Options = {
    floor: 0,
    ceil: 12000,
    noSwitching: true,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b></b> $' + value;

        case LabelType.High:
          return '<b></b> $' + value;
        default:
          return '$' + value;
      }
    }
  };
  searchResult = [];
  numberOfPages: any;
  page = 1;

  constructor(private homesearchservice: HomeSearchService) { }


  SelectItem(item: any) {
    this.SearchHotel = item;
    this.selected.emit(item);
    this.DataFeed = null; // clear
  }

  filterItems(ev: string) {
    // this.toggle2 = true;
    this.DataFeed = this.hotels.filter((item) => {
      return item.toLowerCase().indexOf(ev.toLowerCase()) === 0
    });
  }


  ClearResults() {
    setTimeout(() => {
      this.DataFeed = null;
      // this.toggle2 = false;
    }, 500);
  }
   filtring() {
    console.log("filtring" + '  ' + this.SearchHotel + ' - ' + this.minValue + ' - ' + this.maxValue, this.selectedRate, this.selectedFoodType);
     this.homesearchservice.filter(this.SearchHotel, this.minValue, this.maxValue, this.selectedRate, this.selectedFoodType, this.resetResults);
    //  this.resetResults();
  }
  
  resetResults = ()=>{
    this.searchResult = this.homesearchservice.searchResults;
    this.numberOfPages = this.searchResult['totalPages'];
    console.log(this.searchResult);
    
  }
  ngOnChanges(){
    this.searchResult = this.homesearchservice.searchResults;
    console.log(this.searchResult);
}

  onValueChange(e) {
    this.minValue = e;
    // console.log(this.minValue);
  }

  onHighValueChange(e) {
    this.maxValue = e;
    // console.log(this.maxValue);  
  }

  toggleVisibility(e) {
    this.ischecked = e.target.checked;
    
    if (this.ischecked) {
      this.selectedFoodType.push(e.srcElement.value);
      console.log(this.selectedFoodType);
    } else {
      for (var i = 0; i < this.selectedFoodType.length; i++) {
        if (this.selectedFoodType[i] === e.srcElement.value) {
          this.selectedFoodType.splice(i, 1);
        }
      }
    }
    this.filtring();
  }

  rateToggleVisibility(e) {
    this.ischecked = e.target.checked;
    console.log(e.target.checked);
    if (this.ischecked) {
      this.selectedRate.push(e.srcElement.value);
      // console.log(this.selectedRate);

    } else {
      for (var i = 0; i < this.selectedRate.length; i++) {
        if (this.selectedRate[i] === e.srcElement.value) {
          this.selectedRate.splice(i, 1);
        }
      }
    }
    this.filtring();
  }
  ngOnInit() {
    this.searchResult = [];
    // this.numberOfPages = this.searchResult['totalPages'];
    // if (this.homesearchservice.searchResults != null ) {
    //   this.counter++;
    //   this.searchResult = this.homesearchservice.searchResults;
    //   this.numberOfPages = this.searchResult['totalPages'];

    //   console.log(this.searchResult);
    // }
  }
  
  ngDoCheck() {

    // this.showresults = this.homesearchservice.searchResultsDiv;
   
  }

  onResultsScroll() {
    console.log('resultsScrolling');
    this.homesearchservice.onResultsScroll();
    // console.log('Results scrolling');
    // console.log(this.numberOfPages); 
    // console.log(this.homesearchservice.searchResults);
    // this.page = this.page +1;
    // if(this.page <= this.numberOfPages){
    //   this.homesearchservice.page = this.page; 
    // }
  }
}
