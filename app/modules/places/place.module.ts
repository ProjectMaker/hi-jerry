import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptHttpModule } from "nativescript-angular";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { ReactiveFormsModule } from '@angular/forms';
import { TNSCheckBoxModule } from 'nativescript-checkbox/angular';

import { routes, navigatableComponents } from "./place.routing";
import { PipeModule } from '../pipes/pipe.module'
import { GeolocationService } from '../../shared/geolocation/geolocation.sercice';
import providePlaceSearchService from '../google-sdk/shared/place/search/provide-service';

import { GoogleSdkModule } from '../google-sdk/google-sdk.module';

import { PlacePinSearchComponent } from './components/pin/search/place-pin-search.component';
import { ActionBarComponent as ActionBarPlacesComponent } from './components/shared/action-bar/action-bar.component';
import { PlaceListCardComponent } from './components/list/place-list-card.component';
import { PlaceFormValidationComponent } from './components/shared/form-validation/place-form-validation.component';

@NgModule({
  declarations: [
    ActionBarPlacesComponent,
    PlaceListCardComponent,
    PlacePinSearchComponent,
    PlaceFormValidationComponent,
    ...navigatableComponents
  ],
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptHttpModule,
    NativeScriptRouterModule,
    NativeScriptRouterModule.forRoot(routes),
    TNSCheckBoxModule,
    ReactiveFormsModule,
    GoogleSdkModule,
    PipeModule,
  ],
  providers: [
    GeolocationService,
    providePlaceSearchService(),
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class PlaceModule {}
