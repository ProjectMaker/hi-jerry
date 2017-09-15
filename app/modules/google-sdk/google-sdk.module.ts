import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptHttpModule } from "nativescript-angular";
import { ReactiveFormsModule } from '@angular/forms';

import { PipeModule } from '../pipes/pipe.module'
import providePlaceSearchService from './shared/place/search/provide-service';

import { MapComponent } from "./components/map/map.component";
import { ListViewSearchComponent } from "./components/list-view-search-place/list-view-search-place.component";
import { SearchPlaceListComponent } from './components/search-place/search-place-list.component';
import { SearchPlaceFormComponent } from './components/search-place/search-place-form.component';
import { SearchPlaceComponent } from "./components/search-place/search-place.component";

declare var GMSServices: any;
import * as platform from "platform";
if (platform.isIOS) {
  GMSServices.provideAPIKey("AIzaSyAC0SKQg4Ff1vtQC2cmGbD6MdPKr2LPdq4");
}

@NgModule({
  declarations: [
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
    PipeModule,
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
