import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from 'nativescript-angular/router';
import { PlaceStorageService } from '../../shared/place/place-storage.service';

@Component({
  moduleId: module.id,
  selector: 'kl-places',
  templateUrl: 'places.html',
})
export class PlacesComponent implements OnInit {
  public places:Array<any> = [];
  constructor(private routerExtensions:RouterExtensions, private placeStorage:PlaceStorageService) {}

  public goToAddPlaces() {
    this.routerExtensions.navigate(['add-places'], { clearHistory: true });
  }

  public ngOnInit() {
    this.placeStorage.isReady()
      .subscribe(
      () => {
        this.placeStorage.fetch()
          .subscribe(
            (places) => {
              this.places = places;
            }
          )
      },
      (err) => console.log(err),
      () => console.log('completed')
    );
  }
}