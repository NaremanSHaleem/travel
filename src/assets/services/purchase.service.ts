import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { TokenCheckService } from './token-check.service';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {


  createFolderApi = "https://tailored-travel-api-prod.herokuapp.com/folders/create";

  constructor(public http: HttpClient, private tokencheckservice: TokenCheckService) { }

  purchase(passangers) {
    console.log('purchasing service', passangers);
    let adults = passangers.value.AdultsPassengers;
    let children = passangers.value.ChildernPassengers;
    let token = this.tokencheckservice.token;
    let allpassangers = [];


    // let mainPassanger = adults[0];
    let mainPassanger = {
      "customer_type": "C",
      "title": adults[0].title,
      "last_name": adults[0].last_name,
      "first_name": adults[0].first_name,
      "branch_code": "HQ",
      "staff_code": "SYS",
      "owned_by": "SYS",
      "contact_types": [
        {
          "type": "EMAILTO",
          "contact": "user@rmail.com"
        },
        {
          "type": "HOME",
          "contact": "0987362829"
        }
      ]
    }



    console.log(adults, children, mainPassanger);
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': "Bearer" + token
    });

    const params = new HttpParams()
      .set('', '')

    return this.http.post(this.createFolderApi, params, { headers: headers });

    adults.map((obj) => {
      obj.pax_type = "ADT";
      return obj;
    })
    children.map((obj) => {
      obj.pax_type = "CHD";
      return obj;
    })

    allpassangers.push(adults);
    allpassangers.push(children);
    let addToFolderobj = [
      {
        "folderNumber": '',
        "itineraryNumber": "1",
        'foldcur': 'GBP',
        'passangers': allpassangers
      }
    ]
  }
}
