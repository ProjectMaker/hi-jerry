import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptHttpModule } from "nativescript-angular";
import { ReactiveFormsModule } from '@angular/forms';

import { placePipes } from './components/place-context.pipe';
import { FormPlaceValidationComponent } from "./components/validation/form-place-validation.component";

@NgModule({
  declarations: [
    ...placePipes,
    FormPlaceValidationComponent,
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
    FormPlaceValidationComponent
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class FormPlaceModule {}
