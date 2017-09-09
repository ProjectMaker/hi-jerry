import { Component, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'kl-form-place-edit',
  templateUrl: 'form-place-edit.html',
})
export class FormPlaceEditComponent {
   @Input() place:any;
}