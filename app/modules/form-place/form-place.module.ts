import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptHttpModule } from "nativescript-angular";
import { ReactiveFormsModule } from '@angular/forms';

import { placePipes } from './components/place-context.pipe';
import { PlaceSearchService } from '../../shared/place/place-search.service';
import { FormPlaceAddComponent } from "./components/add/form-place-add.component";
import { FormPlaceValidationComponent } from "./components/validation/form-place-validation.component";
import { PlaceSearchModule } from "../search-place/search-place.module";

@NgModule({
  declarations: [
    ...placePipes,
    FormPlaceValidationComponent,
    FormPlaceAddComponent,
  ],
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptHttpModule,
    ReactiveFormsModule,
    PlaceSearchModule
  ],
  providers: [
    PlaceSearchService,
  ],
  exports: [
    FormPlaceAddComponent,
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class FormPlaceModule {}
