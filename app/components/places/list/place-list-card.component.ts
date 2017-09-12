import { Component, OnInit, Input } from "@angular/core";
import providePlaceStorageService from '../../../shared/place/storage/provide-service';
import { PlaceImgPlaceholder } from '../../../shared/place/place';

@Component({
  moduleId: module.id,
  selector: 'kl-place-list-card',
  templateUrl: 'place-list-card.html',
  styleUrls: ["./place-list-card.common.css"],
  providers: [providePlaceStorageService()]
})
export class PlaceListCardComponent implements OnInit {
  protected imageSource:string = PlaceImgPlaceholder;
  public iconStar:string = String.fromCharCode(0xf005);

  @Input() place:any;
  public ngOnInit() { }
}