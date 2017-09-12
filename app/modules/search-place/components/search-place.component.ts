import { Component, OnInit, Output, EventEmitter } from "@angular/core";

import { GeolocationService } from '../../../shared/geolocation/geolocation.sercice';

@Component({
  moduleId: module.id,
  selector: 'kl-search-place',
  templateUrl: 'search-place.html',
  styleUrls: ["./search-place.common.css", "./search-place.component.css"],
})
export class SearchPlaceComponent implements OnInit{
  public isReady:boolean = false;
  public places:Array<any> = [];

  @Output() selected = new EventEmitter();
  public constructor(private geolocation:GeolocationService) { }


  public ngOnInit() {
    this.geolocation.start();
    this.geolocation.isReady()
      .subscribe(
        (position:Position) => {
          this.isReady = true;
        },
        (err) => console.log(err)
      );
  }

  protected onSearchSubmit(places) {
    this.places = places;
  }

  protected onSelectedPlace(place) {
    this.selected.next(place);
  }
}