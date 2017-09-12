import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptHttpModule } from "nativescript-angular";
import { ReactiveFormsModule } from '@angular/forms';

import { GeolocationService } from '../../shared/geolocation/geolocation.sercice';
import providePlaceSearchService from '../../shared/place/search/provide-service';

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
    providePlaceSearchService(),
    GeolocationService
  ],
  exports: [
    SearchPlaceComponent,
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class SearchPlaceModule {}
