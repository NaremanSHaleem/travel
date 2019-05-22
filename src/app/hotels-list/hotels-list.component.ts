import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Options, LabelType } from 'ng5-slider';
@Component({
  selector: 'app-hotels-list',
  templateUrl: './hotels-list.component.html',
  styleUrls: ['./hotels-list.component.css']
})
export class HotelsListComponent implements OnInit {

  // @Output() selected: EventEmitter<any> = new EventEmitter();

  // ischecked = false;
  // SearchHotel;
  // DataFeed: any;
  // hotels=['A', 'B', 'C']
  // selectedFoodType=[];
  // selectedRate=[]

  // minValue: number = 0;
  // maxValue: number = 12000;
  // options: Options = {
  //   floor: 0,
  //   ceil: 12000,
  //   noSwitching: true,
  //   translate: (value: number, label: LabelType): string => {
  //     switch (label) {
  //       case LabelType.Low:
  //         return '<b></b> $' + value;

  //       case LabelType.High:
  //         return '<b></b> $' + value;
  //       default:
  //         return '$' + value;
  //     }
  //   }
  // };
  constructor() { }


  // SelectItem(item: any) {
  //   this.SearchHotel = item;
  //   this.selected.emit(item);
  //   this.DataFeed = null; // clear
  // }

  // filterItems(ev: string) {
  //   // this.toggle2 = true;
  //   this.DataFeed = this.hotels.filter((item) => {
  //     return item.toLowerCase().indexOf(ev.toLowerCase()) === 0
  //   });
  // }


  // ClearResults() {
  //   setTimeout(() => {
  //     this.DataFeed = null;
  //     // this.toggle2 = false;
  //   }, 500);
  // }
  // filtring() {
  //   console.log("filtring" + '  '+  this.SearchHotel + ' - ' + this.minValue + ' - ' + this.maxValue, this.selectedRate, this.selectedFoodType);
  //   // console.log("filtring" + ' - ' +  this.selectedcountry + ' - ' + this.selectedcategoryId + ' - ' + this.minValue + ' - ' + this.maxValue + ' - ' + this.selectedmonth
  //   // + ' - ' + this.minNightValue + ' - ' + this.maxNightValue );
  // }


  // onValueChange(e) {
  //   this.minValue = e;
  //   // console.log(this.minValue);
  // }

  // onHighValueChange(e) {
  //   this.maxValue = e;
  //   // console.log(this.maxValue);  
  // }

  // toggleVisibility(e) {
  //   this.ischecked = e.target.checked;
  //   // console.log(e.srcElement.value);
  //   if (this.ischecked) {
  //     this.selectedFoodType.push(e.srcElement.value);
  //     console.log(this.selectedFoodType);
  //     // this.selectedcategoryId.push(e.srcElement.value);
  //     // console.log(this.selectedcategoryId);

  //   } else {
  //     for( var i = 0; i <  this.selectedFoodType.length; i++){ 
  //       if ( this.selectedFoodType[i] === e.srcElement.value) {
  //         this.selectedFoodType.splice(i, 1); 
  //       }
  //    }
  //     // for (var i = 0; i < this.selectedcategoryId.length; i++) {
  //     //   if (this.selectedcategoryId[i] === e.srcElement.value) {
  //     //     this.selectedcategoryId.splice(i, 1);
  //     //   }
  //     // }
  //     // this.selectedcategoryId.remove(e.srcElement.value);
  //   }
  //   // console.log(this.selectedcategoryId);
  //   // this.tours = this.search();
  // }
  // rateToggleVisibility(e){
  //   this.ischecked = e.target.checked;
  //   // console.log(e.srcElement.value);
  //   if (this.ischecked) {
  //     this.selectedRate.push(e.srcElement.value);
  //     // console.log(this.selectedRate);
  //     // this.selectedcategoryId.push(e.srcElement.value);
  //     // console.log(this.selectedcategoryId);

  //   } else {
  //     for( var i = 0; i <  this.selectedRate.length; i++){ 
  //       if ( this.selectedRate[i] === e.srcElement.value) {
  //         this.selectedRate.splice(i, 1); 
  //       }
  //    }
  //     // for (var i = 0; i < this.selectedcategoryId.length; i++) {
  //     //   if (this.selectedcategoryId[i] === e.srcElement.value) {
  //     //     this.selectedcategoryId.splice(i, 1);
  //     //   }
  //     // }
  //     // this.selectedcategoryId.remove(e.srcElement.value);
  //   }
  //   // console.log(this.selectedcategoryId);
  //   // this.tours = this.search();
  // }
  ngOnInit() {
  }

}
