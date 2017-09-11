import { Injectable, EventEmitter } from "@angular/core";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/of';
import { UUID } from 'angular2-uuid';

import { IPlaceStorageService } from './place-storage.service';

@Injectable()
export class PlaceStorageMockService  implements IPlaceStorageService {
  private places:Array<any> = [];
  public emitter:EventEmitter<Array<any>> = new EventEmitter();

  public constructor() {
    console.log('API MOCK CONSTRUCT');
  }
  
  public load():Observable<Array<any>> {
    const place = require('./place.mock.json');
    return Observable.of([place]).map(places => this.places = places);
  }

  public loadById(id):Observable<any> {
    const place = require('./place.mock.json');
    return Observable.of(place);
  }

  public update(place:any):Observable<boolean> {
    const idx = this.places.findIndex(_place => _place.id === place.id);
    this.places[idx] = place;
    this.emitter.next([...this.places]);
    return Observable.of(true);
  }

  public insert(place:any):Observable<any> {
    place.id = UUID.UUID();
    this.places.push(place);
    this.emitter.next([...this.places]);
    return Observable.of(place);
  }

  public remove(id:string):Observable<boolean> {
    const idx = this.places.findIndex(_place => _place.id === id);
    this.places.splice(idx, 1);
    this.emitter.next([...this.places]);
    return Observable.of(true);
  }

  
}