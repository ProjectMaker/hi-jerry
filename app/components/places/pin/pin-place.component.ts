import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";

import { LoadingIndicator } from "nativescript-loading-indicator";

import { PlacePinSearchComponent } from './search/place-pin-search.component';
import { PlaceSearchService } from '../../../modules/google-sdk/shared/place/search/place-search.service';
import { GeolocationService } from '../../../shared/geolocation/geolocation.sercice';
import providePlaceStorageService from '../../../shared/place/storage/provide-service';
import { PlaceStorageService } from '../../../shared/place/storage/place-storage.service';

@Component({
  moduleId: module.id,
  selector: 'kl-pin-place',
  templateUrl: 'pin-place.html',
  styleUrls: ["./pin-place.common.css", "./pin-place.component.css"],
  providers: [providePlaceStorageService()]
})

export class PinPlaceComponent implements OnInit{
  public isReady:boolean = true;
  public step:string = 'find';
  public place:any = {};
  public iconSearch:string = String.fromCharCode(0xf002);
  public places:Array<any> = [];

  @ViewChild("search") searchElt: PlacePinSearchComponent;
  public constructor(private geolocation:GeolocationService, private placeSearch:PlaceSearchService, private placeStorage:PlaceStorageService) { }


  public ngOnInit() {

  }

  public onFindPlace(place:any) {
    this.place = place;
    this.step = 'validation';
  }

  public onToggleSearchView() {
    this.searchElt.onToggleSearchView();
  }

  public onSubmit() {
    const loader = new LoadingIndicator();
    loader.show({
      message: 'process ...',
      ios: {
        color: '#FFFFFF',
        backgroundColor: '#000000',
      }
    });

    this.placeStorage.insert(this.place).subscribe(
      (place) => {
        console.log(place);
        this.place = place;
        loader.hide()
      },
      (err) => console.log(err)
    );
  }
}