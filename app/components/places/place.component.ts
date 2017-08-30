import { Component, OnInit } from "@angular/core";
import {Observable} from "rxjs/Observable";

import { CONTEXT_VALUES } from '../../shared/place/place';

interface Place {
  note:number,
  contexts:Array<string>
}

@Component({
  moduleId: module.id,
  selector: 'kl-place',
  templateUrl: 'place.html',
  styleUrls: ["./place.common.css"],
})
export class PlaceComponent implements OnInit{
  public iconStar:string = String.fromCharCode(0xf005);
  public note:number = 0;
  public contextValues:Array<any> = CONTEXT_VALUES;
  public place:Place;

  public ngOnInit() {
    Observable.of({
      note: 1, contexts: ['family']
    }).subscribe(v => this.place = v);
  }

  public onTapStar(note:number) {
    this.place.note = note;
  }

  public onTapContext(context:any) {
    if (this.place.contexts.indexOf(context.value) === -1) this.place.contexts.push(context.value);
  }
}