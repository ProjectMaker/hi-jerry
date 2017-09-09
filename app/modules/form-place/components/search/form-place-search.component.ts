import { Component, Output, EventEmitter } from "@angular/core";

@Component({
  moduleId: module.id,
  selector: 'kl-form-place-search',
  templateUrl: 'form-place-search.html',
})
export class FormPlaceSearchComponent {
  @Output() submit = new EventEmitter();
  public constructor() { }

  protected onPlaceSelected(place) {
    this.submit.next(place);
  }
}