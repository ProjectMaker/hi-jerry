import { Component } from "@angular/core";
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
  moduleId: module.id,
  selector: 'kl-add-places',
  templateUrl: 'add-places.html',
})
export class AddPlacesComponent {
  constructor(private routerExtensions:RouterExtensions) {}
  
  public goToPlaces() {
    this.routerExtensions.navigate(['places'], { clearHistory: true });
  }
}