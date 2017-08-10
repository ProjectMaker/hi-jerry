import { Injectable } from "@angular/core";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/of';
import { Position } from 'nativescript-google-maps-sdk';

@Injectable()
export class PlaceSearchService {
  public mock:boolean = true;

  public search(position:Position) {
    if (this.mock) {
      const places = require('./places-search.mock.json');
      return Observable.from(places)
        .map((place:any) => {
          return {
            location: Position.positionFromLatLng(place.geometry.location.lat, place.geometry.location.lng),
            title: place.name
          }

        });
    }
  }
}