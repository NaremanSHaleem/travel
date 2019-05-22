import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../../assets/services/must-match.validator';
import { RegisterService } from 'src/assets/services/register.service';
import { TokenCheckService } from 'src/assets/services/token-check.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;


  constructor(private formBuilder: FormBuilder, 
    private registerService: RegisterService, 
    private tokencheckservice: TokenCheckService,
    private router:  Router) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    console.log('submitting');
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.registerService.register(this.registerForm).subscribe(
      (data) => { 

      this.tokencheckservice.token = data['token'];
      this.router.navigate(['/login']);
    }, (error) => {
      alert('Please Enter valid data' + error);
    });
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
  }

}
