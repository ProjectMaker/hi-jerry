import { Injectable } from "@angular/core";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/of';
import { Position } from 'nativescript-google-maps-sdk';
const Sqlite = require("nativescript-sqlite");

import { PlaceMap } from './place';

@Injectable()
export class PlaceStorageService {
  private database:any;
  private error:boolean = false;
  public places:Array<any> = [];

  public constructor() {
    (new Sqlite("kl.jerry")).then(db => {
      db.execSQL("CREATE TABLE IF NOT EXISTS place (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, lat REAL, lng REAL, address TEXT, type TEXT, origin TEXT, externalId TEXT)").then(id => {
        this.database = db;
        console.log('db create', this.database)
      }, error => {
        this.error = true;
        console.log("CREATE TABLE ERROR", error);
      });
    }, error => {
      this.error = true;
      console.log("OPEN DB ERROR", error);
    });
  }

  public isReady() {
    if (this.database) return Observable.of(true);
    else {
      return Observable.create(observer => {
        const interval = setInterval(() => {
          if (this.error || this.database) clearInterval(interval);
          if (this.error) observer.error(new Error('DB ERROR'));
          else if (this.database) {
            observer.next(true);
            observer.complete();
          }
        }, 2000);
        return () => clearInterval(interval);
      });
    }
  }

  public insert(place:PlaceMap) {
    this.database.execSQL("INSERT INTO place (name, lat, lng, address, type, origin, externalId) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [place.name, place.location.latitude, place.location.longitude, place.address, place.type, place.origin, place.externalId]).then(id => {
        console.log("INSERT RESULT", id);
        this.fetch();
      }, error => {
        console.log("INSERT ERROR", error);
      }
    );
  }

  public remove(placeId:string) {
    this.database.execSQL("DELETE FROM place WHERE id = ?",
      [placeId]).then(id => {
        console.log("REMOVE RESULT", id);
        this.fetch();
      }, error => {
        console.log("REMOVE ERROR", error);
      }
    );
  }

  public fetch() {
    console.log('fetch', this.database);
    return Observable.create(observer => {
      this.database.all("SELECT id, name, lat, lng, address, type, origin, externalId FROM place").then(rows => {
        const places = [];
        for(var row in rows) {
          places.push({
            id: rows[row][0],
            name: rows[row][1],
            location: Position.positionFromLatLng(rows[row][2], rows[row][3]),
            address: rows[row][4],
            type: rows[row][5],
            origin: rows[row][6],
            externalId: rows[row][7]
          });
        }
        observer.next(places);
      }, error => {
        console.log("SELECT ERROR", error);
        observer.error(error);
      });
    });

  }

  public add() {
    console.log('ADDED');
  }
}