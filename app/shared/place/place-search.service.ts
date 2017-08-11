import { Injectable } from "@angular/core";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/of';
import {Http, Headers, RequestOptions} from "@angular/http";
import { Position } from 'nativescript-google-maps-sdk';

@Injectable()
export class PlaceSearchService {
  public mock:boolean = false;

  public constructor(private http:Http) {}

  public search(position:Position) {
    if (this.mock) return this.searchMock(position);
    else return this.searchGoogle(position);
  }
  private searchMock(position:Position) {
    if (this.mock) {
      const places = require('./place-search.mock.json');
      return Observable.of(places)
        .map((place:any) => {
          return {
            location: Position.positionFromLatLng(place.geometry.location.lat, place.geometry.location.lng),
            title: place.name
          }

        });
    }
  }

  private searchGoogle(position:Position) {
    const key = 'AIzaSyAC0SKQg4Ff1vtQC2cmGbD6MdPKr2LPdq4';
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${key}&location=${position.latitude},${position.longitude}&radius=500`;
    //return;
    return this.http.get(url)
      .map(result => result.json())
      .map((result:any) => {
        const places = result.results.map((place) => {
          return {
            location: Position.positionFromLatLng(place.geometry.location.lat, place.geometry.location.lng),
            title: place.name
          }
        });

        return places;
      })
      .do(result => console.log(JSON.stringify(result)));
  }
}