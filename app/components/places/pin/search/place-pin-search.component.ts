import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Observable } from "rxjs/Observable";


import { MapComponent } from '../../../../modules/google-sdk/components/map/map.component';
import { PlaceSearchService } from '../../../../shared/place/search/place-search.service';
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

  @ViewChild("map") mapElt: MapComponent;
  public constructor(private geolocation:GeolocationService, private placeSearch:PlaceSearchService) { }


  public ngOnInit() {
    this.geolocation.start();
  }

  public onMapLoaded() {
    console.log('onMapLoaded **********');
    this.geolocation.isReady()
      .concatMap(() => {
        this.mapElt.center(this.geolocation.position);
        return this.placeSearch.search(this.geolocation.position)
      })
      .subscribe(
        (places) => {
          this.places = this.places.concat(places);
          console.log('places.length', places.length, 'this.place.length', this.places.length)
        }
      );
  }

  protected onPlaceSelected(place) {
    console.log('place', JSON.stringify(place));
  }

  protected onToggleSearchView() {
    this.searchView = this.searchView === 'map' ? 'name' : 'map';
    console.log('onToggleSearchView()', this.searchView);
  }

  public onInfoPlace(place) {
    this.mapElt.selectMarker(place);
    console.log(JSON.stringify(place));
  }

  public onSelectPlace(place) {

  }
}