import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { Position } from 'nativescript-google-maps-sdk';

import { PlaceSearchService } from '../../../shared/place/place-search.service';

@Component({
  moduleId: module.id,
  selector: 'kl-pin-place',
  templateUrl: 'pin-place.html',
  styleUrls: ["./pin-place.common.css", "./pin-place.component.css"],
})
export class PinPlaceComponent implements OnInit{
  public iconStar:string = String.fromCharCode(0xf005);
  public isReady:boolean = false;
  
  public constructor(private placeSearch:PlaceSearchService, private route:ActivatedRoute) { }


  public ngOnInit() {
    this.isReady = true;
    this.placeSearch.searchByPositionAndName(Position.positionFromLatLng(48.8511475,2.399606700000001), 'bouion')
      .subscribe(
        (result) => console.log('result', result),
        (err) => console.log('err', err),
        () => console.log('complete')
      );
  }
}