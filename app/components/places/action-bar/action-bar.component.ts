import { Component, Input } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
  moduleId: module.id,
  selector: 'kl-places-action-bar',
  templateUrl: 'action-bar.html',
})
export class ActionBarComponent {
  @Input() activePage:string;

  public constructor(private routerExtension:RouterExtensions) { }

  protected goToPlaces() {
    if ( this.activePage !== 'list') this.routerExtension.navigate(['places'], { clearHistory: true });
  }

  protected goToAddPlaces() {
    if ( this.activePage !== 'pin') this.routerExtension.navigate(['pin-places'], { clearHistory: true });
  }
}