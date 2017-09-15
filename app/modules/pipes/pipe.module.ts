import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { pipes } from './place';

@NgModule({
  declarations: [
    ...pipes,
  ],
  imports: [
    NativeScriptModule,
  ],
  providers: [
  ],
  exports: [
    ...pipes
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class PipeModule {}
