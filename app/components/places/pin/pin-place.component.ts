import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Observable } from "rxjs/Observable";


import { MapComponent } from '../../../modules/google-sdk/components/map/map.component';
import { PlaceSearchService } from '../../../shared/place/search/place-search.service';
import { GeolocationService } from '../../../shared/geolocation/geolocation.sercice';

@Component({
  moduleId: module.id,
  selector: 'kl-pin-place',
  templateUrl: 'pin-place.html',
  styleUrls: ["./pin-place.common.css", "./pin-place.component.css"],
})

export class PinPlaceComponent implements OnInit{
  public isReady:boolean = true;
  public step:string = 'find';
  public place:any = {};
  public iconSearch:string = String.fromCharCode(0xf002);
  public places:Array<any> = [];

  @ViewChild("map") mapElt: MapComponent;
  public constructor(private geolocation:GeolocationService, private placeSearch:PlaceSearchService) { }


  public ngOnInit() {

  }
}