import { Injectable, EventEmitter } from "@angular/core";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/of';
import { Position } from 'nativescript-google-maps-sdk';
const Sqlite = require("nativescript-sqlite");

import { PlaceMap } from './place';

const QUERY_CREATE_TABLE = "\
  CREATE TABLE IF NOT EXISTS place ( \
    id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, lat REAL, lng REAL, address TEXT, type TEXT, origin TEXT, \
    externalId TEXT, imageRefId TEXT, imageRef BLOB, \
    note INTEGER, comment TEXT, contexts TEXT\
  )";

const QUERY_INSERT = "\
  INSERT INTO place (name, lat, lng, address, type, origin, externalId, imageRefId, imageRef, note, comment, contexts) \
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) \
";

const QUERY_UPDATE = "\
  UPDATE place SET note = ?, comment = ?, contexts = ? WHERE id = ?\
";

@Injectable()
export class PlaceStorageService {
  private database:any;
  private error:boolean = false;
  public emitter:EventEmitter<Array<PlaceMap>> = new EventEmitter();

  public constructor() {
    (new Sqlite("kl.jerry")).then(db => {
      db.execSQL(QUERY_CREATE_TABLE).then(id => {
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

  public isReady():Observable<boolean> {
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

  public update(place:PlaceMap) {
    return Observable.create(observer => {
      this.database.execSQL(QUERY_UPDATE, [
        place.note, place.comment, place.contexts.join(','), place.id
      ]).then(id => {
        observer.next(id);
        observer.complete();
      }, error => {
        console.log("UPDATE ERROR", error);
        observer.error(error);
      })
    });
  }

  public insert(place:PlaceMap):Observable<number> {
    return Observable.create(observer => {
      this.database.execSQL(QUERY_INSERT,
        [place.name, place.location.latitude, place.location.longitude, place.address, place.type, place.origin,
          place.externalId, place.imageRefId, place.imageRef, place.note, place.comment, place.contexts.join(',')]).then(id => {
          console.log("INSERT RESULT", id);
          observer.next(id);
          observer.complete();
          this.fetch();
        }, error => {
          console.log("INSERT ERROR", error);
          observer.error(error);
        }
      );
    });
  }

  public remove(placeId:number) {
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
    this.database.all("SELECT id, name, lat, lng, address, type, origin, externalId, imageRefId, imageRef, note, comment, contexts FROM place").then(rows => {
      const places = [];
      for(var row in rows) {
        places.push({
          id: rows[row][0],
          name: rows[row][1],
          location: Position.positionFromLatLng(rows[row][2], rows[row][3]),
          address: rows[row][4],
          type: rows[row][5],
          origin: rows[row][6],
          externalId: rows[row][7],
          imageRefId: rows[row][8],
          imageRef: rows[row][9],
          note: rows[row][10],
          comment: rows[row][11],
          contexts: rows[row][12] ? rows[row][12].split(',') : [],
        });
      }
      this.emitter.emit(places);
    }, error => {
      console.log("SELECT ERROR", error);
    });
  }

  public add() {
    console.log('ADDED');
  }
}