import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptHttpModule } from "nativescript-angular";
import { ReactiveFormsModule } from '@angular/forms';

import { MapComponent } from "./components/map/map.component";

@NgModule({
  declarations: [
    MapComponent,
  ],
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptHttpModule,
    ReactiveFormsModule,
  ],
  providers: [

  ],
  exports: [
    MapComponent,
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class GoogleSdkModule {}
