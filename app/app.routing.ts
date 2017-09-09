import { LoginComponent } from './components/login/login.component';
import { PlacesComponent } from './components/places/places.component';
import { PinPlaceComponent } from './components/places/pin/pin-place.component';
import { PlaceDetailComponent } from './components/places/detail/places-detail.component';

export const routes = [
  { path: 'pin-places', component: PinPlaceComponent },
  { path: '', component: PlacesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'places', component: PlacesComponent },
  { path: 'place-detail/:id', component: PlaceDetailComponent }
];

export const navigatableComponents = [
  LoginComponent,
  PlacesComponent,
  PinPlaceComponent,
  PlaceDetailComponent
];