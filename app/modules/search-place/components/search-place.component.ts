import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  moduleId: module.id,
  selector: 'kl-search-place',
  templateUrl: 'search-place.html',
  styleUrls: ["./search-place.common.css", "./search-place.component.css"],
})
export class SearchPlaceComponent implements OnInit{
  public isReady:boolean = false;
  public places:Array<any> = [];

  @Output() selected = new EventEmitter();
  public constructor() { }


  public ngOnInit() {

  }

  protected onSearchSubmit(places) {
    this.places = places;
  }

  protected onSelectedPlace(place) {
    console.log('search-place.component, onSelectedPlace', place);
    this.selected.next(place);
  }
}