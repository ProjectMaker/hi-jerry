import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptHttpModule } from "nativescript-angular";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { ReactiveFormsModule } from '@angular/forms';
import { TNSCheckBoxModule } from 'nativescript-checkbox/angular';

import { routes, navigatableComponents } from "./app.routing";
import { UserService } from './shared/user/user.service';
import { GeolocationService } from './shared/geolocation/geolocation.sercice';
import { PlaceSearchService } from './shared/place/place-search.service';
import { AppComponent } from "./app.component";
import { ActionBarComponent as ActionBarPlacesComponent } from './components/places/action-bar/action-bar.component';

import { FormPlaceModule } from './modules/form-place/form-place.module';
import { DropDownModule } from "nativescript-drop-down/angular";



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
    FormPlaceModule
  ],
  providers: [
    UserService,
    GeolocationService,
    PlaceSearchService,
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
