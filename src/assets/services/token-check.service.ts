import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenCheckService  {
  token =  null;
  Userdata;
  requiredLogin: boolean= false;
  requiredLoginChange: Subject<boolean> = new Subject<boolean>();

constructor() { 
  this.requiredLoginChange.subscribe((value) => {
    this.requiredLogin = value
});
}


}
