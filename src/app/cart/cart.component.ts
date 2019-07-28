import { Component, OnInit } from '@angular/core';
import { FormArray, Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
// import { OrderService } from 'src/assets/services/order.service';
import { CheckoutService } from 'src/assets/services/checkout.service';
import { Room } from 'src/assets/interfaces/room';
import { Payment_info } from 'src/assets/interfaces/payment_info';
import { Hotel_purchaseService } from 'src/assets/services/hotel_purchase.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  urlPath = environment.urlPath;
  isfinished = false;
  itemAdded = false;
  hotelmaindetails;
  numberOfPassangers;
  Arr = Array;
  Arr2 = Array;
  numberOfAdults;
  numberOfChildren;
  mainPassangerForm: FormGroup;
  childrenForm: FormGroup;
  submitted = false;
  formdata;
  passangers: FormGroup;
  currentroomname;
  PasssengerItems;
  rooms: Room[];
  country: any;
  numberOfNights: any;
  totalCost: any;

  cardTypes=[
    {name: 'Master Card', value:'M'},
    {name: 'Visa', value:'V'}
  ]
  cardHolder;
  selectedCardType;
  selectedCardTypeCode;
  cardNumber;
  expireMonth;
  expireYear;
  cvc;
  paymentInfo:Payment_info;
  form: FormGroup;

  constructor(private checkoutservice: CheckoutService,
    private formBuilder: FormBuilder,
    // private orderservice: OrderService,
    private purchaseservice: Hotel_purchaseService) {
    // this.passangers = this.formBuilder.group({
    //   AdultsPassengers: this.formBuilder.array([]),
    //   ChildernPassengers: this.formBuilder.array([])
    // });


  }

  // CreatePasssengerItem(): FormGroup {
  //   return this.formBuilder.group({
  //     title: [""],
  //     first_name: ["", Validators.required],
  //     last_name: ["", Validators.required],
  //     middle_name: ["", Validators.required],
  //     phone_number: ["", Validators.required],

  //     email: ["", [Validators.required]]
  //   });
  // }

  // addAdult(): void {
  //   this.PasssengerItems = this.passangers.get("AdultsPassengers") as FormArray;
  //   this.PasssengerItems.push(this.CreatePasssengerItem());
  // }

  // addChild(): void {
  //   this.PasssengerItems = this.passangers.get("ChildernPassengers") as FormArray;
  //   this.PasssengerItems.push(this.CreatePasssengerItem());
  // }
  addRoom() {
    const control = <FormArray>this.form.controls["Rooms"];
    control.push(this.initRoom());
  }

  addAdult(ix) {
    const control = (<FormArray>this.form.controls["Rooms"])
      .at(ix)
      .get("Adults") as FormArray;
    control.push(this.initPassanger());
  }


  addChild(ix) {
    const control = (<FormArray>this.form.controls["Rooms"])
      .at(ix)
      .get("Children") as FormArray;
    control.push(this.initPassanger());
  }

  initRoom() {
    return this.formBuilder.group({
      'Adults': this.formBuilder.array([this.initPassanger()]),
      'Children': this.formBuilder.array([this.initPassanger()])
    });
  }

  initPassanger() {
    return this.formBuilder.group({
      'Title':[''],
      'FirstName': ['', [Validators.required]],
      'MiddleName': ['', [Validators.required]],
      'LastName': ['', [Validators.required]],
      'PhoneNumber': ['', Validators.required],
      'Email': ['', [Validators.required]]
    });
  }


  Submit() {
    if (this.form.valid) {

      let rooms = <FormArray>this.form['controls'].Rooms;

      for (let index = 0; index < rooms.length; index++) {

        let Room = <FormArray>this.form['controls'].Rooms['controls'][index];
        console.log("Room Number: " + index);

        for (let x = 0; x < Room['controls']['Adults'].length; x++) {
          console.log(Room['controls']['Adults']['controls'][x].get('FirstName').value)
          console.log(Room['controls']['Adults']['controls'][x].get('LastName').value)
        }

        for (let x = 0; x < Room['controls']['Children'].length; x++) {
          console.log(Room['controls']['Children']['controls'][x].get('FirstName').value)
          console.log(Room['controls']['Children']['controls'][x].get('LastName').value)
        }


      }


    } else {
      console.log('not valid')
    }
  }

  createForm(data = []) {

    // first we add rooms
    for (let x = 1; x < data.length; x++) {
      this.addRoom();
    }


    for (let index = 0; index < data.length; index++) {
      for (let ax = 1; ax < data[index]['adults']; ax++) {
        this.addAdult(index);
      }
    }


    for (let index = 0; index < data.length; index++) {


      //remove child if it's zero 
      if (data[index]['children'].length < 1) {
        const Childcontrol = (<FormArray>this.form.controls["Rooms"])
          .at(index)
          .get("Children") as FormArray;
        Childcontrol.removeAt(0);
      } else {
        for (let ax = 1; ax < data[index]['children'].length; ax++) {
          this.addChild(index);
        }
      }

    }

  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      'Rooms': this.formBuilder.array([this.initRoom()])
    });

    this.hotelmaindetails = this.checkoutservice.selectedhotel;
    this.country = this.checkoutservice.countryName;
    this.numberOfPassangers = this.checkoutservice.numberOfpassanger;
    this.numberOfAdults = this.checkoutservice.numberOfAdults;
    this.numberOfChildren = this.checkoutservice.numberOfChildern;
    this.numberOfNights = this.checkoutservice.numberofnights;
    this.itemAdded = this.checkoutservice.itemAdded;
    this.rooms = this.checkoutservice.rooms;
    this.totalCost = this.checkoutservice.totalAmout;
    this.createForm(this.rooms);
    // for (let roomsindex = 0; roomsindex < this.rooms.length; roomsindex++) {
    //   this.currentroomname = 'room'+roomsindex;
    //   this.currentroomname = this.formBuilder.group({
    //     AdultsPassengers: this.formBuilder.array([]),
    //     ChildernPassengers: this.formBuilder.array([])
    //   }); ;
    //   for (let i = 0; i < this.rooms[roomsindex].adults; i++) {
    //   this.currentroomname = this.passangers.get("AdultsPassengers") as FormArray;
    //   this.currentroomname.push(this.CreatePasssengerItem());
    //   }
    //   for (let x = 0; x < this.rooms[roomsindex].children.length; x++) {
    //   this.currentroomname = this.passangers.get("ChildernPassengers") as FormArray;
    //   this.currentroomname.push(this.CreatePasssengerItem());
    //   }
    // }




  }
  // convenience getter for easy access to form fields
  get f() { return this.mainPassangerForm.controls; }

  //purchase
  purchase() {
    console.log(this.selectedCardType);
    console.log(this.selectedCardTypeCode);
    this.isfinished = true;
    this.submitted = true;
    this.paymentInfo={
      card_holder: this.cardHolder,
      card_type:this.selectedCardType,
      card_type_code:this.selectedCardTypeCode,
      card_number: this.cardNumber,
      Expiration_date: this.expireMonth+this.expireYear,
      CVC: this.cvc
    }
    this.purchaseservice.paymentInfo = this.paymentInfo;
    console.log('purchasing');

    // stop here if form is invalid
    if (this.passangers.invalid) {
      return;
    }

    // this.registerService.register(this.registerForm).subscribe((data) => { this.tokencheckservice.token = data['token'] });
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.mainPassangerForm.value))
   
    console.log(this.passangers);
    // this.orderservice.order(this.passangers).subscribe();
    // console.log(this.childrenForm.value.firstName);
  }



}
