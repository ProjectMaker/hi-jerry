import { FormPlaceSearchComponent } from './components/search/form-place-search.component';
import { FormPlaceValidationComponent } from './components/validation/form-place-validation.component';

export const routes = [
  { path: '', component: FormPlaceSearchComponent },
  { path: 'add-place', component: FormPlaceSearchComponent },
  { path: 'add-place-validation/:id/:origin', component: FormPlaceValidationComponent }
]
export const navigatableComponents = [
  FormPlaceSearchComponent,
  FormPlaceValidationComponent
];

