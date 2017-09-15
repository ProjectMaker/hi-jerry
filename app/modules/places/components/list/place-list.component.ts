import { Component, OnInit, Input } from "@angular/core";
import { RouterExtensions } from 'nativescript-angular/router';
import providePlaceStorageService from '../../../../shared/place/storage/provide-service';
import { PlaceStorageService } from '../../../../shared/place/storage/place-storage.service';
import { PlaceImgPlaceholder } from '../../../../shared/place/place';

const dialogs = require("ui/dialogs");

@Component({
  moduleId: module.id,
  selector: 'kl-place-list',
  templateUrl: 'place-list.html',
  providers: [providePlaceStorageService()]
})
export class PlaceListComponent implements OnInit {
  public places:Array<any> = [];
  public isReady:boolean = true;
  public iconRemove:string = String.fromCharCode(0xf056);
  public imageSource1:string = PlaceImgPlaceholder;

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
    this.placeStorage.load()
      .subscribe((places) => { this.places = places; });
  }

  public onRemove(place:any) {
    dialogs.confirm(`Remove ${place.name}`).then((result) => {
      if (result === true) this.placeStorage.remove(place._id).subscribe(result => console.log(result), err => console.log(err));
    });
  }
}