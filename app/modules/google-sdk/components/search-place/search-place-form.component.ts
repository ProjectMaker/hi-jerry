import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { GeolocationService } from '../../../../shared/geolocation/geolocation.sercice';
import providePlaceSearchService from '../../shared/place/search/provide-service';
import { PlaceSearchService } from '../../shared/place/search/place-search.service';

@Component({
  moduleId: module.id,
  selector: 'kl-google-sdk-search-place-form',
  templateUrl: 'search-place-form.html',
  styleUrls: ["./search-place.common.css", "./search-place.component.css"],
  providers: [ providePlaceSearchService() ]
})
export class SearchPlaceFormComponent implements OnInit{
  public searchForm:FormGroup;
  public isReady:boolean = false;

  @Output() found = new EventEmitter();
  public constructor(private geolocation:GeolocationService, private placeSearch:PlaceSearchService, private fb:FormBuilder) { }


  public ngOnInit() {
    this.searchForm = this.fb.group({
      placeName: this.fb.control('', [Validators.required, Validators.minLength(4)])
    });

    
  }

  protected onSearchSubmit() {
    this.placeSearch.searchByPositionAndName(this.geolocation.position, this.searchForm.controls['placeName'].value)
      .subscribe(
        (result) => this.found.next(result),
        (err) => console.log('err', err),
        () => console.log('complete')
      );
  }
}