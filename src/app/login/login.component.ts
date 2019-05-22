import { Component, OnInit, } from '@angular/core';
import { LoginService } from 'src/assets/services/login.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TokenCheckService } from 'src/assets/services/token-check.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import {Location} from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  invalid: any;
  errorInputs = false;
  logininWarning = false;
  formvalues;
  // username;
  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private loginservice:LoginService, 
    private tokencheckservice: TokenCheckService,
    private _location: Location) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loginservice.login(this.loginForm) .pipe(first())
        .subscribe(
            data => {
              this.tokencheckservice.token = data['token']; 
              this.tokencheckservice.Userdata = data['profile'];
              // if(this.router.url == "/login." ){
              //   this._location.back();
              // }else
                 this.router.navigate(['/']);
      
            },
            error => {
                // this.invalid.error(error);
                this.errorInputs = true;
                // this.loading = false;
            });
        
        // .subscribe((data) => { this.tokencheckservice.token = data['token'];
        // this.router.navigate(['/home']);
        //  this.tokencheckservice.username = data['profile']['first_name']

      //  });
        // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.loginForm.value))      
    }
}
