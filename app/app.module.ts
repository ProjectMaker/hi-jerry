import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptHttpModule } from "nativescript-angular";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { routes, navigatableComponents } from "./app.routing";

import { UserService } from './shared/user/user.service';
import { GeolocationService } from './shared/geolocation/geolocation.sercice';
import { AppComponent } from "./app.component";

@NgModule({
  declarations: [
    AppComponent,
    ...navigatableComponents
  ],
  bootstrap: [AppComponent],
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptHttpModule,
    NativeScriptRouterModule,
    NativeScriptRouterModule.forRoot(routes),
  ],
  providers: [
    UserService,
    GeolocationService
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
