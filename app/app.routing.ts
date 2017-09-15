import { LoginComponent } from './components/login/login.component';
import { PlaceListComponent } from './components/places/list/place-list.component';
import { PinPlaceComponent } from './components/places/pin/pin-place.component';
import { PlaceDetailComponent } from './components/places/detail/place-detail.component';

export const routes = [
  { path: 'pin-places', component: PinPlaceComponent },
  { path: '', component: PinPlaceComponent },
  { path: 'login', component: LoginComponent },
  { path: 'places', component: PlaceListComponent },
  { path: 'place-detail/:id', component: PlaceDetailComponent }
];

export const navigatableComponents = [
  LoginComponent,
  PlaceListComponent,
  PinPlaceComponent,
  PlaceDetailComponent
];