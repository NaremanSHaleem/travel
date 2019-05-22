import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { TokenCheckService } from './token-check.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loginApi = "http://www.discountedhotels.co.uk/api/login-user";
  constructor(public http: HttpClient, private tokenservice: TokenCheckService) { }

  login(FormData: any) {
    console.log(FormData);
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const params = new HttpParams()
      .set('email', FormData.value.email)
      .set('password', FormData.value.password)

    return this.http.post(this.loginApi, params, { headers: headers });
  }
}
