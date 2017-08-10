import { Component, ElementRef, ViewChild } from "@angular/core";
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
  moduleId: module.id,
  selector: 'kl-places',
  templateUrl: 'places.html',
})
export class PlacesComponent {
  constructor(private routerExtensions:RouterExtensions) {}

  public goToAddPlaces() {
    this.routerExtensions.navigate(['add-places'], { clearHistory: true });
  }
}