import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptHttpModule } from "nativescript-angular";
import { ReactiveFormsModule } from '@angular/forms';

import { routes, navigatableComponents } from './form-place.routes';
import { placePipes } from './components/place-context.pipe';
import { PlaceSearchService } from '../../shared/place/place-search.service';
import { FormPlaceAddComponent } from './components/add/form-place-add.component';
import { FormPlaceEditComponent } from './components/edit/form-place-edit.component';
import { FormPlaceSearchComponent } from "./components/search/form-place-search.component";
import { FormPlaceValidationComponent } from "./components/validation/form-place-validation.component";
import { SearchPlaceModule } from "../search-place/search-place.module";

@NgModule({
  declarations: [
    ...placePipes,
    FormPlaceValidationComponent,
    FormPlaceSearchComponent,
    FormPlaceAddComponent,
    FormPlaceEditComponent,FormPlaceEditComponent
  ],
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptHttpModule,
    ReactiveFormsModule,
    SearchPlaceModule,
    NativeScriptRouterModule.forRoot(routes),
  ],
  providers: [
    PlaceSearchService,
  ],
  exports: [
    FormPlaceAddComponent,
    FormPlaceEditComponent
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class FormPlaceModule {}
