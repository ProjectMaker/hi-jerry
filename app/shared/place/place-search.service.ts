import { Injectable, EventEmitter } from "@angular/core";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/of';
import {Http, Headers, RequestOptions} from "@angular/http";
import { Position } from 'nativescript-google-maps-sdk';
import { PlaceMap } from './place';

@Injectable()
export class PlaceSearchService {
  public mock:boolean = true;
  private placesRefreshEvent:EventEmitter<Array<any>> = new EventEmitter();
  public constructor(private http:Http) {}

  public search(position:Position) {
    if (this.mock) return this.searchMock(position);
    else return this.searchGoogle(position);
  }
  private searchMock(position:Position) {
    if (this.mock) {
      const places = require('./place-search.mock.json');
      return Observable.of(places)
        .map(result => this.parseGoogleDoc(result));
    }
  }

  private searchGoogle(position:Position) {
    this.callGoogleApi(position);
    return Observable.create(observer => {
      this.placesRefreshEvent.subscribe(
        (places) => {
          observer.next(places);
        }
      );
    });
  }

  private callGoogleApi(position:Position, pageToken?:string) {
    const key = 'AIzaSyAC0SKQg4Ff1vtQC2cmGbD6MdPKr2LPdq4';
    let url:string;
    let nextPageToken:string;
    if (!pageToken) url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${key}&location=${position.latitude},${position.longitude}&radius=500`;
    else url = url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${key}&pagetoken=${pageToken}`;
    this.http.get(url)
      .map(result => {
        const doc = result.json();
        //console.log(doc.status);
        if (doc.next_page_token) nextPageToken = doc.next_page_token;
        return doc;
      })
      .map(result => this.parseGoogleDoc(result))
      .subscribe(
        (places => {
          this.placesRefreshEvent.emit(places);
          if (nextPageToken) {
            setTimeout(() => this.callGoogleApi(position, nextPageToken), 2500);
          }
        })
      )
  }

  private parseGoogleDoc(doc:any):any {
    return doc.results.filter(place => place.types.indexOf('bar') >= 0 || place.types.indexOf('restaurant') >= 0)
      .map((doc) => {
        const place:PlaceMap = {
          id: null,
          location: Position.positionFromLatLng(doc.geometry.location.lat, doc.geometry.location.lng),
          name: doc.name,
          address: doc.vicinity,
          type: doc.types.indexOf('bar') >= 0 ? 'bar' : 'restaurant',
          origin: 'google',
          externalId: doc.id,
        }
        return place;
      });
  }
}