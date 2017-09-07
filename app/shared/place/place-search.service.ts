import { Injectable, EventEmitter } from "@angular/core";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/of';
import {Http, Headers, RequestOptions} from "@angular/http";
import { Position } from 'nativescript-google-maps-sdk';
import * as ApplicationSettings from "application-settings";
import { ImageSource } from "image-source";
import { PlaceMap } from './place';

const http = require('http');
const key = 'AIzaSyAC0SKQg4Ff1vtQC2cmGbD6MdPKr2LPdq4';

const TYPES = require('./place-types.json');

@Injectable()
export class PlaceSearchService {
  public mock:boolean = false;
  private placesRefreshEvent:EventEmitter<Array<any>> = new EventEmitter();
  public constructor(private http:Http) {}

  public search(position:Position) {
    if (this.mock) return this.searchMock(position);
    else return this.searchGoogle(position);
  }

  public getImgRef(ref:string):Observable<string> {
    const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&key=${key}&photoreference=${ref}`;
    return Observable.create(observer => {
      http.getImage(url).then((image:ImageSource) => {
        observer.next(image.toBase64String('jpeg'));
        observer.complete();
      })
    });
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
    return doc.results
      .map((doc) => {
        const place:PlaceMap = {
          location: Position.positionFromLatLng(doc.geometry.location.lat, doc.geometry.location.lng),
          name: doc.name,
          address: doc.vicinity,
          type: this.rewriteType(doc.types),
          origin: 'google',
          externalId: doc.id,
          imageRefId: doc.photos ? doc.photos[0].photo_reference : '',
        };
        return place;
      });
  }
  
  private rewriteType(types) {
    let result = 'other';
    for (let type of types) {
      if ((TYPES[type] || { type: 'other' }).type !== 'other') {
        result = TYPES[type]['type'];
        break;
      }
    }
    return result;
  }
}