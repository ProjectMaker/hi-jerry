import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { LoadingIndicator } from "nativescript-loading-indicator";

import { PlaceSearchService } from '../../../../shared/place/search/place-search.service';
import providePlaceStorageService from '../../../../shared/place/storage/provide-service';
import { PlaceStorageService } from '../../../../shared/place/storage/place-storage.service';

@Component({
  moduleId: module.id,
  selector: 'kl-form-place-add',
  templateUrl: 'form-place-add.html',
  providers: [ providePlaceStorageService() ]
})
export class FormPlaceAddComponent implements OnInit{
  protected step:string = 'search';
  protected place:any;

  public constructor( private placeSearch: PlaceSearchService, private placeStorage: PlaceStorageService, private router:Router) { }

  public ngOnInit() { }

  protected onFindPlace(place) {
    this.placeSearch.searchById(place.id)
      .subscribe(
        (place) => {
          this.place = place;
          this.place.contexts = [];
          this.step = 'validation';
        }
      );
  }

  public onSubmit() {
    const loader = new LoadingIndicator();
    loader.show({
      message: 'process ...',
      ios: {
        color: '#FFFFFF',
        backgroundColor: '#000000',
      }
    });

    this.placeStorage.insert(this.place).subscribe(
      (place) => {
          console.log(place);
        this.place = place;
        loader.hide()
      },
      (err) => console.log(err)
    );
  }
}