import { Component, OnInit, NgZone } from "@angular/core";

import { PlaceSearchService } from '../../../../shared/place/place-search.service';

@Component({
  moduleId: module.id,
  selector: 'kl-form-place-add',
  templateUrl: 'form-place-add.html',
})
export class FormPlaceAddComponent implements OnInit{
  public isReady:boolean = false;
  public step:string = 'search';
  public place:any = {}

  public constructor(private placeSearch:PlaceSearchService, private zone:NgZone) { }


  public ngOnInit() {
    console.log('form-place-add init');
    this.isReady = true;
  }

  protected onPlaceSelected(place) {
    this.placeSearch.searchById(place.id)
      .subscribe(
        (place) => {
          this.place = place;
          this.place.contexts = [];
          this.step = 'validation';
        },
        (err) => console.log('FormPlaceAddComponent.onPlaceSelected error', err)
      );
  }
}