import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { PlaceSearchService } from '../../../../shared/place/place-search.service';

@Component({
  moduleId: module.id,
  selector: 'kl-form-place-search',
  templateUrl: 'form-place-search.html',
})
export class FormPlaceSearchComponent implements OnInit{
  protected isReady:boolean = false;

  public constructor(private placeSearch:PlaceSearchService, private router:Router) { }


  public ngOnInit() {
    this.isReady = true;
  }

  protected onPlaceSelected(place) {
    this.router.navigate(['/add-place-validation', place.id, 'geoloc']);
  }
}