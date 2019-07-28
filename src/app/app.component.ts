import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TokenCheckService } from 'src/assets/services/token-check.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'hotels-app';
  @Input() loginIsRequired: Boolean ;

  //  loginIsRequired= true  ;
  constructor(  private router: Router,
    private route: ActivatedRoute,
    private tokenChecker: TokenCheckService){
      // this.loginIsRequired =this.tokenChecker.requiredLogin;
  }
  get routerURL(){
    return this.router.url;
  }
  ngOnInit() {
    this.loginIsRequired =this.tokenChecker.requiredLogin;
  }
  ngDoCheck(){
    this.loginIsRequired =this.tokenChecker.requiredLogin;
  }
  closePopup(){
    console.log('closepopup');
    this.tokenChecker.requiredLogin= false;
  }
  goLogin(){
    this.tokenChecker.requiredLogin= false;
    this.router.navigate(['/login']);
  }
}
