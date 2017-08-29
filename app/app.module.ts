import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptHttpModule } from "nativescript-angular";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { TNSCheckBoxModule } from 'nativescript-checkbox/angular';

import { routes, navigatableComponents } from "./app.routing";
import { UserService } from './shared/user/user.service';
import { GeolocationService } from './shared/geolocation/geolocation.sercice';
import { PlaceSearchService } from './shared/place/place-search.service';
import { PlaceStorageService } from './shared/place/place-storage.service';
import { AppComponent } from "./app.component";
import { PlaceContextCheckedPipe } from './components/places/place-context.pipe';

declare var GMSServices: any;
import * as platform from "platform";
if (platform.isIOS) { GMSServices.provideAPIKey("AIzaSyAC0SKQg4Ff1vtQC2cmGbD6MdPKr2LPdq4"); }

@NgModule({
  declarations: [
    AppComponent,
    PlaceContextCheckedPipe,
    ...navigatableComponents
  ],
  bootstrap: [AppComponent],
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptHttpModule,
    NativeScriptRouterModule,
    NativeScriptRouterModule.forRoot(routes),
    TNSCheckBoxModule
  ],
  providers: [
    UserService,
    GeolocationService,
    PlaceSearchService,
    PlaceStorageService
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
