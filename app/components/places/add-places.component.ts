import { Component, OnInit } from "@angular/core";
import {Image} from 'ui/image';
import { ImageSource } from "image-source";
import { RouterExtensions } from 'nativescript-angular/router';
import { registerElement } from 'nativescript-angular/element-registry';
import { MapView, Marker, Position } from 'nativescript-google-maps-sdk';
import { GeolocationService } from '../../shared/geolocation/geolocation.sercice';
import { PlaceSearchService } from '../../shared/place/place-search.service';
const style = require('./map-style.json');
const places = require('../../shared/place/places-search.mock.json');

registerElement('MapView', () => MapView);

@Component({
  moduleId: module.id,
  selector: 'kl-add-places',
  templateUrl: 'add-places.html',
})
export class AddPlacesComponent implements OnInit{
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

  constructor(private routerExtensions:RouterExtensions, private geolocation:GeolocationService, private placeSearch:PlaceSearchService) {
    //console.log(JSON.stringify(this.places));
  }

  public goToPlaces() {
    this.routerExtensions.navigate(['places'], { clearHistory: true });
  }

  public ngOnInit() {
    this.geolocation.start();
  }

  //Map events
  onMapReady(event) {
    console.log('Maps Ready');

    this.mapView = event.object;
    this.mapView.setStyle(style);
    this.geolocation.positionEvent.subscribe(
      (position:Position) => {
        this.locationReceived(position);
        if (this.firstPosition) {
          this.firstPosition = false;
          this.placeSearch.search(position)
            .subscribe(
              (place) => {
                console.log(JSON.stringify(place));
                this.markers.push(this.addMarker(place));
                this.places.push(place);
              },
              (err) => console.log(err),
              () => console.log('complete')
            );
        }

      }
    );
  }

  locationReceived(position:Position) {
    console.log('GPS Update Received', JSON.stringify(position));

    if (this.mapView && position && !this.centeredOnLocation) {
      this.mapView.latitude = position.latitude;
      this.mapView.longitude = position.longitude;
      this.mapView.zoom = 14;
      this.centeredOnLocation = true;
    }


    if (this.gpsMarker) this.removeMarker(this.gpsMarker);
    this.gpsMarker = this.addMarker({
      location: position,
      title: 'GPS Location'
    });
  }

  addMarker(args:AddMarkerArgs) {
    if (!this.mapView || !args || !args.location) return;

    let marker = new Marker();
    marker.position = Position.positionFromLatLng(args.location.latitude, args.location.longitude);
    this.mapView.addMarker(marker);

    marker.title = args.title;
    marker.snippet = args.title;

    const imgSrc = new ImageSource();
    imgSrc.fromResource("shooting.png");

    const icon = new Image();
    icon.imageSource = imgSrc;
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
    console.log("Coordinate Tapped, Lat: " + args.position.latitude + ", Lon: " + args.position.longitude, args);
  }

  onMarkerEvent(args) {
    console.log("Marker Event: '" + args.eventName
      + "' triggered on: " + args.marker.title
      + ", Lat: " + args.marker.position.latitude + ", Lon: " + args.marker.position.longitude, args);
  }

  onCameraChanged(args) {
    console.log("Camera changed: " + JSON.stringify(args.camera), JSON.stringify(args.camera) === this.lastCamera);
    this.lastCamera = JSON.stringify(args.camera);
  }
}

export class AddMarkerArgs {
  public location:Position;
  public title:string;
}