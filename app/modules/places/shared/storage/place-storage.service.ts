import { Injectable, EventEmitter } from "@angular/core";
import {Http, Response} from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';
import { UUID } from 'angular2-uuid';

const dialogs = require("ui/dialogs");

export interface IPlaceStorageService {
  update(place:any):Observable<boolean>;
  insert(place:any):Observable<any>;
  remove(id:string):Observable<boolean>;
  load():Observable<Array<any>>;
  loadById(id:string):Observable<any>
}

import { Config } from '../../../../shared/config';
const DOMAIN_API = Config.localApi ? 'localhost:3000' : Config.domainApi;
const URL_PLACE_API = `http://${DOMAIN_API}/api/place`;

@Injectable()
export class PlaceStorageService implements IPlaceStorageService {
  private places:Array<any> = [];
  public emitter:EventEmitter<Array<any>> = new EventEmitter();

  public constructor(private http:Http) {
    console.log('API CONSTRUCT');
  }

  public load():Observable<Array<any>> {
    return this.http.get(URL_PLACE_API)
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  public loadById(id:string):Observable<any> {
    return this.http.get(`${URL_PLACE_API}/${id}`)
      .map(res => res.json())
      .catch(this.handleErrors)
  }

  public update(place:any):Observable<boolean> {
    console.log(JSON.stringify(place));
    return this.http.put(URL_PLACE_API, place)
      .map(res => res.json())
      .map(place => {
        const idx = this.places.findIndex(_place => _place.id === place.id);
        this.places[idx] = place;
        this.emitter.next([...this.places]);

        return place;
      })
      .catch(this.handleErrors)
  }

  public insert(place:any):Observable<any> {
    return this.http.post(URL_PLACE_API, place)
      .map(res => res.json())
      .map(place => {
        this.places.push(place);
        this.emitter.next([...this.places]);

        return place;
      })
      .catch(this.handleErrors);
  }

  public remove(id:string):Observable<boolean> {
    return this.http.delete(`${URL_PLACE_API}/${id}`)
      .map(res => res.json())
      .map(res => {
        const idx = this.places.findIndex(place => place._id === id);
        this.places.splice(idx, 1);
        this.emitter.next([...this.places]);
        return true;
      })
      .catch(this.handleErrors)
  }

  private handleErrors(error: Response) {
    dialogs.alert({
      title: "API ERROR",
      message: error.toString(),
      okButtonText: "OK"
    }).then(function () {

    });
    return Observable.throw(error);
  }
}