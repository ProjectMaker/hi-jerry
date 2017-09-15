import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptHttpModule } from "nativescript-angular";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { ReactiveFormsModule } from '@angular/forms';
import { TNSCheckBoxModule } from 'nativescript-checkbox/angular';

import { routes, navigatableComponents } from "./app.routing";
import { PipeModule } from './modules/pipes/pipe.module'
import { UserService } from './shared/user/user.service';
import { GeolocationService } from './shared/geolocation/geolocation.sercice';
import providePlaceSearchService from './modules/google-sdk/shared/place/search/provide-service';
import { AppComponent } from "./app.component";
import { ActionBarComponent as ActionBarPlacesComponent } from './components/places/shared/action-bar/action-bar.component';
import { PlaceListCardComponent } from './components/places/list/place-list-card.component';
import { PlaceFormValidationComponent } from './components/places/shared/form-validation/place-form-validation.component';

import { GoogleSdkModule } from './modules/google-sdk/google-sdk.module';
import { DropDownModule } from "nativescript-drop-down/angular";

import { PlacePinSearchComponent } from './components/places/pin/search/place-pin-search.component';

declare var GMSServices: any;
import * as platform from "platform";
if (platform.isIOS) {
  GMSServices.provideAPIKey("AIzaSyAC0SKQg4Ff1vtQC2cmGbD6MdPKr2LPdq4");
  const iqKeyboard: IQKeyboardManager = IQKeyboardManager.sharedManager();
  iqKeyboard.overrideKeyboardAppearance = true;
  iqKeyboard.keyboardAppearance = UIKeyboardAppearance.Dark;
  iqKeyboard.shouldResignOnTouchOutside = true;
  iqKeyboard.shouldShowTextFieldPlaceholder = true;
}


@NgModule({
  declarations: [
    AppComponent,
    ActionBarPlacesComponent,
    PlaceListCardComponent,
    PlacePinSearchComponent,
    PlaceFormValidationComponent,
    ...navigatableComponents
  ],
  bootstrap: [AppComponent],
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptHttpModule,
    NativeScriptRouterModule,
    NativeScriptRouterModule.forRoot(routes),
    TNSCheckBoxModule,
    ReactiveFormsModule,
    DropDownModule,
    GoogleSdkModule,
    PipeModule,
  ],
  providers: [
    UserService,
    GeolocationService,
    providePlaceSearchService(),
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
