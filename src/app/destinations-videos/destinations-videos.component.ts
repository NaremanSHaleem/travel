import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-destinations-videos',
  templateUrl: './destinations-videos.component.html',
  styleUrls: ['./destinations-videos.component.css']
})
export class DestinationsVideosComponent implements OnInit {

  urlPath = environment.urlPath;

  constructor() { }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items:4
      }
    },
    nav: true
  }
  ngOnInit() {
    for (let index = 0; index < document.getElementsByClassName('owl-stage-outer').length; index++) {
       document.getElementsByClassName('owl-stage-outer')[index].classList.add('h300');
      
    }
    
  }

}
