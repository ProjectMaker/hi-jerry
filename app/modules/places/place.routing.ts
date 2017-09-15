import { PlaceListComponent } from './components/list/place-list.component';
import { PinPlaceComponent } from './components/pin/pin-place.component';
import { PlaceDetailComponent } from './components/detail/place-detail.component';

export const routes = [
  { path: 'pin-places', component: PinPlaceComponent },
  { path: '', component: PinPlaceComponent },
  { path: 'places', component: PlaceListComponent },
  { path: 'place-detail/:id', component: PlaceDetailComponent }
];

export const navigatableComponents = [
  PlaceListComponent,
  PinPlaceComponent,
  PlaceDetailComponent
];