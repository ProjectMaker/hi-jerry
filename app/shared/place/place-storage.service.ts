import { Injectable } from "@angular/core";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/of';
import { Position } from 'nativescript-google-maps-sdk';
const Sqlite = require("nativescript-sqlite");

@Injectable()
export class PlaceStorageService {
  private database:any;
  private error:boolean = false;
  public places:Array<any> = [];

  public constructor() {
    (new Sqlite("kl.jerry")).then(db => {
      db.execSQL("CREATE TABLE IF NOT EXISTS place (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, lat REAL, lng REAL)").then(id => {
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

  public insert(name:string, lat:number, lng:number) {
    this.database.execSQL("INSERT INTO place (name, lat, lng) VALUES (?, ?, ?)", [name, lat, lng]).then(id => {
      console.log("INSERT RESULT", id);
      this.fetch();
    }, error => {
      console.log("INSERT ERROR", error);
    });
  }

  public fetch() {
    console.log('fetch', this.database);
    return Observable.create(observer => {
      this.database.all("SELECT name, lat, lng FROM place").then(rows => {
        const places = [];
        for(var row in rows) {
          places.push({
            'title': rows[row][0],
            'location': Position.positionFromLatLng(rows[row][1], rows[row][1])
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