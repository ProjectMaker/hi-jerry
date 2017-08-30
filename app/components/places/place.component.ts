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
  public place:Observable<Place>;

  public ngOnInit() {
    this.place = Observable.of({
      note: 1, contexts: ['family']
    });
  }

  public onTapStar(note:number) {
    //(<Place>this.place).note = note;
  }

  public onTapContext(context:any) {
    //const contexts = (<Place>this.place).contexts;
    //if (contexts.indexOf(context.value) === -1) contexts.push(context.value);
  }
}