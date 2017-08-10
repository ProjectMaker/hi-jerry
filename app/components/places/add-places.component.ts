import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from 'nativescript-angular/router';
import { GeolocationService } from '../../shared/geolocation/geolocation.sercice';

@Component({
  moduleId: module.id,
  selector: 'kl-add-places',
  templateUrl: 'add-places.html',
})
export class AddPlacesComponent implements OnInit{
  constructor(private routerExtensions:RouterExtensions, private geolocation:GeolocationService) {}

  public goToPlaces() {
    this.routerExtensions.navigate(['places'], { clearHistory: true });
  }

  public ngOnInit() {
    this.geolocation.start();
    this.geolocation.positionEvent.subscribe(
      (position:Position) => {
        console.log(JSON.stringify(position));
      });
  }
}