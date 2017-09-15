import { Component, OnInit, ViewChild, Output, Input, EventEmitter, NgZone, ElementRef } from "@angular/core";
import { ListView } from 'ui/list-view';

@Component({
  moduleId: module.id,
  selector: 'kl-google-sdk-list-view-search-place',
  templateUrl: 'list-view-search-place.html',
})
export class ListViewSearchComponent implements OnInit {
  public myName:string = 'tom';
  public iconAdd:string = String.fromCharCode(0xf055);
  protected placeSelected:any

  @Input() places:Array<any>;
  @Output() select = new EventEmitter();
  @Output() info = new EventEmitter();
  @ViewChild("list") listElt: ElementRef;
  public constructor(private zone:NgZone) { }

  public ngOnInit() {

  }

  public templateSelector(item: any, index: number, items: any[]) {
    if (!item.__list__selected) {
      return "default";
    } else return "selected";
  }

  public onItemTap(args) {
    this.placeSelected = this.places[args.index];

    const elt = <ListView>this.listElt.nativeElement;
    elt.refresh();

    this.info.next(this.placeSelected.placeId);
  }
  
  onSelectPlace(place) {
    this.select.next(place.placeId);
  }
}