import { Component, OnInit, EventEmitter, Output, Input } from "@angular/core";

@Component({
  moduleId: module.id,
  selector: 'kl-search-place-list',
  templateUrl: 'search-place-list.html',
  styleUrls: ["./search-place.common.css", "./search-place.component.css"],
})
export class SearchPlaceListComponent implements OnInit{
  @Input() places:Array<any>;
  @Output() selected = new EventEmitter();
  public constructor() { }


  public ngOnInit() {
    console.log('INIT');
  }

  public onItemTap(args) {
    this.selected.next(this.places[args.index]);
  }
}