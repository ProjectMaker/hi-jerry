import { Position } from 'nativescript-google-maps-sdk';

export class Place {
  public location:Position;
  public title:string;
  public address:string;
  public type:string;
  public origin:string;
  public externalId:string;
}

export interface PlaceMap {
  location:Position;
  name:string;
  address:string;
  type:string;
  origin:string;
  externalId:string;
}