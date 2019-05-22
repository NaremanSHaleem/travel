import { Component, OnInit, HostListener, Inject, ViewChild, ElementRef, LOCALE_ID } from '@angular/core';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectTourService } from 'src/assets/services/select-tour.service';
import { DomSanitizer } from '@angular/platform-browser';
import { CheckoutService } from 'src/assets/services/checkout.service';
import { ModalService } from 'src/assets/services/modal.service';
import { TokenCheckService } from 'src/assets/services/token-check.service';
import { GetHotelService } from 'src/assets/services/get-hotel.service';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Room } from 'src/assets/interfaces/room';

@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.css']
})
export class HotelDetailsComponent implements OnInit {

  @ViewChild('stickyMenu') menuElement: ElementRef;

  hotel_details;
  hotel_Id;
  sticky: boolean = false;
  elementPosition: any;
  hoveredDate: NgbDate;
  fromDate: NgbDate;
  toDate: NgbDate;
  selectedFromDate;
  selectedToDate;
  numberofchildren = 0;
  numberofAdults = 1;
  totalnumberofpasangers = this.numberofchildren + this.numberofAdults;
  mydate;
  mydate2;
  daterange = this.mydate + '-' + this.mydate2;
  toggle = false;
  toggle2 = false;
  selectedRoomType= 'Select Room Type';
  selectedFoodType= 'Select Food Type';
  
  childrenAges:FormGroup;
  childrenAgesItems: FormArray;
  chidrenPassangers: FormGroup;
  PasssengerItems;
  rooms: Room[];
  constructor(private route: ActivatedRoute,
    private router: Router,
    private select_tourService: SelectTourService,
    calendar: NgbCalendar,
    private sanitizer: DomSanitizer,
    @Inject(LOCALE_ID) private locale: string,
    private checkoutservice: CheckoutService,
    private tokencheckservice: TokenCheckService,
    private getHotelService: GetHotelService,
    private formBuilder: FormBuilder,) {

    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
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
      this.totalnumberofpasangers = this.numberofchildren + this.numberofAdults;
    }
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



  selectroomtype(e){
    //  console.log(e);
     this.selectedRoomType = e.srcElement.innerText;
    //  this.selectedRoomTypeId = e.srcElement.getAttribute('value');
  }
  selectfoodtype(e){
    // console.log(e);
    this.selectedFoodType = e.srcElement.innerText;
   //  this.selectedRoomTypeId = e.srcElement.getAttribute('value');
  }
  //checkout
  checkout() {
    // console.log(this.tour_details['_id']);
    // if(this.tokencheckservice.token != null){
    this.checkoutservice.numberOfpassanger = this.totalnumberofpasangers;
    this.checkoutservice.selectedtour = this.hotel_details;
    this.checkoutservice.numberOfAdults = this.numberofAdults;
    this.checkoutservice.numberOfChildern = this.numberofchildren;
    this.checkoutservice.itemAdded =true;
    this.checkoutservice.bookedDateRange = this.mydate +':'+ this.mydate2;
    this.checkoutservice.totalAmout = this;
    this.router.navigate(['/cart']);
    // }else this.router.navigate(['/login']);
  }
  ngOnInit() {
    // console.log('thing', this.route.snapshot.params['tourId']);
    this.hotel_Id = this.route.snapshot.params['hotelId'];
    this.getHotelService.getHotel(this.hotel_Id).subscribe((data) => { this.hotel_details = data; console.log(data) });;
    this.rooms = this.checkoutservice.rooms;
    this.mydate =this.checkoutservice.startDate;
    this.mydate2 = this.checkoutservice.endDate;
    // this.select_tourService.getTour(this.tour_Id).subscribe((data) => { this.tour_details = data; console.log(data) });
    console.log(this.mydate +'>'+ this.mydate2);


  }
}
