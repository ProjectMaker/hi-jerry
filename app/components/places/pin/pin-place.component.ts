import { Component, OnInit } from "@angular/core";

@Component({
  moduleId: module.id,
  selector: 'kl-pin-place',
  templateUrl: 'pin-place.html',
  styleUrls: ["./pin-place.common.css", "./pin-place.component.css"],
})
export class PinPlaceComponent implements OnInit{
  public isReady:boolean = false;
  public step:string = 'search';
  public place:any = {};
  public iconSearch:string = String.fromCharCode(0xf002);
  protected searchView:string = 'name';
  public constructor() { }


  public ngOnInit() {
    
  }

  protected onPlaceSelected(place) {
    this.step = 'validation';
    
    console.log('place', JSON.stringify(place));
  }

  protected onToggleSearchView() {
    this.searchView = this.searchView === 'map' ? 'name' : 'map';
    console.log('onToggleSearchView()', this.searchView);
  }
}