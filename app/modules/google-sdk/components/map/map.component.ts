import { Component, OnInit, OnDestroy, Output, Input, EventEmitter, NgZone } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import {Image} from 'ui/image';

const imageSource = require("image-source");

import { registerElement } from 'nativescript-angular/element-registry';
import { MapView, Marker, Position } from 'nativescript-google-maps-sdk';

import { getMarkerIcon } from '../../shared/place/marker';

const style = require('./map-style.json');

registerElement('MapView', () => MapView);

@Component({
  moduleId: module.id,
  selector: 'kl-google-sdk-map',
  templateUrl: 'map.html',
})
export class MapComponent implements OnInit, OnDestroy {
  private _places = new BehaviorSubject([]);
  private isAlive:boolean = true;
  markers:Array<Marker> = [];
  markerSelected:Marker;
  zoom = 16;
  bearing = 0;
  tilt = 0;
  padding = [40, 40, 40, 40];
  mapView: MapView;
  gpsMarker:Marker;
  lastCamera: String;

  @Output() ready = new EventEmitter();
  constructor(private zone:NgZone) {}

  @Input()
  set places(value) {
    this._places.next(value);
  };

  get places() {
    return this._places.getValue();
  }
  

  public ngOnInit() {
    console.log('map.component onInit()');
  }

  public ngOnDestroy() {
    this.isAlive = false;
    console.log('MAP COMPONENT ON DESTROY');
  }

  public selectMarker(placeId:string) {
    console.log('selectMarker', placeId);
    const marker = this.markers.find((marker) => { return placeId === marker.userData.placeId});

    this.zone.run(() => {
      this.mapView.latitude = marker.position.latitude;
      this.mapView.longitude = marker.position.longitude;

      this.switchMarker(marker);

      marker.showInfoWindow();
    })

    console.log('/selectMaker', marker.title);
  }

  public center(position:Position) {
    this.mapView.latitude = position.latitude;
    this.mapView.longitude = position.longitude;
    this.mapView.zoom = 16;

    if (this.gpsMarker) this.removeMarker(this.gpsMarker);
    this.gpsMarker = this.addMarker({
      id: null,
      location: position,
      name: 'Home',
      address: '',
      type: 'home',
      origin: null,
      externalId: null
    });
  }

  protected onMarkerEvent(args) {
    //if (args.eventName === 'markerSelect')
    console.log("Marker Event: '" + args.eventName
      + "' triggered on: " + args.marker.title
      + ", Lat: " + args.marker.position.latitude + ", Lon: " + args.marker.position.longitude, args);
    this.switchMarker(args.marker);
  }

  protected onCameraChanged(args) {
    console.log("Camera changed: " + JSON.stringify(args.camera), JSON.stringify(args.camera) === this.lastCamera);
    this.lastCamera = JSON.stringify(args.camera);
  }

  //Map events
  public onMapReady(event) {
    console.log('map.component.onMapReady');
    this.mapView = event.object;
    this.mapView.setStyle(style);

    this._places
      .takeWhile(() => this.isAlive)
      .subscribe(() => {
        this.places.forEach(place => this.addMarker(place));
      });

    this.ready.next(this);
    this.ready.complete();
  }

  private switchMarker(marker:Marker) {
    let image;
    if (this.markerSelected) {
      image = new Image();
      getMarkerIcon(this.markerSelected.userData.type)
      image.imageSource = imageSource.fromResource(getMarkerIcon(this.markerSelected.userData.type));
      this.markerSelected.icon = image;
    }
    this.markerSelected = marker;


    image = new Image();
    image.imageSource = imageSource.fromResource("monkey-export");
    marker.icon = image;
  }

  private getMarker(place:any) {
    return this.markers.find(marker => marker.userData.placeId === place.placeId);
  }

  private addMarker(place:any) {
    if (this.getMarker(place)) return;

    let marker = new Marker();
    marker.position = Position.positionFromLatLng(place.location.latitude, place.location.longitude);

    marker.title = place.name;
    marker.snippet = place.address;
    marker.userData = { type: place.type, placeId: place.placeId };

    const res = getMarkerIcon(place.type);
    const icon = new Image();
    icon.imageSource = imageSource.fromResource(res);
    marker.icon = icon;

    this.mapView.addMarker(marker);
    this.markers.push(marker);

    return marker;
  }

  private removeMarker(marker:Marker) {
    if (this.mapView && marker) {
      this.mapView.removeMarker(marker);
    }
  }
}