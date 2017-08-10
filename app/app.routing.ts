import { LoginComponent } from './components/login/login.component';
import { PlacesComponent } from './components/places/places.component';
import { AddPlacesComponent } from './components/places/add-places.component';

export const routes = [
  { path: '', component: LoginComponent },
  { path: 'places', component: PlacesComponent },
  { path: 'add-places', component: AddPlacesComponent },
];

export const navigatableComponents = [
  LoginComponent,
  PlacesComponent,
  AddPlacesComponent
];