import { Component, OnInit } from "@angular/core";

@Component({
  moduleId: module.id,
  selector: 'kl-place',
  templateUrl: 'place.html',
  styleUrls: ["./place.common.css"],
})
export class PlaceComponent implements OnInit{
  public iconStar:string = String.fromCharCode(0xf005);
  public note:number = 0;

  public ngOnInit() { }

  public onTapStar(note:number) {
    this.note = note;
  }
}