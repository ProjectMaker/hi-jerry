import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptHttpModule } from "nativescript-angular";
import { ReactiveFormsModule } from '@angular/forms';

import { PlaceSearchService } from '../../shared/place/place-search.service';

import { SearchPlaceComponent } from "./components/search-place.component";
import { SearchPlaceFormComponent } from "./components/search-place-form.component";
import { SearchPlaceListComponent } from "./components/search-place-list.component";

@NgModule({
  declarations: [
    SearchPlaceComponent,
    SearchPlaceFormComponent,
    SearchPlaceListComponent,
  ],
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptHttpModule,
    ReactiveFormsModule,
  ],
  providers: [
    PlaceSearchService,
  ],
  exports: [
    SearchPlaceComponent,
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class PlaceSearchModule {}
