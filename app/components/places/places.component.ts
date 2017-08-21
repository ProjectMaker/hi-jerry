import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from 'nativescript-angular/router';
import { PlaceStorageService } from '../../shared/place/place-storage.service';
import { PlaceMap } from '../../shared/place/place';

@Component({
  moduleId: module.id,
  selector: 'kl-places',
  templateUrl: 'places.html',
})
export class PlacesComponent implements OnInit {
  public places:Array<any> = [];
  public isReady:boolean = false;
  public iconRemove:string = String.fromCharCode(0xf056);
  public iconList = String.fromCharCode(0xf2bb);
  public iconMapMarker = String.fromCharCode(0xf041);

  constructor(private routerExtensions:RouterExtensions, private placeStorage:PlaceStorageService) {}

  public goToAddPlaces() {
    this.routerExtensions.navigate(['add-places'], { clearHistory: true });
  }

  public ngOnInit() {
    this.placeStorage.emitter.subscribe(
      (places) => {
        this.places = places;
      },
      (err) => console.log(err)
    );
    this.placeStorage.isReady()
      .subscribe(
      () => {
        this.isReady = true;
        this.placeStorage.fetch();
      },
      (err) => console.log(err),
      () => console.log('completed')
    );
  }

  public onRemove(place:PlaceMap) {
    this.placeStorage.remove(place.id);
  }
}