import { LoginComponent } from './components/login/login.component';
import { PlacesComponent } from './components/places/places.component';
import { AddPlacesComponent } from './components/places/add-places.component';
import { PlaceDetailComponent } from './components/places/place-detail.component';
import { PlaceComponent } from './components/places/place.component';
import { PinPlaceComponent } from './components/places/pin/pin-place.component';

export const routes = [
  { path: 'pin-place', component: PinPlaceComponent },
  { path: 'place', component: PlaceComponent },
  { path: 'login', component: LoginComponent },
  { path: 'places', component: PlacesComponent },
  { path: 'add-places', component: AddPlacesComponent },
  { path: 'place-detail', component: PlaceDetailComponent },
];

export const navigatableComponents = [
  PlaceComponent,
  LoginComponent,
  PlacesComponent,
  AddPlacesComponent,
  PlaceDetailComponent,
  PinPlaceComponent
];