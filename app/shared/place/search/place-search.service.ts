import { Injectable, EventEmitter } from "@angular/core";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/of';
import {Http, Headers, RequestOptions} from "@angular/http";
import { Position } from 'nativescript-google-maps-sdk';
import * as ApplicationSettings from "application-settings";
import { ImageSource } from "image-source";

const http = require('http');
const key = 'AIzaSyAC0SKQg4Ff1vtQC2cmGbD6MdPKr2LPdq4';

const TYPES = require('./place-types.json');
const URL_API_PLACE = 'https://maps.googleapis.com/maps/api/place';

export interface IPlaceSearchService {
  search(position:Position):Observable<Array<any>>;
  searchByPositionAndName(position:Position, name:string):Observable<Array<any>>;
  searchById(id:string):Observable<any>;
}

export abstract class AbastractPlaceSearchService {
  public getImgRef(ref:string):Observable<string> {
    const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&key=${key}&photoreference=${ref}`;
    return Observable.create(observer => {
      http.getImage(url).then((image:ImageSource) => {
        observer.next(image.toBase64String('jpeg'));
        observer.complete();
      })
    });
  }

  protected parseGoogleDoc(doc:any):any {
    return doc.results
      .map((doc) => {
        const place:any = {
          location: Position.positionFromLatLng(doc.geometry.location.lat, doc.geometry.location.lng),
          name: doc.name,
          address: doc.vicinity,
          type: this.rewriteType(doc.types),
          origin: 'google',
          placeId: doc.place_id,
        };
        return place;
      });
  }

  protected rewriteType(types) {
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

@Injectable()
export class PlaceSearchService extends AbastractPlaceSearchService implements  IPlaceSearchService {
  public mock:boolean = true;
  private placesRefreshEvent:EventEmitter<Array<any>> = new EventEmitter();
  public constructor(private http:Http) {
    super();
  }

  public search(position:Position):Observable<Array<any>> {
    console.log('PlaceSearcgService search');
    this.callGoogleApi(position);
    return Observable.create(observer => {
      this.placesRefreshEvent.subscribe(
        (places) => {
          observer.next(places);
        }
      );
    });
  }

  public searchByPositionAndName(position:Position, name:string):Observable<any> {
    const url= `${URL_API_PLACE}/queryautocomplete/json?key=${key}&location=${position.latitude},${position.longitude}&radius=500&input=${name}`;
    return this.http.get(url)
      .map(result => result.json())
      .map(doc => doc.predictions
        .map(prediction => {
          return { description: prediction.description, id: prediction.place_id, name: prediction.structured_formatting.main_text };
        }));
  }

  public searchById(id:string):Observable<any> {
    const url= `${URL_API_PLACE}/details/json?key=${key}&placeid=${id}`;
    return this.http.get(url)
      .map(result => result.json())
      .map(doc => {
        return {
          name: doc.result.name,
          address: doc.result.address_components,
          formattedAddress: doc.result.formatted_address,
          location: Position.positionFromLatLng(doc.result.geometry.location.lat, doc.result.geometry.location.lng),
          placeId: doc.result.place_id,
          types: doc.result.types,
          phoneNumber: doc.result.international_phone_number
        }
      });
  }

  private callGoogleApi(position:Position, pageToken?:string) {
    let url:string;
    let nextPageToken:string;
    if (!pageToken) url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${key}&location=${position.latitude},${position.longitude}&radius=25`;
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
}