import { Component, OnInit } from "@angular/core";
import { CONTEXT_VALUES } from '../../shared/place/place';

@Component({
  moduleId: module.id,
  selector: 'kl-place',
  templateUrl: 'place.html',
  styleUrls: ["./place.common.css"],
})
export class PlaceComponent implements OnInit{
  public iconStar:string = String.fromCharCode(0xf005);
  public place:any = { note: 0, contexts: ['family'] };
  public note:number = 0;
  public contextValues:Array<any> = CONTEXT_VALUES;

  public ngOnInit() {
    //this.place.note = 0;
    //this.place.contexts = [];
  }

  public onTapStar(note:number) {
    this.place.note = note;
  }

  public onTapContext(context:any) {
    if (this.place.contexts.indexOf(context.value) === -1) this.place.contexts.push(context.value);
  }
}