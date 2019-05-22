import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AgmCoreModule } from '@agm/core';
import { HotelsListComponent } from './hotels-list/hotels-list.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HotelDetailsComponent } from './hotel-details/hotel-details.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OrderFinishedComponent } from './order-finished/order-finished.component';
import { Ng5SliderModule } from 'ng5-slider';
import { HotelItemsWithFiltersComponent } from './Hotel-Items-withFilters/Hotel-Items-withFilters.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MomentModule } from 'ngx-moment';

@NgModule({
   declarations: [
      AppComponent,
      HotelsListComponent,
      HeaderComponent,
      FooterComponent,
      HotelDetailsComponent,
      HomeComponent,
      CartComponent,
      OrderFinishedComponent,
      HotelItemsWithFiltersComponent,
      LoginComponent,
      RegisterComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      FormsModule,
      HttpClientModule,
      NgbModule,
      ReactiveFormsModule,
      Ng5SliderModule,
      InfiniteScrollModule,
      MomentModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
