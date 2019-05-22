import { Component, OnInit, ElementRef } from '@angular/core';
import { TokenCheckService } from 'src/assets/services/token-check.service';
declare let $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private checktoken: TokenCheckService, private elementRef: ElementRef) {


  }
  isLoggedin = false;
  Username = '';
  elem: Element;
  ele;
  ngOnInit() {

  }

  ngAfterViewInit() {
    console.log(this.checktoken.token);
    // console.log(this.checktoken.Userdata.first_name);
    if (this.checktoken.token) {
      this.isLoggedin = true;
      this.Username = this.checktoken.Userdata.first_name;
    }

    // Mobile Mmenu
    var $menu = $("nav#menu").mmenu({
      "extensions": ["pagedim-black"],
      counters: true,
      keyboardNavigation: {
        enable: true,
        enhance: true
      },
      navbar: {
        title: 'MENU'
      },
      navbars: [{ position: 'bottom', content: ['<a href="#0">© 2018 Panagea</a>'] }]
    },
      {
        // configuration
        clone: true,
        classNames: {
          fixedElements: {
            fixed: "menu_fixed",
            sticky: "sticky"
          }
        }
      });
    var $icon = $("#hamburger");
    var API = $menu.data("mmenu");
    $icon.on("click", function () {
      API.open();
    });
    API.bind("open:finish", function () {
      setTimeout(function () {
        $icon.addClass("is-active");
      }, 100);
    });
    API.bind("close:finish", function () {
      setTimeout(function () {
        $icon.removeClass("is-active");


      }, 100);
    });

    // Header button explore
    $('a[href^="#"].btn_explore').on('click', function (e) {
      e.preventDefault();
      var target = this.hash;
      var $target = $(target);
      $('html, body').stop().animate({
        'scrollTop': $target.offset().top
      }, 800, 'swing', function () {
        window.location.hash = target;
      });
    });

  }

  mobileMenu() {
    this.elem = document.querySelector(".mm-page");
    let mobileMenu = document.querySelector("#hamburger");

    //  let blocker = document.querySelector('#mm-blocker');
    if (this.elem.classList.contains('slide-right')) {
  
      mobileMenu.classList.remove('is-active');
      this.elem.classList.remove('slide-right');
    } else { 
      this.elem.classList.add('slide-right');
    mobileMenu.classList.add('is-active'); }

  }

}
