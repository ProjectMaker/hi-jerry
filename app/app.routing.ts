import { LoginComponent } from './components/login/login.component';
import { PlacesComponent } from './components/places/places.component';

export const routes = [
  { path: '', component: LoginComponent },
  { path: 'places', component: PlacesComponent },
];

export const navigatableComponents = [
  LoginComponent,
  PlacesComponent
];