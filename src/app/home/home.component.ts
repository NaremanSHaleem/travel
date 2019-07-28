import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
// import { GetToursService } from 'src/assets/services/getTours.service';
// import { GetCategoriesService } from 'src/assets/services/get-categories.service';
import { HomeSearchService } from 'src/assets/services/homeSearch.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { CheckoutService } from 'src/assets/services/checkout.service';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { GetDestinationsService } from 'src/assets/services/get-destinations.service';
import * as moment from 'moment'; // add this 1 of 4
import { Room } from 'src/assets/interfaces/room';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
// import {SatDatepickerInputEvent, SatDatepickerRangeValue} from 'saturn-datepicker';

// import html2canvas from 'html2canvas';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // @Output() selected: EventEmitter<any> = new EventEmitter();

  selected: {start: moment.Moment, end: moment.Moment};;
  start_date;
  end_date;
  urlPath = environment.urlPath;
  tourscategories
  selectedcategory = 'All Categories';
  selectedcategoryId;
  Searchkeyword: string = '';
  searchDestination;
  selectedcountry: any;
  DataFeed = null;
  toggle2 = false;
  toggle = false;
  toggle3 = false;
  numberofchildren = 0;
  numberofAdults = 2;
  numberofinfants = 0;
  totalnumberofpasangers = this.numberofchildren + this.numberofAdults + this.numberofinfants;
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
  rooms: Room[] = [
    {
      id: 1,
      adults: 2,
      children: [],
      infants: 0
    }
  ];
  childrenAges: FormGroup;
  childrenAgesItems: FormArray;
  months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];

  destinationId: any;
  monthName: string;
  numOfNights;
  startDate: moment.Moment;
  endDate: moment.Moment;
  searchDestination2;
  showResults;
  selected2;

  // date: SatDatepickerRangeValue<Date> ;
  // lastDateInput: SatDatepickerRangeValue<Date>  | null;
  // lastDateChange: SatDatepickerRangeValue<Date>  | null;

  // onDateInput = (e: SatDatepickerInputEvent<Date>) => this.lastDateInput = e.value as SatDatepickerRangeValue<Date>;
  // onDateChange = (e: SatDatepickerInputEvent<Date>) => this.lastDateChange = e.value as SatDatepickerRangeValue<Date>;
  // maxDate = new Date();

  constructor(
    private router: Router,
    private calendar: NgbCalendar,
    private homesearchservice: HomeSearchService,
    private formBuilder: FormBuilder,
    private checkoutservice: CheckoutService,
    private getDestinations: GetDestinationsService,
    private elementRef: ElementRef) {
    this.chidrenPassangers = this.formBuilder.group({

      ChildernPassengers: this.formBuilder.array([])
    });
    this.childrenAges = this.formBuilder.group({

      childrenAgesItems: this.formBuilder.array([])
    });
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  rangeclicked(e){
    if(e.startDate != null){
      let start = e.startDate._d+'';
      let tempstart = start.split(" ", 4);  
      this.start_date= tempstart[2] + ' '+ tempstart[1] +' '+ tempstart[3];
      console.log(this.start_date);
      let end = e.endDate._d +'';
      let tempend= end.split(" ", 4);
      this.end_date = tempend[2] + ' '+ tempend[1] +' '+ tempend[3];
      console.log(this.end_date);
    }
  }

  ngOnInit() {
    this.getDestination(this.Searchkeyword);
    document.getElementsByClassName('md-drppicker')[0].setAttribute('style','width: 512px; color: rgb(0, 0, 0); margin-top: 3%;')
    
  }
  ngDoCheck() {
    // this.showResults = this.homesearchservice.searchResultsDiv;
  }
  async getDestination(keyword) {
    await this.getDestinations.getDestinations(keyword).subscribe((data) => {
      this.tourscategories = data;
      this.searchDestination2 = keyword;
      this.searchDestination = keyword;
      this.destinationId = data['data']['destinations'][0]['destination_id'];
      console.log(data);
    });
  }

  async SelectItem2(e) {
    await this.getDestination(e.srcElement.innerText);
    console.log(this.tourscategories);
  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      age: ''
    });
  }

  //select categoy
  selectcategory(e) {
    this.selectedcategory = e.srcElement.innerText;
    this.selectedcategoryId = e.srcElement.getAttribute('value');
  }

  //country list- autocomplete
  SelectItem(item: any) {
    this.searchDestination2 = item.name;
    this.searchDestination = item.name;
    this.destinationId = item.destination_id;
    // this.selected.emit(item);
    this.DataFeed = null; // clear
  }

  filterItems(ev) {

    if (ev.srcElement.value === '') {
      this.DataFeed = null;
      return false;
    };
    this.toggle2 = true;
    this.getDestinations.getDestinations(ev.srcElement.value).subscribe((data) => { this.DataFeed = data['data']['destinations']; console.log(this.destinations); }, (error) => { console.log(error) });
  }

  ClearResults() {
    setTimeout(() => {
      this.DataFeed = null;
      this.toggle2 = false;
    }, 500);
  }

  // @ViewChild('ngbdatepicker') calender: ElementRef;
  // dateToggle() {
  //   this.toggle = !this.toggle;
  //   if (this.toggle == true) {
  //     // this.divvv.nativeElement.focus();
  //     setTimeout(() => {
  //       // console.log(this.calender);
  //       // this.calender.nativeElement.focus();
  //       // console.log(document.activeElement);
  //     }
  //       , 0);
  //   }
  // }


  //from > to
  // onDateSelection(date: NgbDate) {
  //   if (!this.fromDate && !this.toDate) {
  //     this.fromDate = date;
  //     // this.calender.nativeElement.focus();
  //     console.log(document.activeElement);
  //   } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
  //     this.toDate = date;
  //     setTimeout(() => {
        
  //       // console.log(this.calender.nativeElement);
  //       // this.calender.nativeElement.focus();
  //       document.getElementById('ngbdatepicker').classList.remove('open');
  //       this.mydate2 = this.toDate['day'] + " " + this.getMonthname(this.toDate['month']) + " " + this.toDate['year'];
  //     }, 500);
  //   } else {
  //     this.toDate = null;
  //     this.fromDate = date;
  //     document.getElementById('ngbdatepicker').focus();
  //   }
  //   this.mydate = this.fromDate['day'] + " " + this.getMonthname(this.fromDate['month']) + " " + this.fromDate['year'];
  //   this.numOfNights = Math.abs(moment(this.mydate).diff(moment(this.mydate2), 'days'));
  //   this.startDate = moment(this.mydate);
  //   this.endDate = moment(this.mydate2);

  // }

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
      if (month_number == index + 1) {
        return month;
      }
    })
  }

  //search
  search() {
    this.selectedcountry = this.searchDestination;
    this.checkoutservice.rooms = this.rooms;
    this.checkoutservice.startDate = this.start_date;
    this.checkoutservice.endDate = this.end_date;
    this.checkoutservice.numberOfpassanger = this.totalnumberofpasangers;
    this.checkoutservice.numberOfAdults = this.numberofAdults;
    this.checkoutservice.numberOfChildern = this.numberofchildren;
    this.checkoutservice.countryName = this.selectedcountry;
    this.checkoutservice.numberofnights = this.numOfNights;
    this.homesearchservice.search(this.selectedcountry, this.destinationId, this.mydate, this.mydate2, this.numOfNights, this.rooms);
    this.router.navigate(['/hotels']);
    console.log(this.showResults);
  }

  CreatePasssengerItem(): FormGroup {
    return this.formBuilder.group({
      age: [""],

    });
  }
  passangersCounter() {
    this.totalnumberofpasangers = this.numberofchildren + this.numberofAdults + this.numberofinfants;
  }

  removeAdult(e) {
    if (this.rooms.find(i => i.id === e).adults > 1) {
      this.rooms.find(i => i.id === e).adults--;
      this.numberofAdults = this.numberofAdults - 1;
    }
    this.passangersCounter();
  }

  addAdult(e) {
    this.rooms.find(i => i.id === e).adults++;
    this.numberofAdults = this.numberofAdults + 1;
    this.passangersCounter();
  }

  removeChild(e) {
    if (this.rooms.find(i => i.id === e).children.length > 0) {
      this.rooms.find(i => i.id === e).children.pop();
      this.numberofchildren = this.numberofchildren - 1;
      this.PasssengerItems = this.chidrenPassangers.get("ChildernPassengers") as FormArray;
      this.PasssengerItems.removeAt(this.numberofchildren);
      this.childrenAgesItems = this.childrenAges.get('childrenAgesItems') as FormArray;
      this.childrenAgesItems.removeAt(this.numberofchildren);
    }
    this.passangersCounter();
  }

  addAChild(e) {
    this.rooms.find(i => i.id === e).children.push({ id: this.numberofchildren + 1, age: null });
    this.numberofchildren = this.numberofchildren + 1;
    this.passangersCounter();
    this.PasssengerItems = this.chidrenPassangers.get("ChildernPassengers") as FormArray;
    this.PasssengerItems.push(this.CreatePasssengerItem());
    this.childrenAgesItems = this.childrenAges.get('childrenAgesItems') as FormArray;
    this.childrenAgesItems.push(this.createItem());
  }

  addInfant(e) {
    this.rooms.find(i => i.id === e).infants++;
    this.numberofinfants = this.numberofinfants + 1;
    this.passangersCounter();
  }

  removeInfant(roomId) {
    if (this.rooms.find(i => i.id === roomId).infants > 0) {
      this.rooms.find(i => i.id === roomId).infants--;
      this.numberofinfants = this.numberofinfants - 1;
    }
    this.passangersCounter();
  }

  addRoom(roomsLength) {
    this.rooms.push({ id: roomsLength + 1, adults: 2, children: [], infants: 0 });
    this.numberofAdults = this.numberofAdults + 2;
    this.passangersCounter();

  }

  removeRoom(room_id) {
    for (var i = 0; i < this.rooms.length; i++)
      if (this.rooms[i].id === room_id) {
        this.numberofAdults = this.numberofAdults - this.rooms[i].adults;
        this.numberofchildren = this.numberofchildren - this.rooms[i].children.length;
        this.numberofinfants = this.numberofinfants - this.rooms[i].infants;
        this.totalnumberofpasangers = this.numberofchildren + this.numberofAdults + this.numberofinfants;
        this.rooms.splice(i, 1);
        break;
      }
  }

  counter(i: number) {
    return new Array(i);
  }

  agevaluechange(e, room, childIndex) {
    room.children[childIndex].age = e.data
  }
  scrollHandler() {
    console.log('scroll');
  }
}
