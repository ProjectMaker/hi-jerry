import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Position } from 'nativescript-google-maps-sdk';

import { PlaceSearchService } from '../../../shared/place/place-search.service';

@Component({
  moduleId: module.id,
  selector: 'kl-search-place-form',
  templateUrl: 'search-place-form.html',
  styleUrls: ["./search-place.common.css", "./search-place.component.css"],
})
export class SearchPlaceFormComponent implements OnInit{
  public searchForm:FormGroup;
  public isReady:boolean = false;

  @Output() found = new EventEmitter();
  public constructor(private placeSearch:PlaceSearchService, private fb:FormBuilder) { }


  public ngOnInit() {
    console.log('INIT TOO');
    this.searchForm = this.fb.group({
      placeName: this.fb.control('', [Validators.required, Validators.minLength(4)])
    });

    this.isReady = true;

  }

  protected onSearchSubmit() {
    console.log(this.searchForm);
    this.placeSearch.searchByPositionAndName(Position.positionFromLatLng(48.8511475,2.399606700000001), 'bouion')
      .subscribe(
        (result) => this.found.next(result),
        (err) => console.log('err', err),
        () => console.log('complete')
      );
  }
}