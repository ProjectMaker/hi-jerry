import { Injectable, EventEmitter } from "@angular/core";
import { Position } from 'nativescript-google-maps-sdk';
import {Observable} from "rxjs/Observable";

const geolocation = require("nativescript-geolocation");

@Injectable()
export class GeolocationService {
  positionEvent:EventEmitter<Position> = new EventEmitter();
  position:Position;
  watchId:number;

  constructor() { }

  start() {
    if (this.position) return;
    this.enableLocation()
      .then(this.getLocation)
      .then((loc:Position) => {
        this.position = loc;
        this.positionEvent.emit(loc);
        this.watch();
      })
      .catch(err => console.error(JSON.stringify(err)));
  }

  isReady() {
    console.log('Geolocation.isReady');
    if (this.position) return Observable.of(this.position);
    else {
      return Observable.create(observer => {
        const interval = setInterval(() => {
          console.log('interval', this.position)
          if (this.position) {
            clearInterval(interval);
            observer.next(this.position);
            observer.complete();
          }
        }, 2000);
        return () => clearInterval(interval);
      });
    }
  }

  stop() {
    if (this.watchId) geolocation.clearWatch(this.watchId);
    this.watchId = null;
    this.position = null;
  }


  watch() {
    this.watchId = geolocation.watchLocation(
      (position:Position) => {
        this.position = position;
        this.positionEvent.emit(this.position) },
      (err) => console.error(err), {
        desiredAccuracy: 10,
        updateDistance: 10,
        minimumUpdateTime: 10000,
        //maximumAge: 60000
      }
    );
  }

  enableLocation() {
    if (!geolocation.isEnabled()) {
      console.log('Location not enabled, requesting.');
      return geolocation.enableLocationRequest();
    } else {
      return Promise.resolve(true);
    }
  }

  getLocation() {
    if (geolocation.isEnabled()) {
      return geolocation.getCurrentLocation({
        desiredAccuracy: 10,
        updateDistance: 10,
        minimumUpdateTime: 1000,
        //maximumAge: 10000
      })
    }
    return Promise.reject('Geolocation not enabled.');
  }
}
