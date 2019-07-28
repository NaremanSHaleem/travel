import { Component, OnInit, HostListener, Inject, ViewChild, ElementRef, LOCALE_ID } from '@angular/core';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
// import { SelectTourService } from 'src/assets/services/select-tour.service';
import { DomSanitizer } from '@angular/platform-browser';
import { CheckoutService } from 'src/assets/services/checkout.service';
import { ModalService } from 'src/assets/services/modal.service';
import { TokenCheckService } from 'src/assets/services/token-check.service';
import { GetHotelService } from 'src/assets/services/get-hotel.service';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Room } from 'src/assets/interfaces/room';
import { HomeSearchService } from 'src/assets/services/homeSearch.service';
import _ from 'lodash';
import { MomentModule } from 'ngx-moment';
import * as moment from 'moment'; // add this 1 of 4
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.css']
})
export class HotelDetailsComponent implements OnInit {

  @ViewChild('stickyMenu') menuElement: ElementRef;
  urlPath = environment.urlPath;
  hotel_details;
  hotel_Id;
  sticky: boolean = false;
  elementPosition: any;
  hoveredDate: NgbDate;
  fromDate: NgbDate;
  toDate: NgbDate;
  selectedFromDate;
  selectedToDate;
  numberofchildren;
  numberofAdults;
  totalnumberofpasangers;
  mydate;
  mydate2;
  daterange = this.mydate + '-' + this.mydate2;
  toggle = false;
  toggle2 = false;
  selectedRoomType = 'Select Room Type';
  selectedFoodType = 'Select Food Type';
  moreHotelDetails;
  childrenAges: FormGroup;
  childrenAgesItems: FormArray;
  chidrenPassangers: FormGroup;
  PasssengerItems;
  rooms: Room[];
  roomtypes: any[];
  roomboards = [];
  hotelCost;
  numOfNights;
  NoSearchResults = false;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private homesearchservice: HomeSearchService,
    calendar: NgbCalendar,
    private sanitizer: DomSanitizer,
    @Inject(LOCALE_ID) private locale: string,
    private checkoutservice: CheckoutService,
    private tokencheckservice: TokenCheckService,
    private getHotelService: GetHotelService,
    private formBuilder: FormBuilder, ) {

    this.fromDate = this.checkoutservice.startDate;
    this.toDate = this.checkoutservice.endDate;
  }

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
    this.mydate = this.fromDate['year'] + "-" + this.fromDate['month'] + "-" + this.fromDate['day'];
    this.mydate2 = this.toDate['year'] + "-" + this.toDate['month'] + "-" + this.toDate['day'];
    this.numOfNights = Math.abs(moment(this.mydate).diff(moment(this.mydate2), 'days'));
    // console.log(this.mydate + this.mydate2);
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
  //end date-picker

  //guests input
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
      this.totalnumberofpasangers = this.numberofchildren + this.numberofAdults;
    }
  }
  addAdult(e) {
    // console.log(this.rooms.find(i => i.id === e));
    this.rooms.find(i => i.id === e).adults++;
    console.log(this.rooms.find(i => i.id === e));
    console.log(this.numberofAdults);
    this.numberofAdults = this.numberofAdults + 1;
    this.totalnumberofpasangers = this.numberofchildren + this.numberofAdults;
  }
  removeChild(e) {
    if (this.numberofchildren > 0) {
      this.rooms.find(i => i.id === e).children.pop();
      console.log(this.rooms.find(i => i.id === e));
      this.numberofchildren = this.numberofchildren - 1;
      this.totalnumberofpasangers = this.numberofchildren + this.numberofAdults;
      // this.PasssengerItems = this.chidrenPassangers.get("ChildernPassengers") as FormArray;
      // this.PasssengerItems.removeAt(this.numberofchildren);
      this.childrenAgesItems = this.childrenAges.get('childrenAgesItems') as FormArray;
      this.childrenAgesItems.removeAt(this.numberofchildren);
    }
  }
  addAChild(e) {
    this.rooms.find(i => i.id === e).children.push({ id: this.numberofchildren + 1, age: null });
    console.log(this.rooms.find(i => i.id === e));
    this.numberofchildren = this.numberofchildren + 1;
    this.totalnumberofpasangers = this.numberofchildren + this.numberofAdults;
    // this.PasssengerItems = this.chidrenPassangers.get("ChildernPassengers") as FormArray;
    // this.PasssengerItems.push(this.CreatePasssengerItem());
    this.childrenAgesItems = this.childrenAges.get('childrenAgesItems') as FormArray;
    this.childrenAgesItems.push(this.createItem());
  }

  addRoom(roomsLength) {
    console.log(roomsLength);
    this.rooms.push({ id: roomsLength + 1, adults: 1, children: [], infants: 0 });
    this.numberofAdults = this.numberofAdults + 1;
    this.totalnumberofpasangers = this.numberofchildren + this.numberofAdults;
    // this.childrenAges.addControl('childrenAgesItems2',this.formBuilder.array([ ]));
    console.log(this.childrenAges);
  }
  counter(i: number) {
    return new Array(i);
  }
  removeRoom(room_id) {
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

  agevaluechange(e, room, childIndex) {
    // console.log( room.children[childIndex]);
    room.children[childIndex].age = e.data
    // console.log(this.rooms);
  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      age: ''
    });
  }

  //sticky on-scroll
  menuPosition: any;
  ngAfterViewInit() {
    this.menuPosition = this.menuElement.nativeElement.offsetTop
  }

  @HostListener('window:scroll', ['$event'])
  handleScroll() {
    const windowScroll = window.pageYOffset;
    if (windowScroll >= this.menuPosition) {
      this.sticky = true;
    } else {
      this.sticky = false;
    }
  }



  selectroomtype(e) {
    let boards = [];
    this.selectedRoomType = e.srcElement.innerText;
    _.forEach(this.moreHotelDetails.rooms, function (value, key) {
      if (key == e.srcElement.innerText) {
        for (let index = 0; index < value.length; index++) {
          boards.push(value[index]);
        }
      }
    });
    this.roomboards = boards;
    // console.log(this.roomboards);
    //  this.selectedRoomTypeId = e.srcElement.getAttribute('value');
  }
  selectfoodtype(e) {
    // console.log(e);
    let cost;
    this.selectedFoodType = e.srcElement.innerText;
    for (let index = 0; index < this.roomboards.length; index++) {
      if (this.roomboards[index].boardType == e.srcElement.innerText) {
        cost = this.roomboards[index].price;
      }
    }
    this.hotelCost = cost;
    //  this.selectedRoomTypeId = e.srcElement.getAttribute('value');
  }

  //search
  search() {
    console.log('research' + this.mydate, this.mydate2, this.numOfNights, this.rooms, this.moreHotelDetails.name, this.selectedRoomType + this.selectedFoodType);
    this.homesearchservice.searchfromdetailspage(this.mydate, this.mydate2, this.numOfNights, this.rooms, this.moreHotelDetails.name)
      .subscribe((data) => {
        let tempHotel = false;
        for (let index = 0; index < data['data']['hotels'].length; index++) {
          const hotel = data['data']['hotels'][index];
          if (hotel.id == this.hotel_Id) {
            this.roomtypes = data['data']['hotels'][index].rooms;
            tempHotel = true;
            console.log(data);
          }
        }
        if (!tempHotel) { this.NoSearchResults = true; console.log('No hotels' + tempHotel) };
        this.homesearchservice.loading = false;
      });

  }
  //checkout
  checkout() {
    if (this.tokencheckservice.token != null) {
      this.checkoutservice.numberOfpassanger = this.totalnumberofpasangers;
      this.checkoutservice.selectedhotel = this.moreHotelDetails;
      this.checkoutservice.numberOfAdults = this.numberofAdults;
      this.checkoutservice.numberOfChildern = this.numberofchildren;
      this.checkoutservice.itemAdded = true;
      this.checkoutservice.bookedDateRange = this.mydate + ':' + this.mydate2;
      this.checkoutservice.selectedRoomPrice = this.hotelCost;
      this.checkoutservice.selectedRoomDetails = this.selectedRoomType;
      this.checkoutservice.selectedBoardDetails = this.selectedFoodType;
      this.checkoutservice.totalAmout = this.hotelCost;
      console.log(this.selectedFoodType);
      this.router.navigate(['/cart']);
    } else this.router.navigate(['/login']);
  }

  ngOnInit() {
    this.hotel_Id = this.route.snapshot.params['hotelId'];
    this.getHotelService.getHotel(this.hotel_Id).subscribe((data) => { this.hotel_details = data; console.log(data) });;
    this.rooms = this.checkoutservice.rooms;
    this.totalnumberofpasangers = this.checkoutservice.numberOfpassanger;
    this.numberofchildren = this.checkoutservice.numberOfChildern;
    this.numberofAdults = this.checkoutservice.numberOfAdults;
    this.mydate = this.checkoutservice.startDate;
    this.mydate2 = this.checkoutservice.endDate;
    console.log(this.numberofAdults);
    this.homesearchservice.currentHotels.forEach(hotel => {
      if (hotel.id == this.hotel_Id) {
        _.map(hotel.rooms, function (room, key) {
          let filterdrooms = _.uniqBy(room, function (e) {
            // console.log(room);
            return e.boardType;
          });
          hotel.rooms[key] = filterdrooms;
        })
        this.moreHotelDetails = hotel;
      }
    });
    this.hotelCost = this.moreHotelDetails.price;
    this.roomtypes = this.moreHotelDetails.rooms;
    console.log(this.roomtypes);
  }

  ngDoCheck() {
    console.log(window.innerHeight <2000);
    if(window.innerHeight < 2000){
      console.log('< 2000');
    }
  }

  scrollHandler() {
    document.getElementById('sidebar').classList.add('topsticky');
    console.log('scrolling');
    console.log(window.innerHeight);
  }
  scrollUpHandler(){
    document.getElementById('sidebar').classList.remove('topsticky');
    console.log('scrollingUp');
  }
}
