import { Component, OnInit, Output, Input, ViewChild, EventEmitter } from "@angular/core";

import { MapComponent } from '../../../../modules/google-sdk/components/map/map.component';
import { PlaceSearchService } from '../../../../modules/google-sdk/shared/place/search/place-search.service';
import { GeolocationService } from '../../../../shared/geolocation/geolocation.sercice';

@Component({
  moduleId: module.id,
  selector: 'kl-place-pin-search, [kl-place-pin-search]',
  templateUrl: 'place-pin-search.html'
})


export class PlacePinSearchComponent implements OnInit{
  public isReady:boolean = true;
  public place:any = {};
  public iconSearch:string = String.fromCharCode(0xf002);
  public places:Array<any> = [];
  protected searchView:string = 'map';
  protected map:MapComponent;

  @Output() findPlace = new EventEmitter();
  public constructor(private geolocation:GeolocationService, private placeSearch:PlaceSearchService) { }


  public ngOnInit() {
    this.geolocation.start();
  }

  public onMapLoaded(map) {
    console.log('onMapLoaded **********');
    this.map = map;
    this.geolocation.isReady()
      .concatMap(() => {
        this.map.center(this.geolocation.position);
        return this.placeSearch.search(this.geolocation.position)
      })
      .subscribe(
        (places) => {
          this.places = this.places.concat(places);
          console.log('places.length', places.length, 'this.place.length', this.places.length)
        }
      );
  }

  public onInfoPlace(placeId) {
    this.map.selectMarker(placeId);
  }

  public onSelectPlace(placeId:string) {
    this.placeSearch.searchById(placeId)
      .subscribe(
        (place) => {
          place.contexts = [];
          this.findPlace.next(place);
        }
      );
  }

  public onToggleSearchView() {
    this.searchView = this.searchView === 'map' ? 'name' : 'map';
  }
}