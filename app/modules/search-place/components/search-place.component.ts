import { Component, OnInit } from "@angular/core";

@Component({
  moduleId: module.id,
  selector: 'kl-search-place',
  templateUrl: 'search-place.html',
  styleUrls: ["./search-place.common.css", "./search-place.component.css"],
})
export class SearchPlaceComponent implements OnInit{
  public isReady:boolean = false;
  public places:Array<any> = [];
  public constructor() { }


  public ngOnInit() {

  }

  protected onSearchSubmit(event) {
    this.places = event;
    console.log("pinPlaceSearch result", event);
  }

  protected onSelectedPlace(event) {
    console.log(event.description);
  }
}