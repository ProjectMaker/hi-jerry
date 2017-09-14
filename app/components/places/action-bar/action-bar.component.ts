import { Component, Input } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
  moduleId: module.id,
  selector: 'kl-places-action-bar, [kl-places-action-bar]',
  templateUrl: 'action-bar.html',
})
export class ActionBarComponent {
  
  public constructor(private routerExtension:RouterExtensions) { }

  protected goToPlaces() {
    this.routerExtension.navigate(['places'], { clearHistory: true });
  }

  protected goToAddPlaces() {
    this.routerExtension.navigate(['pin-places'], { clearHistory: true });
  }
}