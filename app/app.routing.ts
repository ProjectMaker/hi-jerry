import { LoginComponent } from './components/login/login.component';
import { PlacesComponent } from './components/places/places.component';
import { AddPlacesComponent } from './components/places/add-places.component';
import { PlaceDetailComponent } from './components/places/place-detail.component';

export const routes = [
  { path: '', component: LoginComponent },
  { path: 'places', component: PlacesComponent },
  { path: 'add-places', component: AddPlacesComponent },
  { path: 'place-detail', component: PlaceDetailComponent },
];

export const navigatableComponents = [
  LoginComponent,
  PlacesComponent,
  AddPlacesComponent,
  PlaceDetailComponent
];