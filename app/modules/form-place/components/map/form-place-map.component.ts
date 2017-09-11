import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import {Image} from 'ui/image';
const imageSource = require("image-source");

import { RouterExtensions } from 'nativescript-angular/router';
import { registerElement } from 'nativescript-angular/element-registry';
import { MapView, Marker, Position } from 'nativescript-google-maps-sdk';

import {LoadingIndicator} from "nativescript-loading-indicator";

import { GeolocationService } from '../../../../shared/geolocation/geolocation.sercice';
import { PlaceSearchService } from '../../../../shared/place/search/place-search.service';
import { getMarkerIcon } from '../../../../shared/place/place';

const style = require('./map-style.json');

registerElement('MapView', () => MapView);

@Component({
  moduleId: module.id,
  selector: 'kl-form-place-map',
  templateUrl: 'form-place-map.html',
})
export class FormPlaceMapComponent implements OnInit {
  places:any[] = [];
  markers:Array<Marker> = [];
  markerSelected:Marker;
  zoom = 16;
  bearing = 0;
  tilt = 0;
  padding = [40, 40, 40, 40];
  mapView: MapView;
  gpsMarker:Marker;
  firstPosition:boolean = true;
  centeredOnLocation:boolean = false;
  lastCamera: String;
  iconAdd:string = String.fromCharCode(0xf055);
  public iconCircleDown:string = String.fromCharCode(0xf107);
  public selectedIndex = 0;

  @Output() submit = new EventEmitter();
  constructor(private routerExtensions:RouterExtensions,
              private geolocation:GeolocationService,
              private placeSearch:PlaceSearchService) {
    //console.log(JSON.stringify(this.places));
  }

  public goToPlaces() {
    this.routerExtensions.navigate(['places'], { clearHistory: true });
  }

  public ngOnInit() {
    this.geolocation.start();
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

  public onItemNameTap(item:any) {
    console.log('onItemNameTap', item.externalId, item.origin, item.imageRefId);
    const marker = this.markers.find(marker => marker.userData.placeId === item.placeId);

    this.mapView.latitude = marker.position.latitude;
    this.mapView.longitude = marker.position.longitude;

    this.switchMarker(marker);

    marker.showInfoWindow();
  }

  public onItemAdd(place:any) {
    this.submit.next({id: place.placeId});
    console.log('onItemAdd', place.placeId);
  }

  //Map events
  onMapReady(event) {
    console.log('Maps Ready');

    this.mapView = event.object;
    this.mapView.setStyle(style);

    this.geolocation.isReady()
      .subscribe(
        () => {
          this.locationReceived(this.geolocation.position);

          this.placeSearch.search(this.geolocation.position)
            .subscribe(
              (places) => {
                places.forEach((place) => {
                  this.markers.push(this.addMarker(place));
                  this.places.push(place);
                });
              },
              (err) => console.log(err),
              () => console.log('complete')
            );

        }
      );
  }

  locationReceived(position:Position) {
    //console.log('GPS Update Received', JSON.stringify(position));

    if (this.mapView && position && !this.centeredOnLocation) {
      this.mapView.latitude = position.latitude;
      this.mapView.longitude = position.longitude;
      this.mapView.zoom = 14.9;
      this.centeredOnLocation = true;
    }


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

  private addMarker(place:any) {
    if (!this.mapView || !place || !place.location) return;

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

    return marker;
  }

  removeMarker(marker:Marker) {
    if (this.mapView && marker) {
      this.mapView.removeMarker(marker);
    }
  }

  onCoordinateTapped(args) {
    //console.log("Coordinate Tapped, Lat: " + args.position.latitude + ", Lon: " + args.position.longitude, args);
  }

  onMarkerEvent(args) {
    //if (args.eventName === 'markerSelect')
    console.log("Marker Event: '" + args.eventName
      + "' triggered on: " + args.marker.title
      + ", Lat: " + args.marker.position.latitude + ", Lon: " + args.marker.position.longitude, args);
    this.switchMarker(args.marker);
  }

  onCameraChanged(args) {
    console.log("Camera changed: " + JSON.stringify(args.camera), JSON.stringify(args.camera) === this.lastCamera);
    this.lastCamera = JSON.stringify(args.camera);
  }
}