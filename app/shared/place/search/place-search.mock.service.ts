import { Injectable, EventEmitter } from "@angular/core";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/of';
import {Http, Headers, RequestOptions} from "@angular/http";
import { Position } from 'nativescript-google-maps-sdk';
import * as ApplicationSettings from "application-settings";
import { ImageSource } from "image-source";

import { IPlaceSearchService, AbastractPlaceSearchService } from './place-search.service';


export interface IPlaceSearchService {
  search(position:Position):Observable<Array<any>>;
  searchByPositionAndName(position:Position, name:string):Observable<Array<any>>;
  searchById(id:string):Observable<any>;
}

@Injectable()
export class PlaceSearchMockService extends AbastractPlaceSearchService implements  IPlaceSearchService {
  public constructor(private http:Http) {
    super();
    console.log('PlaceSearchMockService constructor');
  }

  public search(position:Position):Observable<Array<any>> {
    console.log('SEARCH MOCK');
    const places = require('./place-search.mock.json');
    return Observable.of(places)
      .map(result => this.parseGoogleDoc(result));
  }

  public searchByPositionAndName(position:Position, name:string):Observable<Array<any>> {
    const doc = require('./place-search-by-name.mock.json');
    return Observable.of(doc)
      .map(doc => doc.predictions
        .map(prediction => {
          return { description: prediction.description, id: prediction.place_id, name: prediction.structured_formatting.main_text };
        }));
  }

  public searchById(id:string):Observable<any> {
    const doc = require('./place-search-by-id.mock.json');
    return Observable.of(doc)
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
}