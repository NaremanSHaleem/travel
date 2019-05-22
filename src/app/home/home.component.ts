import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { GetToursService } from 'src/assets/services/getTours.service';
import { GetCategoriesService } from 'src/assets/services/get-categories.service';
import { ToursSearchService } from 'src/assets/services/tours-search.service';
import { HomeSearchService } from 'src/assets/services/homeSearch.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { CheckoutService } from 'src/assets/services/checkout.service';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { GetDestinationsService } from 'src/assets/services/get-destinations.service';
import { MomentModule } from 'ngx-moment';
import * as moment from 'moment'; // add this 1 of 4
import { Room } from 'src/assets/interfaces/room';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Output() selected: EventEmitter<any> = new EventEmitter();

  tourscategories
  selectedcategory = 'All Categories';
  selectedcategoryId;
  Searchkeyword: string = '';
  searchDestination;
  selectedcountry: any;
  DataFeed: any;
  toggle2 = false;
  toggle = false;
  numberofchildren = 0;
  numberofAdults = 1;
  totalnumberofpasangers = this.numberofchildren + this.numberofAdults;
  destinations: any[];
  hoveredDate: NgbDate;
  fromDate: NgbDate;
  toDate: NgbDate;
  selectedFromDate;
  selectedToDate;
  mydate: any = 'From';
  mydate2: any = 'To';
  daterange = this.mydate + '-' + this.mydate2;

  chidrenPassangers: FormGroup;
  PasssengerItems;
  // childrenArray=[];
  rooms: Room[] = [
    {
      id: 1,
      adults: 1,
      children:[]
    }
  ];
  childrenAges:FormGroup;
  childrenAgesItems: FormArray;
  months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];
  
  destinationId: any;
  monthName: string;
  numOfNights;
  startDate: moment.Moment;
  endDate: moment.Moment;
  
  constructor(private gettoursservice: GetToursService,
    private getcategoriesservice: GetCategoriesService,
    private calendar: NgbCalendar,
    private homesearchservice: HomeSearchService,
    private formBuilder: FormBuilder,
    private checkoutservice: CheckoutService,
    private getDestinations: GetDestinationsService) {
    this.chidrenPassangers = this.formBuilder.group({

      ChildernPassengers: this.formBuilder.array([])
    });
    this.childrenAges = this.formBuilder.group({

      childrenAgesItems: this.formBuilder.array([ ])
    });
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  ngOnInit() {
    // this.getcategoriesservice.getToursCategories().subscribe((data) => { this.tourscategories = data['docs']; });
    this.getDestinations.getDestinations(this.Searchkeyword).subscribe((data) => { this.tourscategories = data; console.log(data); });
    console.log(this.rooms);
    
 
  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      age: ''
    });
  }

  //select categoy
  selectcategory(e) {
    // console.log(e);
    this.selectedcategory = e.srcElement.innerText;
    this.selectedcategoryId = e.srcElement.getAttribute('value');
  }

  //country list- autocomplete
  SelectItem(item: any) {
    this.searchDestination = item.name;
    this.destinationId = item.destination_id;
    this.selected.emit(item);
    this.DataFeed = null; // clear
  }

  filterItems(ev: string) {
    this.toggle2 = true;
    // console.log(ev);
    this.getDestinations.getDestinations(ev).subscribe((data) => { this.destinations = data['data']['destinations']; console.log(this.destinations); });
    this.DataFeed = this.destinations;
  }

  ClearResults() {
    setTimeout(() => {
      this.DataFeed = null;
      this.toggle2 = false;
    }, 500);
  }
  //from > to
  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
    // this.mydate = formatDate(this.fromDate, 'yyyy-MM-dd', this.locale);

    this.mydate = this.fromDate['day'] + " " + this.getMonthname(this.fromDate['month']) + " " + this.fromDate['year'];
    this.mydate2 = this.toDate['day'] + " " + this.getMonthname(this.toDate['month']) + " " + this.toDate['year'];
    this.numOfNights = Math.abs(moment(this.mydate).diff(moment(this.mydate2), 'days'));
    this.startDate = moment(this.mydate);
    this.endDate = moment(this.mydate2);
    console.log(this.numOfNights);
  }
  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }


  getMonthname(month_number) {
    return this.months.filter((month, index) => {
      // this.months.forEach((month, index) =>{
      if (month_number == index + 1) {
        return month;
      }
    })
    // return this.monthName;
  }

  //search
  search() {
    console.log('search');
    this.selectedcountry = this.searchDestination;

    console.log(this.selectedcountry, this.destinationId, this.mydate, this.mydate2, this.rooms);
    // this.toursearchservice.toursSearch(this.Searchkeyword, this.selectedcountry, this.selectedcategoryId).subscribe();
    this.checkoutservice.rooms = this.rooms;
    this.checkoutservice.startDate = this.mydate;
    this.checkoutservice.endDate = this.mydate2;
    this.homesearchservice.search(this.selectedcountry, this.destinationId, this.mydate, this.mydate2, this.numOfNights, this.rooms);
  }


  CreatePasssengerItem(): FormGroup {
    return this.formBuilder.group({
      age: [""],

    }); 
  }
  removeAdult(e) {
    if (this.numberofAdults > 1) {
      this.rooms.find(i => i.id === e).adults--;
      console.log(this.rooms.find(i => i.id === e));
      this.numberofAdults = this.numberofAdults - 1;
    }
    this.totalnumberofpasangers = this.numberofchildren + this.numberofAdults;
  }
  addAdult(e) {
    // console.log(this.rooms.find(i => i.id === e));
    this.rooms.find(i => i.id === e).adults++;
    console.log(this.rooms.find(i => i.id === e));
    this.numberofAdults = this.numberofAdults + 1;
    this.totalnumberofpasangers = this.numberofchildren + this.numberofAdults;
  }
  removeChild(e) {
    if (this.numberofchildren > 0) {
      this.rooms.find(i => i.id === e).children.pop();
    console.log(this.rooms.find(i => i.id === e));
      this.numberofchildren = this.numberofchildren - 1;
      this.PasssengerItems = this.chidrenPassangers.get("ChildernPassengers") as FormArray;
      this.PasssengerItems.removeAt(this.numberofchildren);
      this.childrenAgesItems = this.childrenAges.get('childrenAgesItems') as FormArray;
      this.childrenAgesItems.removeAt(this.numberofchildren);
    }
    this.totalnumberofpasangers = this.numberofchildren + this.numberofAdults;
  }
  addAChild(e) {
    this.rooms.find(i => i.id === e).children.push({id:this.numberofchildren+1,age:null});
    console.log(this.rooms.find(i => i.id === e));
    this.numberofchildren = this.numberofchildren + 1;
    this.totalnumberofpasangers = this.numberofchildren + this.numberofAdults;
    this.PasssengerItems = this.chidrenPassangers.get("ChildernPassengers") as FormArray;
    this.PasssengerItems.push(this.CreatePasssengerItem());
    this.childrenAgesItems = this.childrenAges.get('childrenAgesItems') as FormArray;
    this.childrenAgesItems.push(this.createItem());
  }

  addRoom(roomsLength) {
    console.log(roomsLength); 
    this.rooms.push({id:roomsLength+1, adults:1, children:[]});
    this.numberofAdults = this.numberofAdults + 1;
    this.totalnumberofpasangers = this.numberofchildren + this.numberofAdults;
    // this.childrenAges.addControl('childrenAgesItems2',this.formBuilder.array([ ]));
    console.log(this.childrenAges);
  }
  counter(i: number) {
    return new Array(i);
}
removeRoom(room_id){
  for (var i = 0; i < this.rooms.length; i++)
    if (this.rooms[i].id === room_id) { 
      this.numberofAdults = this.numberofAdults - this.rooms[i].adults;
      this.numberofchildren = this.numberofchildren - this.rooms[i].children.length;
      this.totalnumberofpasangers = this.numberofchildren + this.numberofAdults;

        this.rooms.splice(i, 1);
        console.log(this.rooms);
        break;
    }
}

agevaluechange(e, room, childIndex){
// console.log( room.children[childIndex]);
room.children[childIndex].age = e.data
// console.log(this.rooms);
}
}
