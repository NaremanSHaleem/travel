import { Component, OnInit } from '@angular/core';
import { FormArray, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { OrderService } from 'src/assets/services/order.service';
import { CheckoutService } from 'src/assets/services/checkout.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  isfinished = false;
  itemAdded = false;
  tourdetails;
  numberOfPassangers;
  Arr = Array;
  Arr2 = Array;
  numberOfAdults=1;
  numberOfChildren =0;
  mainPassangerForm: FormGroup;
  childrenForm: FormGroup;
  submitted = false;
  formdata;
  passangers: FormGroup;

  PasssengerItems;


  constructor(private checkoutservice: CheckoutService,
    private formBuilder: FormBuilder,
    private orderservice: OrderService) {
      this.passangers = this.formBuilder.group({
        AdultsPassengers: this.formBuilder.array([]),
        ChildernPassengers: this.formBuilder.array([])
      });
  }

  CreatePasssengerItem(): FormGroup {
    return this.formBuilder.group({
      title: [""],
      first_name: ["", Validators.required],
      last_name: ["", Validators.required],

      dateOfBirth: ["", [Validators.required]]
    });
  }

  addAdult(): void {
    this.PasssengerItems = this.passangers.get("AdultsPassengers") as FormArray;
    this.PasssengerItems.push(this.CreatePasssengerItem());
  }

  addChild(): void {
    this.PasssengerItems = this.passangers.get("ChildernPassengers") as FormArray;
    this.PasssengerItems.push(this.CreatePasssengerItem());
  }

  ngOnInit() {
    this.tourdetails = this.checkoutservice.selectedtour;
    this.numberOfPassangers = this.checkoutservice.numberOfpassanger;
    this.numberOfAdults = this.checkoutservice.numberOfAdults;
    this.numberOfChildren = this.checkoutservice.numberOfChildern;
    this.itemAdded = this.checkoutservice.itemAdded;

 
    for (let i = 0; i <= this.numberOfAdults-1  ; i++) {
      this.addAdult();
    }

    for (let i = 0; i <= this.numberOfChildren -1 ; i++) {
      this.addChild();
    }



  }
  // convenience getter for easy access to form fields
  get f() { return this.mainPassangerForm.controls; }


  //purchase
  purchase() {
    this.isfinished = true;
    this.submitted = true;


    // stop here if form is invalid
    if (this.passangers.invalid) {
      return;
    }

    // this.registerService.register(this.registerForm).subscribe((data) => { this.tokencheckservice.token = data['token'] });
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.mainPassangerForm.value))
    console.log('purchasing');
    console.log(this.passangers);
    this.orderservice.order(this.passangers).subscribe();
    // console.log(this.childrenForm.value.firstName);
  }



}
