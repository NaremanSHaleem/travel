import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  registerapi="https://www.stamped.travel/api/register-user";
  
  registeredFormData;
constructor(public http: HttpClient) { }

register(FormData: any){
console.log(FormData.value);
// const headers = new HttpHeaders({
//   'Content-Type': 'application/x-www-form-urlencoded'
// });

const params = new HttpParams()
  .set('email', FormData.value.email  )
  .set('name', FormData.value.firstName)
  .set('password', FormData.value.password)

  return this.http.post(this.registerapi, params);
}

}
