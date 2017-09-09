import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { PlaceSearchService } from '../../../../shared/place/place-search.service';

@Component({
  moduleId: module.id,
  selector: 'kl-form-place-add',
  templateUrl: 'form-place-add.html',
})
export class FormPlaceAddComponent implements OnInit{
  protected step:string = 'search';
  protected place:any;

  public constructor( private placeSearch: PlaceSearchService, private router:Router) { }

  public ngOnInit() { }

  protected onSearchPlace(place) {
    this.placeSearch.searchById(place.id)
      .subscribe(
        (place) => {
          this.place = place;
          this.place.contexts = [];
          this.step = 'validation';
        }
      )

    //this.router.navigate(['/add-place-validation', place.id, 'geoloc']);
  }
}