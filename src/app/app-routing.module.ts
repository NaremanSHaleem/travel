import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HotelsListComponent } from './hotels-list/hotels-list.component';
import { HotelDetailsComponent } from './hotel-details/hotel-details.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BookingComponent } from './booking/booking.component';
import { HotelItemsWithFiltersComponent } from './Hotel-Items-withFilters/Hotel-Items-withFilters.component';

const routes: Routes = [
  {
    path: 'booking',
    component: BookingComponent,
    data: { title: 'Booking' }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: { title: 'Register' }
  },
  {
    path: 'cart',
    component: CartComponent,
    data: { title: 'Your cart' }
  },
  {
    path: 'hotels',
    component: HotelItemsWithFiltersComponent,
    data: { title: 'Hotels List' }
  },
  {
    path: 'hoteldetails/:hotelId',
    component: HotelDetailsComponent,
    data: { title: 'Hotel Details' }
  },
  {
   path: '',
   component: HomeComponent,
   data: { title: 'Hotels' }
  },
  {
    path: '**',
    component: HomeComponent,
    data: { title: 'Hotels' }
  },
  {
    path: 'home',
    component: HomeComponent,
    data: { title: 'Hotels' }
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
