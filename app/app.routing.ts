import { LoginComponent } from './components/login/login.component';
import { PlacesComponent } from './components/places/places.component';
import { PinPlaceComponent } from './components/places/pin/pin-place.component';

export const routes = [
  { path: 'pin-places', component: PinPlaceComponent },
  { path: '', component: PinPlaceComponent },
  { path: 'login', component: LoginComponent },
  { path: 'places', component: PlacesComponent },
];

export const navigatableComponents = [
  LoginComponent,
  PlacesComponent,
  PinPlaceComponent
];