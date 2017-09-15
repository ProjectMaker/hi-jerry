import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptHttpModule } from "nativescript-angular";
import { ReactiveFormsModule } from '@angular/forms';

import providePlaceSearchService from './shared/place/search/provide-service';

import { placePipes } from '../../shared/pipes/place.pipes';
import { MapComponent } from "./components/map/map.component";
import { ListViewSearchComponent } from "./components/list-view-search-place/list-view-search-place.component";
import { SearchPlaceListComponent } from './components/search-place/search-place-list.component';
import { SearchPlaceFormComponent } from './components/search-place/search-place-form.component';
import { SearchPlaceComponent } from "./components/search-place/search-place.component";

@NgModule({
  declarations: [
    ...placePipes,
    MapComponent,
    ListViewSearchComponent,
    SearchPlaceComponent,
    SearchPlaceFormComponent,
    SearchPlaceListComponent
  ],
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptHttpModule,
    ReactiveFormsModule,
  ],
  providers: [
    providePlaceSearchService()
  ],
  exports: [
    MapComponent,
    ListViewSearchComponent,
    SearchPlaceComponent
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class GoogleSdkModule {}
