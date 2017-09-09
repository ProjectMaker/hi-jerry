import { Injectable, EventEmitter } from "@angular/core";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';
import { UUID } from 'angular2-uuid';

export interface IPlaceStorageService {
  update(place:any):Observable<boolean>;
  insert(place:any):Observable<any>;
  remove(id:string):Observable<boolean>;
  load():Observable<Array<any>>;
  loadById(id:string):Observable<any>
}

@Injectable()
export class PlaceStorageService implements IPlaceStorageService {
  private places:Array<any> = [];
  public emitter:EventEmitter<Array<any>> = new EventEmitter();

  public constructor() {
    console.log('API CONSTRUCT');
  }

  public load():Observable<Array<any>> {
    const place = require('./place.mock.json');
    return Observable.of([place]);
  }

  public loadById(id:string):Observable<any> {
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